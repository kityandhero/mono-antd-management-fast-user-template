import { connect } from 'easy-soft-dva';
import { getValueByKey, showSimpleErrorMessage } from 'easy-soft-utility';

import {
  columnFacadeMode,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataSinglePageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import {
  accessWayCollection,
  fieldDataFlowNode,
} from '../../../../customConfig';
import { getFlowNodeApproverStatusName } from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { refreshCacheAction } from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { ChangeSortModal } from '../ChangeSortModal';
import { fieldData } from '../Common/data';

const { SinglePageDrawer } = DataSinglePageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '2de76e5b720a4b3baf2fb4b4747f6345';

@connect(({ workflowNodeApprover, schedulingControl }) => ({
  workflowNodeApprover,
  schedulingControl,
}))
class WorkflowNodeApproverSingleListDrawer extends SinglePageDrawer {
  reloadWhenShow = true;

  componentAuthority =
    accessWayCollection.workflowNodeApprover.pageList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      tableScrollX: 840,
      pageTitle: '流程节点审批人列表',
      loadApiPath:
        modelTypeCollection.workflowNodeApproverTypeCollection.singleList,
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
    const { externalData } = this.props;

    d[fieldDataFlowNode.workflowNodeId.name] = getValueByKey({
      data: externalData,
      key: fieldDataFlowNode.workflowNodeId.name,
    });

    return d;
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'refreshCache': {
        this.refreshCache(handleData);

        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  showChangeSortModal = (r) => {
    this.setState({ currentRecord: r }, () => {
      ChangeSortModal.open();
    });
  };

  afterChangeSortModalOk = ({
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

  buildTitleSubText = () => {
    const { externalData } = this.props;

    return getValueByKey({
      data: externalData,
      key: fieldDataFlowNode.name.name,
    });
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 16,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.workflowNodeApproverId,
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
      text: '排序',
      placement: 'topRight',
      icon: iconBuilder.edit(),
      handleButtonClick: ({ handleData }) => {
        this.showChangeSortModal(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          confirm: true,
          title: '将要刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.userRealName,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.sort,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
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
          text: getFlowNodeApproverStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.workflowNodeApproverId,
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
        <ChangeSortModal
          externalData={currentRecord}
          afterOK={this.afterChangeSortModalOk}
        />
      </>
    );
  };
}

export { WorkflowNodeApproverSingleListDrawer };
