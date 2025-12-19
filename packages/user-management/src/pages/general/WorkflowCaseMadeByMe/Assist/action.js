import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function addBasicInfoAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowCase/addBasicInfo',
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
    api: 'workflowCase/submitApproval',
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
    api: 'workflowCase/refreshCache',
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
