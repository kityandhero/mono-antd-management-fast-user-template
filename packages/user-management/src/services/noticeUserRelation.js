import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/noticeUserRelation/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress = '/noticeUserRelation/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/noticeUserRelation/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addDataApiAddress = '/noticeUserRelation/add';

export async function addData(parameters) {
  return request({
    api: addDataApiAddress,
    params: parameters,
  });
}

export const addBatchDataApiAddress = '/noticeUserRelation/addBatch';

export async function addBatchData(parameters) {
  return request({
    api: addBatchDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/noticeUserRelation/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/noticeUserRelation/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}
