import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function addAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.workflowTagRelationTypeCollection.add,
    params: handleData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function addBatchAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.workflowTagRelationTypeCollection.addBatch,
    params: {
      workflowId: getValueByKey({
        data: handleData,
        key: fieldData.workflowId.name,
        defaultValue: '',
      }),
      tagIdCollection: getValueByKey({
        data: handleData,
        key: 'tagIdCollection',
        defaultValue: '',
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
    api: modelTypeCollection.workflowTagRelationTypeCollection.remove,
    params: {
      workflowId: getValueByKey({
        data: handleData,
        key: fieldData.workflowId.name,
        defaultValue: '',
      }),
      tagId: getValueByKey({
        data: handleData,
        key: fieldData.tagId.name,
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
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.workflowTagRelationTypeCollection.refreshCache,
    params: {
      workflowTagRelationId: getValueByKey({
        data: handleData,
        key: fieldData.workflowTagRelationId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
