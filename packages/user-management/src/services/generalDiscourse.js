import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/generalDiscourse/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress = '/generalDiscourse/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/generalDiscourse/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/generalDiscourse/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}
