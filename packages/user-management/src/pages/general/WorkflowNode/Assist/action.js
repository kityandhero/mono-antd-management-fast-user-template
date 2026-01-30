import { getValueByKey, request } from 'easy-soft-utility';

import { actionCore, confirmActionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

export function updateViewConfigAction({ handleData }) {
  request({
    api: modelTypeCollection.workflowNodeTypeCollection.updateViewConfig,
    params: {
      workflowNodeId: getValueByKey({
        data: handleData,
        key: fieldData.workflowNodeId.name,
      }),
      viewConfigData: getValueByKey({
        data: handleData,
        key: fieldData.viewConfigData.name,
      }),
    },
  });
}

export function addStartPointAction({
  target,
  handleData,
  beforeProcess,
  completeProcess,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowNodeTypeCollection.addStartPoint,
    params: handleData || {},
    target,
    handleData,
    beforeProcess,
    completeProcess,
    successCallback,
    successMessage,
    setProgressingFirst: false,
  });
}

export function addEndPointAction({
  target,
  handleData,
  beforeProcess,
  completeProcess,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowNodeTypeCollection.addEndPoint,
    params: handleData || {},
    target,
    handleData,
    beforeProcess,
    completeProcess,
    successCallback,
    successMessage,
    setProgressingFirst: false,
  });
}

export async function maintainChannelAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowNodeTypeCollection.maintainChannel,
    params: {
      workflowNodeId: getValueByKey({
        data: handleData,
        key: fieldData.workflowNodeId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function removeAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowNodeTypeCollection.remove,
    params: {
      workflowNodeId: getValueByKey({
        data: handleData,
        key: fieldData.workflowNodeId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function removeConfirmAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  confirmActionCore({
    title: `移除流程节点`,
    content: `即将移除流程线, 注意连结到此节点的流程线吉将同步移除，确定吗？`,
    api: modelTypeCollection.workflowNodeTypeCollection.remove,
    params: {
      workflowNodeId: getValueByKey({
        data: handleData,
        key: fieldData.workflowNodeId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowNodeTypeCollection.refreshCache,
    params: {
      workflowNodeId: getValueByKey({
        data: handleData,
        key: fieldData.workflowNodeId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
