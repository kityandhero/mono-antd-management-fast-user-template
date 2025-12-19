import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function passAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowDebugCaseProcessHistoryTypeCollection.pass,
    params: {
      flowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.flowCaseId.name,
      }),
      note: getValueByKey({
        data: handleData,
        key: fieldData.note.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function refuseAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowDebugCaseProcessHistoryTypeCollection
      .refuse,
    params: {
      flowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.flowCaseId.name,
      }),
      note: getValueByKey({
        data: handleData,
        key: fieldData.note.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function cancelApproveAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowDebugCaseProcessHistoryTypeCollection
      .cancelApprove,
    params: {
      flowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.flowCaseId.name,
      }),
      note: getValueByKey({
        data: handleData,
        key: fieldData.note.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function resetAllApproveAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowDebugCaseProcessHistoryTypeCollection
      .resetAllApprove,
    params: {
      flowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.flowCaseId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function resetAllApproveWithWorkflowAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowDebugCaseProcessHistoryTypeCollection
      .resetAllApproveWithWorkflow,
    params: {
      workflowId: getValueByKey({
        data: handleData,
        key: fieldData.workflowId.name,
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
    api: modelTypeCollection.workflowDebugCaseProcessHistoryTypeCollection
      .refreshCache,
    params: {
      workflowDebugCaseProcessHistoryId: getValueByKey({
        data: handleData,
        key: fieldData.workflowDebugCaseProcessHistoryId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
