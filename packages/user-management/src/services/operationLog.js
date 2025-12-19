import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/operationLog/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/operationLog/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/operationLog/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}
