import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/tag/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const pageListWithQuestionDataApiAddress = '/tag/pageListWithQuestion';

export async function pageListWithQuestionData(parameters) {
  return request({
    api: pageListWithQuestionDataApiAddress,
    params: parameters,
  });
}

export const pageListWithNoticeDataApiAddress = '/tag/pageListWithNotice';

export async function pageListWithNoticeData(parameters) {
  return request({
    api: pageListWithNoticeDataApiAddress,
    params: parameters,
  });
}

export const pageListWithWorkflowDataApiAddress = '/tag/pageListWithWorkflow';

export async function pageListWithWorkflowData(parameters) {
  return request({
    api: pageListWithWorkflowDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress = '/tag/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const singleListWithQuestionDataApiAddress =
  '/tag/singleListWithQuestion';

export async function singleListWithQuestionData(parameters) {
  return request({
    api: singleListWithQuestionDataApiAddress,
    params: parameters,
  });
}

export const singleListWithNoticeDataApiAddress = '/tag/singleListWithNotice';

export async function singleListWithNoticeData(parameters) {
  return request({
    api: singleListWithNoticeDataApiAddress,
    params: parameters,
  });
}

export const singleListWithWorkflowDataApiAddress =
  '/tag/singleListWithWorkflow';

export async function singleListWithWorkflowData(parameters) {
  return request({
    api: singleListWithWorkflowDataApiAddress,
    params: parameters,
  });
}

export const singleTreeListDataApiAddress = '/tag/singleTreeList';

export async function singleTreeListData(parameters) {
  return request({
    api: singleTreeListDataApiAddress,
    params: parameters,
  });
}

export const singleTreeListWithQuestionDataApiAddress =
  '/tag/singleTreeListWithQuestion';

export async function singleTreeListWithQuestionData(parameters) {
  return request({
    api: singleTreeListWithQuestionDataApiAddress,
    params: parameters,
  });
}

export const singleTreeListWithNoticeDataApiAddress =
  '/tag/singleTreeListWithNotice';

export async function singleTreeListWithNoticeData(parameters) {
  return request({
    api: singleTreeListWithNoticeDataApiAddress,
    params: parameters,
  });
}

export const singleTreeListWithWorkflowDataApiAddress =
  '/tag/singleTreeListWithWorkflow';

export async function singleTreeListWithWorkflowData(parameters) {
  return request({
    api: singleTreeListWithWorkflowDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/tag/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/tag/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}
