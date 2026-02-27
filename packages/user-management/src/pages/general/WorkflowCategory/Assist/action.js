import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

export function singleTreeListAction({
  target,
  handleData = {},
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowCategoryTypeCollection.singleTreeList,
    params: {
      ...handleData,
    },
    target,
    handleData,
    showProcessing: false,
    successCallback,
    successMessage,
  });
}

export async function setParentIdAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowCategoryTypeCollection.setParentId,
    params: {
      workflowCategoryId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCategoryId.name,
      }),
      parentId: getValueByKey({
        data: handleData,
        key: fieldData.parentId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function clearParentIdAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowCategoryTypeCollection.clearParentId,
    params: {
      workflowCategoryId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCategoryId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setEnableAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowCategoryTypeCollection.setEnable,
    params: {
      workflowCategoryId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCategoryId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setDisableAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowCategoryTypeCollection.setDisable,
    params: {
      workflowCategoryId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCategoryId.name,
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
    api: modelTypeCollection.workflowCategoryTypeCollection.refreshCache,
    params: {
      workflowCategoryId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCategoryId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
