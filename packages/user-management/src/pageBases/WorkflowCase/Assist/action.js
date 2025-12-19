import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function singleListNextNodeApproverAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowCaseTypeCollection
      .singleListNextNodeApprover,
    params: {
      workflowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
    showProcessing: false,
    showSuccessMessage: false,
  });
}

export async function getChainAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.workflowCaseTypeCollection.getChain,
    params: {
      workflowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseId.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
    showProcessing: false,
  });
}

export async function addBasicInfoAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowCaseTypeCollection.addBasicInfo,
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

export async function submitApprovalAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowCaseTypeCollection.submitApproval,
    params: {
      workflowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function toggleEmergencyAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  // 验证必要参数是否存在
  const workflowCaseId = getValueByKey({
    data: handleData,
    key: fieldData.workflowCaseId.name,
  });

  if (!workflowCaseId) {
    console.warn('Missing required parameter: workflowCaseId');
    return;
  }

  actionCore({
    api: modelTypeCollection.workflowCaseTypeCollection.toggleEmergency,
    params: {
      workflowCaseId,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function forceEndAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowCaseTypeCollection.forceEnd,
    params: {
      workflowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function disuseAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowCaseTypeCollection.disuse,
    params: {
      workflowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function hideAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowCaseTypeCollection.hide,
    params: {
      workflowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseId.name,
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
    api: modelTypeCollection.workflowCaseTypeCollection.refreshCache,
    params: {
      workflowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
