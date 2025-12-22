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
    api: modelTypeCollection.workflowCaseProcessHistoryTypeCollection.pass,
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
    api: modelTypeCollection.workflowCaseProcessHistoryTypeCollection.refuse,
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
    api: modelTypeCollection.workflowCaseProcessHistoryTypeCollection
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

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowCaseProcessHistoryTypeCollection
      .refreshCache,
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
