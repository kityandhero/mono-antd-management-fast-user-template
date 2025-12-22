import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData, statusCollection } from '../Common/data';

export async function singleListAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.generalDiscourseTypeCollection.singleList,
    params: {
      ...handleData,
      status: statusCollection.enable,
    },
    target,
    handleData,
    successCallback,
    successMessage,
    showProcessing: false,
  });
}

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.generalDiscourseTypeCollection.refreshCache,
    params: {
      generalDiscourseId: getValueByKey({
        data: handleData,
        key: fieldData.generalDiscourseId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
