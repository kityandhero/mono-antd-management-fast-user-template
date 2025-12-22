import {
  checkStringIsNullOrWhiteSpace,
  getValueByKey,
} from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function testPermissionAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.accessWayTypeCollection.testPermissionAction,
    params: {},
    target,
    handleData,
    successCallback,
    successMessageBuilder: ({ remoteData }) => {
      const { testDomain } = {
        testDomain: '',
        ...remoteData,
      };

      return `测试域：${
        checkStringIsNullOrWhiteSpace(testDomain) ? '无地址' : testDomain
      }`;
    },
  });
}

export async function removeAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.accessWayTypeCollection.remove,
    params: {
      accessWayId: getValueByKey({
        data: handleData,
        key: fieldData.accessWayId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage: successMessage || `测试已经开始运行`,
  });
}

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.accessWayTypeCollection.refreshCache,
    params: {
      accessWayId: getValueByKey({
        data: handleData,
        key: fieldData.accessWayId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
