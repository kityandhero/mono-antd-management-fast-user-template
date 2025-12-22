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
    api: modelTypeCollection.noticeTagRelationTypeCollection.add,
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
    api: modelTypeCollection.noticeTagRelationTypeCollection.addBatch,
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
    api: modelTypeCollection.noticeTagRelationTypeCollection.remove,
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
    api: modelTypeCollection.noticeTagRelationTypeCollection.refreshCache,
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
