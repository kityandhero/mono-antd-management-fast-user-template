import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/noticeTagRelation/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress = '/noticeTagRelation/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/noticeTagRelation/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addDataApiAddress = '/noticeTagRelation/add';

export async function addData(parameters) {
  return request({
    api: addDataApiAddress,
    params: parameters,
  });
}

export const addBatchDataApiAddress = '/noticeTagRelation/addBatch';

export async function addBatchData(parameters) {
  return request({
    api: addBatchDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/noticeTagRelation/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/noticeTagRelation/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}
