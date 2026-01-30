import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/workflowBranchCondition/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress = '/workflowBranchCondition/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/workflowBranchCondition/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress =
  '/workflowBranchCondition/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress =
  '/workflowBranchCondition/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateDescriptiveInfoDataApiAddress =
  '/workflowBranchCondition/updateDescriptiveInfo';

export async function updateDescriptiveInfoData(parameters) {
  return request({
    api: updateDescriptiveInfoDataApiAddress,
    params: parameters,
  });
}

export const maintainChannelDataApiAddress =
  '/workflowBranchCondition/maintainChannel';

export async function maintainChannelData(parameters) {
  return request({
    api: maintainChannelDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress =
  '/workflowBranchCondition/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/workflowBranchCondition/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/workflowBranchCondition/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
