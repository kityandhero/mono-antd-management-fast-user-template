import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function toggleSignetPasswordSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: modelTypeCollection.userTypeCollection.toggleSignetPasswordSwitch,
    params: {
      userId: getValueByKey({
        data: handleData,
        key: fieldData.userId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function openSignetPasswordSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.userTypeCollection.openSignetPasswordSwitch,
    params: {
      userId: getValueByKey({
        data: handleData,
        key: fieldData.userId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function closeSignetPasswordSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.userTypeCollection.closeSignetPasswordSwitch,
    params: {
      userId: getValueByKey({
        data: handleData,
        key: fieldData.userId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function clearParentAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.userTypeCollection.clearParent,
    params: {
      userId: getValueByKey({
        data: handleData,
        key: fieldData.userId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setEnableAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.userTypeCollection.setEnable,
    params: {
      userId: getValueByKey({
        data: handleData,
        key: fieldData.userId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setDisableAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.userTypeCollection.setDisable,
    params: {
      userId: getValueByKey({
        data: handleData,
        key: fieldData.userId.name,
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
    api: modelTypeCollection.userTypeCollection.remove,
    params: {
      userId: getValueByKey({
        data: handleData,
        key: fieldData.userId.name,
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
    api: modelTypeCollection.userTypeCollection.refreshCache,
    params: {
      userId: getValueByKey({
        data: handleData,
        key: fieldData.userId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
