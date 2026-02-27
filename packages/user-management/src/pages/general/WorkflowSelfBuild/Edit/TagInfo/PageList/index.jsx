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
import { fieldData as fieldDataTag } from '../../../../Tag/Common/data';
import { SelectWithWorkflowDrawerButton as TagSelectWithWorkflowDrawerButton } from '../../../../Tag/SelectWithWorkflowDrawerButton';
import {
  addBatchAction,
  refreshCacheAction,
  removeAction,
} from '../../../../WorkflowTagRelation/Assist/action';
import { fieldData } from '../../../../WorkflowTagRelation/Common/data';
import { parseUrlParametersForSetState } from '../../../Assist/config';

const { InnerMultiPage } = DataMultiPageView;

@connect(({ workflowTagRelation, schedulingControl }) => ({
  workflowTagRelation,
  schedulingControl,
}))
class PageList extends InnerMultiPage {
  componentAuthority =
    accessWayCollection.workflowTagRelation.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      showOverlay: false,
      loadApiPath:
        modelTypeCollection.workflowTagRelationTypeCollection.pageList,
      workflowId: null,
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
    const { workflowId } = this.state;

    d.workflowId = workflowId;

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
    const { workflowId } = this.state;

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
        workflowId,
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
    const workflowId = getValueByKey({
      data: record,
      key: fieldData.workflowId.name,
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
        workflowId,
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
          <TagSelectWithWorkflowDrawerButton
            label="增加流程标签"
            text="增加流程标签"
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
      text: '移除',
      icon: iconBuilder.delete(),
      confirm: true,
      title: '即将移除此项，确定吗？',
      disabled: !checkHasAuthority(
        accessWayCollection.workflowTagRelation.remove.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.remove(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.workflowTagRelation.refreshCache.permission,
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
      dataTarget: fieldData.workflowTagRelationId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
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
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];
}

export default PageList;
