import {
  buildRandomHexColor,
  convertCollection,
  getValueByKey,
  toNumber,
  whetherNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { ColorText, iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { fieldDataFlowCaseProcessHistory } from '../../../../customConfig';
import {
  getChannelName,
  getFlowApproveActionModeName,
  getFlowApproveActionName,
  getFlowCaseProcessHistoryStatusName,
} from '../../../../customSpecialComponents';
import { getFlowCaseProcessHistoryStatusBadge } from '../Assist';

const { MultiPageDrawer } = DataMultiPageView;

class BaseFlowCaseProcessHistoryPageListDrawer extends MultiPageDrawer {
  reloadWhenShow = true;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      listViewMode: listViewConfig.viewMode.table,
      pageTitle: '',
      loadApiPath: '',
      tableScrollX: 1400,
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

    d[fieldDataFlowCaseProcessHistory.flowCaseId.name] = getValueByKey({
      data: externalData,
      key: fieldDataFlowCaseProcessHistory.flowCaseId.name,
    });

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  getFlowCaseProcessHistoryId = (o) => {
    throw new Error('getFlowCaseProcessHistoryId need overrode to implement');
  };

  getFlowCaseProcessHistoryIdDataTarget = () => {
    throw new Error(
      'getFlowCaseProcessHistoryIdDataTarget need overrode to implement',
    );
  };

  // eslint-disable-next-line no-unused-vars
  refreshCache = (item) => {
    throw new Error('refreshCache need overrode to implement');
  };

  checkHasRefreshCacheAuthority = () => {
    throw new Error('checkHasRefreshCacheAuthority need overrode to implement');
  };

  renderPresetTitleIcon = () => null;

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 16,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldDataFlowCaseProcessHistory.approveWorkflowNodeName,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListViewItemLayout = () => {
    return 'vertical';
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '刷新缓存',
      icon: iconBuilder.reload(),
      disabled: !this.checkHasRefreshCacheAuthority(),
      handleButtonClick: ({ handleData }) => {
        this.refreshCache(handleData);
      },
      handleData: record,
      confirm: true,
      title: '即将刷新缓存，确定吗？',
    };
  };

  // eslint-disable-next-line no-unused-vars
  establishPresetListViewItemInnerConfig = (item, index) => {
    const approveAction = getValueByKey({
      data: item,
      key: fieldDataFlowCaseProcessHistory.approveAction.name,
      convert: convertCollection.number,
    });

    const approveActionMode = getValueByKey({
      data: item,
      key: fieldDataFlowCaseProcessHistory.approveActionMode.name,
      convert: convertCollection.number,
    });

    return {
      title: {
        label: fieldDataFlowCaseProcessHistory.approveWorkflowNodeName.label,
        text: getValueByKey({
          data: item,
          key: fieldDataFlowCaseProcessHistory.approveWorkflowNodeName.name,
        }),
      },
      descriptionList: [
        {
          label: fieldDataFlowCaseProcessHistory.approveUserName.label,
          text: getValueByKey({
            data: item,
            key: fieldDataFlowCaseProcessHistory.approveUserName.name,
          }),
          color: '#999999',
          extra: (
            <ColorText
              textPrefix={fieldDataFlowCaseProcessHistory.approveAction.label}
              text={getFlowApproveActionName({
                value: approveAction,
              })}
              randomColor
              randomSeed={approveAction}
              separatorStyle={{
                paddingRight: '4px',
              }}
              seedOffset={18}
            />
          ),
        },
        {
          label:
            fieldDataFlowCaseProcessHistory.approveWorkflowNodeTypeNote.label,
          text: getValueByKey({
            data: item,
            key: fieldDataFlowCaseProcessHistory.approveWorkflowNodeTypeNote
              .name,
          }),
          color: '#999999',
          extra: (
            <ColorText
              textPrefix={
                fieldDataFlowCaseProcessHistory.approveActionModeNote.label
              }
              text={getFlowApproveActionModeName({
                value: approveActionMode,
              })}
              randomColor
              randomSeed={approveActionMode}
              separatorStyle={{
                paddingRight: '4px',
              }}
              seedOffset={18}
            />
          ),
        },
      ],
      actionList: [
        {
          label: this.getFlowCaseProcessHistoryIdDataTarget().label,
          text: this.getFlowCaseProcessHistoryId(item),
          canCopy: true,
          color: '#999999',
        },
        {
          label: fieldDataFlowCaseProcessHistory.approveActionReuseNote.label,
          text: getValueByKey({
            data: item,
            key: fieldDataFlowCaseProcessHistory.approveActionReuseNote.name,
          }),
          color: '#999999',
        },
        {
          label: fieldDataFlowCaseProcessHistory.channel.label,
          text: getChannelName({
            value: getValueByKey({
              data: item,
              key: fieldDataFlowCaseProcessHistory.channel.name,
            }),
          }),
          color: '#999999',
        },
        {
          label: fieldDataFlowCaseProcessHistory.createTime.label,
          text: getValueByKey({
            data: item,
            key: fieldDataFlowCaseProcessHistory.createTime.name,
          }),
          color: '#999999',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldDataFlowCaseProcessHistory.approveWorkflowNodeName,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldDataFlowCaseProcessHistory.approveWorkflowNodeTypeNote,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldDataFlowCaseProcessHistory.approveAction,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: value * 2 + 21,
          }),
        };
      },
      formatValue: (value) => {
        return getFlowApproveActionName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldDataFlowCaseProcessHistory.approveActionMode,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: value * 2 + 15,
          }),
        };
      },
      formatValue: (value) => {
        return getFlowApproveActionModeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldDataFlowCaseProcessHistory.approveActionReuse,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: value * 2 + 15,
          }),
        };
      },
      formatValue: (value, record) => {
        return getValueByKey({
          data: record,
          key: fieldDataFlowCaseProcessHistory.approveActionReuseNote.name,
        });
      },
    },
    {
      dataTarget: fieldDataFlowCaseProcessHistory.whetherSkip,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: value * 3 + 22,
          }),
        };
      },
      formatValue: (value) => {
        return value === whetherNumber.yes ? '是' : '否';
      },
    },
    {
      dataTarget: fieldDataFlowCaseProcessHistory.channel,
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
      dataTarget: fieldDataFlowCaseProcessHistory.status,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getFlowCaseProcessHistoryStatusBadge(value),
          text: getFlowCaseProcessHistoryStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: this.getFlowCaseProcessHistoryIdDataTarget(),
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldDataFlowCaseProcessHistory.flowCaseId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldDataFlowCaseProcessHistory.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];
}

export { BaseFlowCaseProcessHistoryPageListDrawer };
