import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

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
        key: fieldData.workflowId.name,
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

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowFormDesignTypeCollection.refreshCache,
    params: {
      workflowLineId: getValueByKey({
        data: handleData,
        key: fieldData.workflowLineId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
