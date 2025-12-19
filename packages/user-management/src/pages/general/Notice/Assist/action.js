import { getValueByKey, request } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { updateTitleColorDataApiAddress } from '../../../services/notice';
import { fieldData } from '../Common/data';

export async function getAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'notice/get',
    params: {
      noticeId: getValueByKey({
        data: handleData,
        key: fieldData.noticeId.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function updateTitleColorAction({ handleData }) {
  request({
    api: updateTitleColorDataApiAddress,
    params: {
      noticeId: getValueByKey({
        data: handleData,
        key: fieldData.noticeId.name,
        defaultValue: '',
      }),
      titleColor: getValueByKey({
        data: handleData,
        key: fieldData.titleColor.name,
        defaultValue: '',
      }),
    },
  });
}

export async function setTargetModeAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'notice/setTargetMode',
    params: {
      noticeId: getValueByKey({
        data: handleData,
        key: fieldData.noticeId.name,
        defaultValue: '',
      }),
      targetMode: getValueByKey({
        data: handleData,
        key: fieldData.targetMode.name,
        defaultValue: '',
      }),
    },
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
    api: 'notice/setOnline',
    params: {
      noticeId: getValueByKey({
        data: handleData,
        key: fieldData.noticeId.name,
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
    api: 'notice/setOffline',
    params: {
      noticeId: getValueByKey({
        data: handleData,
        key: fieldData.noticeId.name,
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
    api: 'notice/refreshCache',
    params: {
      noticeId: getValueByKey({
        data: handleData,
        key: fieldData.noticeId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
