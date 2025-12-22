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
    api: modelTypeCollection.departmentTypeCollection.singleTreeList,
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setNormalAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.departmentTypeCollection.setNormal,
    params: {
      departmentId: getValueByKey({
        data: handleData,
        key: fieldData.departmentId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setInvalidAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.departmentTypeCollection.setInvalid,
    params: {
      departmentId: getValueByKey({
        data: handleData,
        key: fieldData.departmentId.name,
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
    api: modelTypeCollection.departmentTypeCollection.refreshCache,
    params: {
      departmentId: getValueByKey({
        data: handleData,
        key: fieldData.departmentId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
