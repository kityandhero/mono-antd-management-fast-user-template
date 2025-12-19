import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function addBasicInfoAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'cloudStorage/addBasicInfo',
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
    api: 'cloudStorage/remove',
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
    api: 'cloudStorage/refreshCache',
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
