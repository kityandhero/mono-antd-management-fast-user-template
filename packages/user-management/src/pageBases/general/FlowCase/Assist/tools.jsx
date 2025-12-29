import {
  convertCollection,
  getValueByKey,
  isEmptyObject,
  isFunction,
} from 'easy-soft-utility';

import { iconBuilder } from 'antd-management-fast-component';

import {
  fieldDataFlowCaseCarbonCopyNotification,
  fieldDataFlowCaseLatestApprove,
  fieldDataFlowCaseNextProcessApprove,
  fieldDataFlowCaseNextProcessNotification,
  fieldDataFlowCaseProcessHistory,
  fieldDataFlowNode,
  flowApproveActionModeCollection,
  flowCaseStatusCollection,
  flowNodeTypeCollection,
} from '../../../../customConfig';
import { getChannelName } from '../../../../customSpecialComponents';

export function getFlowCaseStatusBadge(status) {
  let result = 'default';

  switch (status) {
    case flowCaseStatusCollection.submitApproval: {
      result = 'processing';
      break;
    }

    case flowCaseStatusCollection.inApprovalProcess: {
      result = 'processing';
      break;
    }

    case flowCaseStatusCollection.refuse: {
      result = 'error';
      break;
    }

    case flowCaseStatusCollection.forcedEnd: {
      result = 'warning';
      break;
    }

    case flowCaseStatusCollection.success: {
      result = 'success';
      break;
    }

    default: {
      result = 'default';
      break;
    }
  }

  return result;
}

export function buildColumnsNextProcessApprove({
  flowCaseNextProcessApproveIdLabel,
  flowCaseNextProcessApproveIdName,
}) {
  return [
    {
      title: fieldDataFlowCaseNextProcessApprove.nextWorkflowNodeName.label,
      dataIndex: fieldDataFlowCaseNextProcessApprove.nextWorkflowNodeName.name,
      key: fieldDataFlowCaseNextProcessApprove.nextWorkflowNodeName.name,
    },
    {
      title:
        fieldDataFlowCaseNextProcessApprove.nextWorkflowNodeApproveModeNote
          .label,
      dataIndex:
        fieldDataFlowCaseNextProcessApprove.nextWorkflowNodeApproveModeNote
          .name,
      key: fieldDataFlowCaseNextProcessApprove.nextWorkflowNodeApproveModeNote
        .name,
      ellipsis: true,
      align: 'center',
      width: '240px',
      render: (text) => {
        return text || '--';
      },
    },
    {
      title: fieldDataFlowCaseNextProcessApprove.nextApproveUserRealName.label,
      dataIndex:
        fieldDataFlowCaseNextProcessApprove.nextApproveUserRealName.name,
      key: fieldDataFlowCaseNextProcessApprove.nextApproveUserRealName.name,
      align: 'center',
      ellipsis: true,
      width: '120px',
    },
    {
      title: fieldDataFlowCaseNextProcessApprove.channel.label,
      dataIndex: fieldDataFlowCaseNextProcessApprove.channel.name,
      key: fieldDataFlowCaseNextProcessApprove.channel.name,
      align: 'center',
      ellipsis: true,
      width: '120px',
      render: (text) => {
        return getChannelName({
          value: text,
        });
      },
    },
    {
      title: flowCaseNextProcessApproveIdLabel,
      dataIndex: flowCaseNextProcessApproveIdName,
      key: flowCaseNextProcessApproveIdName,
      align: 'center',
      ellipsis: true,
      width: '160px',
    },
    {
      title: fieldDataFlowCaseNextProcessApprove.createTime.label,
      dataIndex: fieldDataFlowCaseNextProcessApprove.createTime.name,
      key: fieldDataFlowCaseNextProcessApprove.createTime.name,
      align: 'center',
      ellipsis: true,
      width: '160px',
    },
  ];
}

