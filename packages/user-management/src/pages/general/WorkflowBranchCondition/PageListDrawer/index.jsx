import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  getValueByKey,
  handleItem,
  showSimpleErrorMessage,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import {
  getChannelName,
  getFlowBranchConditionJudgmentModeName,
  getFlowBranchConditionStatusName,
} from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { maintainChannelAction, refreshCacheAction } from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';
import { UpdateDescriptiveInfoDrawer } from '../UpdateDescriptiveInfoDrawer';

const { MultiPageDrawer } = DataMultiPageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '3720117d2c0a4dcab4c10da93bb87a9f';

@connect(({ workflowBranchCondition, schedulingControl }) => ({
  workflowBranchCondition,
  schedulingControl,
}))
class PageListDrawer extends MultiPageDrawer {
  columnOperateWidth = 146;

  reloadWhenShow = true;

  componentAuthority =
    accessWayCollection.workflowBranchCondition.pageList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      tableScrollX: 1460,
      pageTitle: '流程节点条件列表',
      loadApiPath:
        modelTypeCollection.workflowBranchConditionTypeCollection.pageList,
      currentRecord: null,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  supplementLoadRequestParams = (o) => {
    return {
      ...this.supplementRequestParams(o),
    };
  };

  supplementRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.state;

    d[fieldData.workflowId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowId.name,
    });

    return d;
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'showUpdateDescriptiveInfoDrawer': {
        this.showUpdateDescriptiveInfoDrawer(handleData);
        break;
      }

      case 'maintainChannel': {
        this.maintainChannel(handleData);
        break;
      }

      default: {
        showSimpleErrorMessage(`can not find matched key "${key}"`);
        break;
      }
    }
  };

  maintainChannel = (r) => {
    maintainChannelAction({
      target: this,
      handleData: r,
      successCallback: ({ target, remoteData }) => {
        const id = getValueByKey({
          data: remoteData,
          key: fieldData.workflowBranchConditionId.name,
        });

        handleItem({
          target,
          value: id,
          compareValueHandler: (o) => {
            const v = getValueByKey({
              data: o,
              key: fieldData.workflowBranchConditionId.name,
            });

            return v;
          },
          handler: (d) => {
            const o = d;

            o[fieldData.channel.name] = getValueByKey({
              data: remoteData,
              key: fieldData.channel.name,
            });

            o[fieldData.channelNote.name] = getValueByKey({
              data: remoteData,
              key: fieldData.channelNote.name,
            });

            return d;
          },
        });
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  showUpdateDescriptiveInfoDrawer = (r) => {
    this.setState(
      {
        currentRecord: r,
      },
      () => {
        UpdateDescriptiveInfoDrawer.open();
      },
    );
  };

  afterUpdateDescriptiveInfoDrawerOk = ({
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
    this.refreshDataWithReloadAnimalPrompt({});
  };

  renderPresetTitleIcon = () => null;

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 16,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '刷新缓存',
      icon: iconBuilder.reload(),
      disabled: !checkHasAuthority(
        accessWayCollection.workflowBranchCondition.refreshCache.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.refreshCache(handleData);
      },
      handleData: record,
      confirm: true,
      title: '即将刷新缓存，确定吗？',
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'showUpdateDescriptiveInfoDrawer',
          icon: iconBuilder.edit(),
          text: '编辑描述性信息',
          hidden: !checkHasAuthority(
            accessWayCollection.workflowBranchCondition.updateDescriptiveInfo
              .permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'maintainChannel',
          icon: iconBuilder.edit(),
          text: '维护通道值',
          hidden: !checkHasAuthority(
            accessWayCollection.workflowBranchCondition.maintainChannel
              .permission,
          ),
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.judgmentMode,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 14,
          }),
        };
      },
      formatValue: (value) => {
        return getFlowBranchConditionJudgmentModeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.workflowNodeName,
      width: 180,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.channel,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 47,
          }),
        };
      },
      formatValue: (value) => {
        return getChannelName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.status,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getFlowBranchConditionStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.workflowBranchConditionId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.workflowNodeId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.workflowId,
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
        <UpdateDescriptiveInfoDrawer
          externalData={currentRecord}
          afterOK={this.afterUpdateDescriptiveInfoDrawerOk}
        />
      </>
    );
  };
}

export { PageListDrawer };
