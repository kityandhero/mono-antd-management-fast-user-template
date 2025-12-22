import { getValueByKey } from 'easy-soft-utility';

import { actionCore, confirmActionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function addBasicInfoAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.workflowDebugCaseFormAttachmentTypeCollection
      .addBasicInfo,
    params: handleData,
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
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.workflowDebugCaseFormAttachmentTypeCollection
      .remove,
    params: {
      workflowDebugCaseFormAttachmentId: getValueByKey({
        data: handleData,
        key: fieldData.workflowDebugCaseFormAttachmentId.name,
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
    title: `移除附件`,
    content: `即将移除附件，确定吗？`,
    api: modelTypeCollection.workflowDebugCaseFormAttachmentTypeCollection
      .remove,
    params: {
      workflowDebugCaseFormAttachmentId: getValueByKey({
        data: handleData,
        key: fieldData.workflowDebugCaseFormAttachmentId.name,
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
    api: modelTypeCollection.workflowDebugCaseFormAttachmentTypeCollection
      .refreshCache,
    params: {
      workflowDebugCaseFormAttachmentId: getValueByKey({
        data: handleData,
        key: fieldData.workflowDebugCaseFormAttachmentId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
