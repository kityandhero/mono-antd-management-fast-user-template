import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/workflowTagRelation/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/workflowTagRelation/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addDataApiAddress = '/workflowTagRelation/add';

export async function addData(parameters) {
  return request({
    api: addDataApiAddress,
    params: parameters,
  });
}

export const addBatchDataApiAddress = '/workflowTagRelation/addBatch';

export async function addBatchData(parameters) {
  return request({
    api: addBatchDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/workflowTagRelation/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/workflowTagRelation/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/workflowTagRelation/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
