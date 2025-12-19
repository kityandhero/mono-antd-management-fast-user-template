import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/noticeAttachment/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress = '/noticeAttachment/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/noticeAttachment/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addDataApiAddress = '/noticeAttachment/add';

export async function addData(parameters) {
  return request({
    api: addDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/noticeAttachment/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/noticeAttachment/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}
