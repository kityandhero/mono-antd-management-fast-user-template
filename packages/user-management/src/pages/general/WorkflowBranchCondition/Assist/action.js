import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { actionCore, confirmActionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function singleListAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowBranchConditionTypeCollection.singleList,
    params: {
      workflowNodeId: getValueByKey({
        data: handleData,
        key: fieldData.workflowNodeId.name,
        convert: convertCollection.string,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
    showProcessing: false,
  });
}

export async function maintainChannelAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.workflowBranchConditionTypeCollection
      .maintainChannel,
    params: {
      workflowBranchConditionId: getValueByKey({
        data: handleData,
        key: fieldData.workflowBranchConditionId.name,
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
    title: `移除条件`,
    content: `即将移除条件，确定吗？`,
    api: modelTypeCollection.workflowBranchConditionTypeCollection.remove,
    params: {
      workflowBranchConditionId: getValueByKey({
        data: handleData,
        key: fieldData.workflowBranchConditionId.name,
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
    api: modelTypeCollection.workflowBranchConditionTypeCollection.refreshCache,
    params: {
      workflowBranchConditionId: getValueByKey({
        data: handleData,
        key: fieldData.workflowBranchConditionId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
