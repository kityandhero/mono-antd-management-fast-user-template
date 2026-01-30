import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldDataFlowFormDesign } from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';

export async function getByWorkflowAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowFormDesignTypeCollection.getByWorkflow,
    params: {
      workflowId: getValueByKey({
        data: handleData,
        key: fieldDataFlowFormDesign.workflowId.name,
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

export async function updateDocumentSchemaAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowFormDesignTypeCollection
      .updateDocumentSchema,
    params: handleData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function updateRemarkSchemaAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowFormDesignTypeCollection
      .updateRemarkSchema,
    params: handleData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function maintainChannelAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowFormDesignTypeCollection.maintainChannel,
    params: {
      workflowFormDesignId: getValueByKey({
        data: handleData,
        key: fieldDataFlowFormDesign.workflowFormDesignId.name,
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
    api: modelTypeCollection.workflowFormDesignTypeCollection.refreshCache,
    params: {
      workflowFormDesignId: getValueByKey({
        data: handleData,
        key: fieldDataFlowFormDesign.workflowFormDesignId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
