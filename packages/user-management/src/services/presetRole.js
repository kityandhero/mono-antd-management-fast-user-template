import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/presetRole/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const listSelectDataApiAddress = '/presetRole/listSelect';

export async function listSelectData(parameters) {
  return request({
    api: listSelectDataApiAddress,
    params: parameters,
  });
}

export const listModuleDataApiAddress = '/presetRole/listModule';

export async function listModuleData(parameters) {
  return request({
    api: listModuleDataApiAddress,
    params: parameters,
  });
}

export const listTreeModuleDataApiAddress = '/presetRole/listTreeModule';

export async function listTreeModuleData(parameters) {
  return request({
    api: listTreeModuleDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/presetRole/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/presetRole/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}
