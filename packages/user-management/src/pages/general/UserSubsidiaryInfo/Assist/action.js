import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'userSubsidiaryInfo/refreshCache',
    params: {
      userSubsidiaryInfoId: getValueByKey({
        data: handleData,
        key: fieldData.userSubsidiaryInfoId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
