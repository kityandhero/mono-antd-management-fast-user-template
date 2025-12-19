import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function passAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowCaseProcessHistory/pass',
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
    api: 'workflowCaseProcessHistory/refuse',
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
    api: 'workflowCaseProcessHistory/cancelApprove',
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

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowCaseProcessHistory/refreshCache',
    params: {
      workflowCaseProcessHistoryId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseProcessHistoryId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
