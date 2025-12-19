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
    api: 'noticeTagRelation/add',
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
    api: 'noticeTagRelation/addBatch',
    params: {
      noticeId: getValueByKey({
        data: handleData,
        key: fieldData.noticeId.name,
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
    api: 'noticeTagRelation/remove',
    params: {
      noticeId: getValueByKey({
        data: handleData,
        key: fieldData.noticeId.name,
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
  successMessage,
}) {
  actionCore({
    api: 'noticeTagRelation/refreshCache',
    params: {
      noticeTagRelationId: getValueByKey({
        data: handleData,
        key: fieldData.noticeTagRelationId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
