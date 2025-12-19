import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/notice/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/notice/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress = '/notice/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress = '/notice/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateTitleColorDataApiAddress = '/notice/updateTitleColor';

export async function updateTitleColorData(parameters) {
  return request({
    api: updateTitleColorDataApiAddress,
    params: parameters,
  });
}

export const updateContentInfoDataApiAddress = '/notice/updateContentInfo';

export async function updateContentInfoData(parameters) {
  return request({
    api: updateContentInfoDataApiAddress,
    params: parameters,
  });
}

export const updateSortDataApiAddress = '/notice/updateSort';

export async function updateSortData(parameters) {
  return request({
    api: updateSortDataApiAddress,
    params: parameters,
  });
}

export const setTargetModeDataApiAddress = '/notice/setTargetMode';

export async function setTargetModeData(parameters) {
  return request({
    api: setTargetModeDataApiAddress,
    params: parameters,
  });
}

export const setOnlineDataApiAddress = '/notice/setOnline';

export async function setOnlineData(parameters) {
  return request({
    api: setOnlineDataApiAddress,
    params: parameters,
  });
}

export const setOfflineDataApiAddress = '/notice/setOffline';

export async function setOfflineData(parameters) {
  return request({
    api: setOfflineDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/notice/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress = '/notice/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
