import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  getDerivedStateFromPropertiesForUrlParameters,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../../../customConfig';
import { getFileTypeName } from '../../../../../../customSpecialComponents';
import {
  refreshCacheAction,
  removeAction,
} from '../../../../NoticeAttachment/Assist/action';
import { fieldData } from '../../../../NoticeAttachment/Common/data';
import { PreviewDrawer } from '../../../../NoticeAttachment/PreviewDrawer';
import { UploadFileModal } from '../../../../NoticeAttachment/UploadFileModal';
import { parseUrlParametersForSetState } from '../../../Assist/config';

const { InnerMultiPage } = DataMultiPageView;

@connect(({ noticeAttachment, schedulingControl }) => ({
  noticeAttachment,
  schedulingControl,
}))
class PageList extends InnerMultiPage {
  componentAuthority = accessWayCollection.noticeAttachment.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'noticeAttachment/pageList',
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

  remove = (record) => {
    removeAction({
      target: this,
      handleData: record,
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

  showPreviewDrawer = (item) => {
    this.setState({ currentRecord: item }, () => {
      PreviewDrawer.open();
    });
  };

  showUploadFileModal = () => {
    UploadFileModal.open();
  };

  afterUploadFileModalClose = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.alias,
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
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'default',
        icon: iconBuilder.upload(),
        text: '上传附件',
        handleClick: this.showUploadFileModal,
      },
    ];
  };

  establishListItemDropdownConfig = (item) => {
    return {
      size: 'small',
      text: '详情',
      icon: iconBuilder.read(),
      disabled: !checkHasAuthority(
        accessWayCollection.noticeAttachment.get.permission,
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
            accessWayCollection.noticeAttachment.remove.permission,
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
            accessWayCollection.noticeAttachment.refreshCache.permission,
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
      dataTarget: fieldData.alias,
      width: 200,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.previewUrl,
      width: 80,
      showRichFacade: true,
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.url,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.size,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.suffix,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.fileType,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 9,
          }),
        };
      },
      formatValue: (value) => {
        return getFileTypeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.noticeAttachmentId,
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

  renderPresetOther = () => {
    const { noticeId, currentRecord } = this.state;

    return (
      <>
        <UploadFileModal
          externalData={{ noticeId }}
          afterClose={this.afterUploadFileModalClose}
        />

        <PreviewDrawer maskClosable externalData={currentRecord} />
      </>
    );
  };
}

export default PageList;
