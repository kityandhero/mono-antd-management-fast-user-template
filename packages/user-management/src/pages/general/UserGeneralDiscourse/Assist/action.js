import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData, statusCollection } from '../Common/data';

export async function singleListAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'userGeneralDiscourse/singleList',
    params: {
      ...handleData,
      status: statusCollection.enable,
    },
    target,
    handleData,
    successCallback,
    successMessage,
    showProcessing: false,
    showSuccessMessage: false,
  });
}

export function setEnableAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'userGeneralDiscourse/setEnable',
    params: {
      userGeneralDiscourseId: getValueByKey({
        data: handleData,
        key: fieldData.userGeneralDiscourseId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function setDisableAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'userGeneralDiscourse/setDisable',
    params: {
      userGeneralDiscourseId: getValueByKey({
        data: handleData,
        key: fieldData.userGeneralDiscourseId.name,
      }),
    },
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
  successMessage = null,
}) {
  actionCore({
    api: 'userGeneralDiscourse/remove',
    params: {
      userGeneralDiscourseId: getValueByKey({
        data: handleData,
        key: fieldData.userGeneralDiscourseId.name,
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
    api: 'userGeneralDiscourse/refreshCache',
    params: {
      userGeneralDiscourseId: getValueByKey({
        data: handleData,
        key: fieldData.userGeneralDiscourseId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
