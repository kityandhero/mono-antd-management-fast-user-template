import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/applicationUserFeedback/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/applicationUserFeedback/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addDataApiAddress = '/applicationUserFeedback/add';

export async function addData(parameters) {
  return request({
    api: addDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress =
  '/applicationUserFeedback/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/applicationUserFeedback/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}

export const uploadImageDataApiAddress = '/applicationUserFeedback/uploadImage';

export async function uploadImageData(parameters) {
  return request({
    api: uploadImageDataApiAddress,
    params: parameters,
  });
}
