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
    api: 'noticeAttachment/add',
    params: handleData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setOnlineAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'noticeAttachment/setOnline',
    params: {
      noticeAttachmentId: getValueByKey({
        data: handleData,
        key: fieldData.noticeAttachmentId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setOfflineAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'noticeAttachment/setOffline',
    params: {
      noticeAttachmentId: getValueByKey({
        data: handleData,
        key: fieldData.noticeAttachmentId.name,
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
    api: 'noticeAttachment/remove',
    params: {
      noticeAttachmentId: getValueByKey({
        data: handleData,
        key: fieldData.noticeAttachmentId.name,
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
    api: 'noticeAttachment/refreshCache',
    params: {
      noticeAttachmentId: getValueByKey({
        data: handleData,
        key: fieldData.noticeAttachmentId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