export function buildColumnsNextProcessNotification({
  flowCaseNextProcessNotificationIdLabel,
  flowCaseNextProcessNotificationIdName,
  operationBuilder = null,
}) {
  return [
    {
      title:
        fieldDataFlowCaseNextProcessNotification.nextWorkflowNodeName.label,
      dataIndex:
        fieldDataFlowCaseNextProcessNotification.nextWorkflowNodeName.name,
      key: fieldDataFlowCaseNextProcessNotification.nextWorkflowNodeName.name,
      width: '200px',
    },
    {
      title: fieldDataFlowCaseNextProcessNotification.content.label,
      dataIndex: fieldDataFlowCaseNextProcessNotification.content.name,
      key: fieldDataFlowCaseNextProcessNotification.content.name,
      ellipsis: true,
    },
    {
      title: fieldDataFlowCaseNextProcessNotification.whetherSmsSendNote.label,
      dataIndex:
        fieldDataFlowCaseNextProcessNotification.whetherSmsSendNote.name,
      key: fieldDataFlowCaseNextProcessNotification.whetherSmsSendNote.name,
      align: 'center',
      ellipsis: true,
      width: '100px',
    },
    {
      title: fieldDataFlowCaseNextProcessNotification.whetherReadNote.label,
      dataIndex: fieldDataFlowCaseNextProcessNotification.whetherReadNote.name,
      key: fieldDataFlowCaseNextProcessNotification.whetherReadNote.name,
      align: 'center',
      ellipsis: true,
      width: '100px',
    },
    {
      title:
        fieldDataFlowCaseNextProcessNotification.nextApproveUserRealName.label,
      dataIndex:
        fieldDataFlowCaseNextProcessNotification.nextApproveUserRealName.name,
      key: fieldDataFlowCaseNextProcessNotification.nextApproveUserRealName
        .name,
      align: 'center',
      ellipsis: true,
      width: '120px',
    },
    {
      title: fieldDataFlowCaseNextProcessNotification.channel.label,
      dataIndex: fieldDataFlowCaseNextProcessNotification.channel.name,
      key: fieldDataFlowCaseNextProcessNotification.channel.name,
      align: 'center',
      ellipsis: true,
      width: '120px',
      render: (text) => {
        return getChannelName({
          value: text,
        });
      },
    },
    {
      title: flowCaseNextProcessNotificationIdLabel,
      dataIndex: flowCaseNextProcessNotificationIdName,
      key: flowCaseNextProcessNotificationIdName,
      align: 'center',
      ellipsis: true,
      width: '160px',
    },
    {
      title: fieldDataFlowCaseNextProcessNotification.createTime.label,
      dataIndex: fieldDataFlowCaseNextProcessNotification.createTime.name,
      key: fieldDataFlowCaseNextProcessNotification.createTime.name,
      align: 'center',
      ellipsis: true,
      width: '160px',
    },
    ...(isFunction(operationBuilder)
      ? [
          {
            title: '操作',
            key: 'operationNotification',
            width: '120px',
            align: 'center',
            render: (v, o, index) => <>{operationBuilder(v, o, index)}</>,
          },
        ]
      : []),
  ];
}

export function buildColumnsCarbonCopyNotification({
  flowCaseCarbonCopyNotificationIdLabel,
  flowCaseCarbonCopyNotificationIdName,
  operationBuilder = null,
}) {
  return [
    {
      title: fieldDataFlowCaseCarbonCopyNotification.content.label,
      dataIndex: fieldDataFlowCaseCarbonCopyNotification.content.name,
      key: fieldDataFlowCaseCarbonCopyNotification.content.name,
      ellipsis: true,
    },
    {
      title:
        fieldDataFlowCaseCarbonCopyNotification.carbonCopyUserRealName.label,
      dataIndex:
        fieldDataFlowCaseCarbonCopyNotification.carbonCopyUserRealName.name,
      key: fieldDataFlowCaseCarbonCopyNotification.carbonCopyUserRealName.name,
      align: 'center',
      ellipsis: true,
      width: '120px',
    },
    {
      title: fieldDataFlowCaseCarbonCopyNotification.whetherSmsSendNote.label,
      dataIndex:
        fieldDataFlowCaseCarbonCopyNotification.whetherSmsSendNote.name,
      key: fieldDataFlowCaseCarbonCopyNotification.whetherSmsSendNote.name,
      align: 'center',
      ellipsis: true,
      width: '100px',
    },
    {
      title: fieldDataFlowCaseCarbonCopyNotification.channel.label,
      dataIndex: fieldDataFlowCaseCarbonCopyNotification.channel.name,
      key: fieldDataFlowCaseCarbonCopyNotification.channel.name,
      align: 'center',
      ellipsis: true,
      width: '120px',
      render: (text) => {
        return getChannelName({
          value: text,
        });
      },
    },
    {
      title: flowCaseCarbonCopyNotificationIdLabel,
      dataIndex: flowCaseCarbonCopyNotificationIdName,
      key: flowCaseCarbonCopyNotificationIdName,
      align: 'center',
      ellipsis: true,
      width: '160px',
    },
    {
      title: fieldDataFlowCaseCarbonCopyNotification.createTime.label,
      dataIndex: fieldDataFlowCaseCarbonCopyNotification.createTime.name,
      key: fieldDataFlowCaseCarbonCopyNotification.createTime.name,
      align: 'center',
      ellipsis: true,
      width: '160px',
    },
    ...(isFunction(operationBuilder)
      ? [
          {
            title: '操作',
            key: 'operationNotification',
            width: '120px',
            align: 'center',
            render: (v, o, index) => <>{operationBuilder(v, o, index)}</>,
          },
        ]
      : []),
  ];
}

