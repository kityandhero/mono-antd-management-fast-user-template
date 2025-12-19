import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function addAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'noticeUserRelation/add',
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
    api: 'noticeUserRelation/addBatch',
    params: {
      noticeId: getValueByKey({
        data: handleData,
        key: fieldData.noticeId.name,
        defaultValue: '',
      }),
      userIdCollection: getValueByKey({
        data: handleData,
        key: 'userIdCollection',
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
    api: 'noticeUserRelation/remove',
    params: {
      noticeId: getValueByKey({
        data: handleData,
        key: fieldData.noticeId.name,
        defaultValue: '',
      }),
      userId: getValueByKey({
        data: handleData,
        key: fieldData.userId.name,
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
    api: 'noticeUserRelation/refreshCache',
    params: {
      noticeUserRelationId: getValueByKey({
        data: handleData,
        key: fieldData.noticeUserRelationId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
