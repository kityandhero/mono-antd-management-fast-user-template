import { connect } from 'easy-soft-dva';
import { getValueByKey, showSimpleErrorMessage } from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { AddBasicInfoModel } from '../AddBasicInfoModel';
import { refreshCacheAction, removeAction } from '../Assist/action';
import { fieldData } from '../Common/data';
import { OperateLogDrawer } from '../OperateLogDrawer';
import { PreviewDrawer } from '../PreviewDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ applicationUserFeedback, schedulingControl }) => ({
  applicationUserFeedback,
  schedulingControl,
}))
class PageList extends MultiPage {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '我的反馈列表',
      paramsKey: 'fdb7998c959d44c397da8fb8ed75baa7',
      loadApiPath:
        modelTypeCollection.applicationUserFeedbackTypeCollection.pageList,
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'goToEdit': {
        this.goToEdit(handleData);
        break;
      }

      case 'showPreviewDrawer': {
        this.showPreviewDrawer(handleData);
        break;
      }

      case 'showOperateLog': {
        this.showOperateLogDrawer(handleData);
        break;
      }

      case 'refreshCache': {
        this.refreshCache(handleData);
        break;
      }

      case 'remove': {
        this.remove(handleData);
        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  refreshCache = (o) => {
    refreshCacheAction({
      target: this,
      handleData: o,
    });
  };

  remove = (o) => {
    removeAction({
      target: this,
      handleData: o,
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
  };

  showOperateLogDrawer = (item) => {
    this.setState(
      {
        currentRecord: item,
      },
      () => {
        OperateLogDrawer.open();
      },
    );
  };

  showPreviewDrawer = (item) => {
    this.setState(
      {
        currentRecord: item,
      },
      () => {
        PreviewDrawer.open();
      },
    );
  };

  showAddBasicInfoModel = () => {
    AddBasicInfoModel.open();
  };

  afterAddBasicInfoModelClose = ({
    flag,
    // eslint-disable-next-line no-unused-vars
    singleData,
    // eslint-disable-next-line no-unused-vars
    listData,
    // eslint-disable-next-line no-unused-vars
    extraData,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line no-unused-vars
    submitData,
    // eslint-disable-next-line no-unused-vars
    subjoinData,
  }) => {
    if (!flag) {
      return;
    }

    this.refreshData({});
  };

  goToEdit = (record) => {
    const applicationUserFeedbackId = getValueByKey({
      data: record,
      key: fieldData.applicationUserFeedbackId.name,
      defaultValue: '',
    });

    this.goToPath(
      `/currentAccount/applicationUserFeedback/edit/load/${applicationUserFeedbackId}/key/basicInfo`,
    );
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.title,
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
        type: 'primary',
        icon: iconBuilder.plus(),
        text: '新增反馈',
        handleClick: this.showAddBasicInfoModel,
      },
    ];
  };

  establishListItemDropdownConfig = (item) => {
    const that = this;

    return {
      size: 'small',
      text: '查阅',
      icon: iconBuilder.edit(),

      handleButtonClick: ({ handleData }) => {
        that.showPreviewDrawer(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        that.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'goToEdit',
          icon: iconBuilder.edit(),
          text: '查看详情',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showOperateLog',
          icon: iconBuilder.read(),
          text: '操作日志',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.title,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.applicationName,
      width: 200,
      align: 'center',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.channelNote,
      width: 200,
      align: 'center',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.applicationUserFeedbackId,
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
    const { currentRecord } = this.state;

    return (
      <>
        <AddBasicInfoModel afterClose={this.afterAddBasicInfoModelClose} />

        <PreviewDrawer externalData={currentRecord} maskClosable />

        <OperateLogDrawer externalData={currentRecord} maskClosable />
      </>
    );
  };
}

export default PageList;
