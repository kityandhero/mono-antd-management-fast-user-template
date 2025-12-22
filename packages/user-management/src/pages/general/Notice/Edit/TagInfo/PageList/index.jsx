import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  getValueByKey,
  isArray,
  isEmptyArray,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  getDerivedStateFromPropertiesForUrlParameters,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder, VerticalBox } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../../../customConfig';
import { modelTypeCollection } from '../../../../../../modelBuilders';
import {
  addBatchAction,
  refreshCacheAction,
  removeAction,
} from '../../../../NoticeTagRelation/Assist/action';
import { fieldData } from '../../../../NoticeTagRelation/Common/data';
import { fieldData as fieldDataTag } from '../../../../Tag/Common/data';
import { SelectDrawerButton as TagSelectDrawerButton } from '../../../../Tag/SelectDrawerButton';
import { parseUrlParametersForSetState } from '../../../Assist/config';

const { InnerMultiPage } = DataMultiPageView;

@connect(({ noticeTagRelation, schedulingControl }) => ({
  noticeTagRelation,
  schedulingControl,
}))
class PageList extends InnerMultiPage {
  componentAuthority =
    accessWayCollection.noticeTagRelation.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      showOverlay: false,
      loadApiPath: modelTypeCollection.noticeTagRelationTypeCollection.pageList,
      noticeId: null,
      currentRecord: null,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
    );
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { noticeId } = this.state;

    d.noticeId = noticeId;

    return d;
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'remove': {
        this.remove(handleData);
        break;
      }

      case 'refreshCache': {
        this.refreshCache(handleData);
        break;
      }

      default: {
        break;
      }
    }
  };

  addBatch = (listTag) => {
    const { noticeId } = this.state;

    if (!isArray(listTag)) {
      showSimpleErrorMessage('用户标识集合无效');
    }

    if (isEmptyArray(listTag)) {
      showSimpleErrorMessage('用户标识集合数据无效');
    }

    const tagIdCollection = listTag
      .map((o) => {
        const tagId = getValueByKey({
          data: o,
          key: fieldDataTag.tagId.name,
          defaultValue: '',
        });

        return tagId;
      })
      .join(',');

    const that = this;

    addBatchAction({
      target: that,
      handleData: {
        noticeId,
        tagIdCollection,
      },
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({
          beforeRequest: () => {
            that.pageValues.pageNo = 1;
            that.pageValues.frontendPageNo = 1;
          },
        });
      },
    });
  };

  remove = (record) => {
    const noticeId = getValueByKey({
      data: record,
      key: fieldData.noticeId.name,
      defaultValue: '',
    });

    const tagId = getValueByKey({
      data: record,
      key: fieldData.tagId.name,
      defaultValue: '',
    });

    removeAction({
      target: this,
      handleData: {
        noticeId,
        tagId,
      },
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
  };

  refreshCache = (record) => {
    refreshCacheAction({
      target: this,
      handleData: record,
    });
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.tagDisplayName,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      {
        buildType: listViewConfig.dataContainerExtraActionBuildType.component,
        component: (
          <TagSelectDrawerButton
            label="选择标签"
            text="选择标签"
            icon={iconBuilder.select()}
            afterSelectSuccess={(o) => {
              this.addBatch(o);
            }}
          />
        ),
      },
    ];
  };

  establishListItemDropdownConfig = (item) => {
    return {
      size: 'small',
      text: '详情',
      icon: iconBuilder.read(),
      disabled: !checkHasAuthority(
        accessWayCollection.noticeTagRelation.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.showPreviewDrawer(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'remove',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.delete(),
          text: '移除信息',
          hidden: !checkHasAuthority(
            accessWayCollection.noticeTagRelation.remove.permission,
          ),
          confirm: {
            title: '将要移除信息，确定吗？',
          },
        },
        {
          key: 'refreshCache',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.noticeTagRelation.refreshCache.permission,
          ),
          confirm: {
            title: '即将刷新缓存，确定吗？',
          },
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.tagDisplayName,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
      render: (value, record) => {
        const color = getValueByKey({
          data: record,
          key: fieldData.color.name,
          defaultValue: '',
        });

        return (
          <VerticalBox>
            <div
              style={{
                border: `1px solid ${color || '#333'}`,
                borderRadius: '4px',
                overflow: 'hidden',
                padding: '0px 6px',
                color: color || '#333',
              }}
            >
              {value}
            </div>
          </VerticalBox>
        );
      },
    },
    {
      dataTarget: fieldData.noticeTagRelationId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];
}

export default PageList;
