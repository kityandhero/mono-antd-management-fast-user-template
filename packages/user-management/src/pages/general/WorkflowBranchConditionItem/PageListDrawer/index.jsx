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
  getFlowBranchConditionItemStatusName,
  getFlowBranchConditionItemTargetComparisonModeName,
  getFlowBranchConditionItemTargetSourceModeName,
  getFlowBranchConditionItemTargetTypeName,
} from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { maintainChannelAction, refreshCacheAction } from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { MultiPageDrawer } = DataMultiPageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'ace14910532c46efb5cf5474f2f89dd3';

@connect(({ workflowBranchConditionItem, schedulingControl }) => ({
  workflowBranchConditionItem,
  schedulingControl,
}))
class PageListDrawer extends MultiPageDrawer {
  columnOperateWidth = 146;

  reloadWhenShow = true;

  componentAuthority =
    accessWayCollection.workflowBranchConditionItem.pageList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '流程节点条件项列表',
      loadApiPath:
        modelTypeCollection.workflowBranchConditionItemTypeCollection.pageList,
      tableScrollX: 2720,
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
          key: fieldData.workflowBranchConditionItemId.name,
        });

        handleItem({
          target,
          value: id,
          compareValueHandler: (o) => {
            const v = getValueByKey({
              data: o,
              key: fieldData.workflowBranchConditionItemId.name,
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
        accessWayCollection.workflowBranchConditionItem.refreshCache.permission,
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
            accessWayCollection.workflowBranchConditionItem
              .updateDescriptiveInfo.permission,
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
            accessWayCollection.workflowBranchConditionItem.maintainChannel
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
      dataTarget: fieldData.workflowBranchConditionName,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.targetTitle,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.targetName,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.targetType,
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
        return getFlowBranchConditionItemTargetTypeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.targetComparisonMode,
      width: 200,
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
        return getFlowBranchConditionItemTargetComparisonModeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.targetValue,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.targetMinValue,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.targetMaxValue,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.targetSourceMode,
      width: 100,
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
        return getFlowBranchConditionItemTargetSourceModeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.workflowNodeName,
      width: 120,
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
          text: getFlowBranchConditionItemStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.workflowBranchConditionItemId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.workflowBranchConditionId,
      width: 160,
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
}

export { PageListDrawer };