export function buildColumnsCaseLatestApprove({
  flowCaseLatestApproveIdLabel,
  flowCaseLatestApproveIdName,
}) {
  return [
    {
      title: fieldDataFlowCaseLatestApprove.viewableUserRealName.label,
      dataIndex: fieldDataFlowCaseLatestApprove.viewableUserRealName.name,
      key: fieldDataFlowCaseLatestApprove.viewableUserRealName.name,
      align: 'center',
      ellipsis: true,
      width: '160px',
    },
    {
      title: fieldDataFlowCaseLatestApprove.workflowNodeName.label,
      dataIndex: fieldDataFlowCaseLatestApprove.workflowNodeName.name,
      key: fieldDataFlowCaseLatestApprove.workflowNodeName.name,
    },
    {
      title: fieldDataFlowCaseLatestApprove.typeNote.label,
      dataIndex: fieldDataFlowCaseLatestApprove.typeNote.name,
      key: fieldDataFlowCaseLatestApprove.typeNote.name,
      ellipsis: true,
      align: 'center',
      width: '140px',
    },
    {
      title: fieldDataFlowCaseLatestApprove.approveActionModeNote.label,
      dataIndex: fieldDataFlowCaseLatestApprove.approveActionModeNote.name,
      key: fieldDataFlowCaseLatestApprove.approveActionModeNote.name,
      ellipsis: true,
      align: 'center',
      width: '140px',
    },
    {
      title: fieldDataFlowCaseLatestApprove.approveActionNote.label,
      dataIndex: fieldDataFlowCaseLatestApprove.approveActionNote.name,
      key: fieldDataFlowCaseLatestApprove.approveActionNote.name,
      ellipsis: true,
      align: 'center',
      width: '140px',
      render: (text) => {
        return text || '--';
      },
    },
    {
      title: fieldDataFlowCaseNextProcessNotification.channel.label,
      dataIndex: fieldDataFlowCaseNextProcessNotification.channel.name,
      key: fieldDataFlowCaseNextProcessNotification.channel.name,
      align: 'center',
      ellipsis: true,
      width: '120px',
      render: (text) => {
        return getChannelName({
          value: text,
        });
      },
    },
    {
      title: flowCaseLatestApproveIdLabel,
      dataIndex: flowCaseLatestApproveIdName,
      key: flowCaseLatestApproveIdName,
      align: 'center',
      ellipsis: true,
      width: '160px',
    },
    {
      title: fieldDataFlowCaseLatestApprove.updateTime.label,
      dataIndex: fieldDataFlowCaseLatestApprove.updateTime.name,
      key: fieldDataFlowCaseLatestApprove.updateTime.name,
      align: 'center',
      ellipsis: true,
      width: '160px',
    },
  ];
}

export function convertProcessHistoryItemData(o) {
  const approveWorkflowNodeName = getValueByKey({
    data: o,
    key: fieldDataFlowCaseProcessHistory.approveWorkflowNodeName.name,
  });

  const approveWorkflowNodeType = getValueByKey({
    data: o,
    key: fieldDataFlowCaseProcessHistory.approveWorkflowNodeType.name,
    convert: convertCollection.number,
  });

  const approveActionNote = getValueByKey({
    data: o,
    key: fieldDataFlowCaseProcessHistory.approveActionNote.name,
  });

  const approveActionMode = getValueByKey({
    data: o,
    key: fieldDataFlowCaseProcessHistory.approveActionMode.name,
  });

  const note = getValueByKey({
    data: o,
    key: fieldDataFlowCaseProcessHistory.note.name,
  });

  const approveUserName = getValueByKey({
    data: o,
    key: fieldDataFlowCaseProcessHistory.approveUserName.name,
  });

  const time = getValueByKey({
    data: o,
    key: fieldDataFlowCaseProcessHistory.createTime.name,
  });

  if (approveWorkflowNodeType === flowNodeTypeCollection.intermediateNode) {
    return {
      ...o,
      title: approveWorkflowNodeName,
      result: approveActionNote,
      note: note || '未填写',
      operatorName: approveUserName,
      time,
    };
  }

  return {
    ...o,
    title: approveWorkflowNodeName,
    result: '',
    note: '',
    operatorName: '',
    time: '',
    compact: approveActionMode === flowApproveActionModeCollection.autoControl,
  };
}

export function convertProcessHistoryNextData(o) {
  if (o == null || isEmptyObject(o)) {
    return null;
  }

  const nextApproveWorkflowNodeName = getValueByKey({
    data: o,
    key: fieldDataFlowNode.name.name,
  });

  return {
    ...o,
    titlePrefix: '待审批节点',
    title: nextApproveWorkflowNodeName,
    icon: iconBuilder.clock(),
    color: 'blue',
    result: '',
    note: '',
    operatorName: '',
    time: '',
  };
}
