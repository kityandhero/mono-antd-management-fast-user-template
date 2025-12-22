import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function addBasicInfoAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.cloudStorageTypeCollection.addBasicInfo,
    params: handleData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function removeAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.cloudStorageTypeCollection.remove,
    params: {
      cloudStorageId: getValueByKey({
        data: handleData,
        key: fieldData.cloudStorageId.name,
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
    api: modelTypeCollection.cloudStorageTypeCollection.refreshCache,
    params: {
      cloudStorageId: getValueByKey({
        data: handleData,
        key: fieldData.cloudStorageId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
