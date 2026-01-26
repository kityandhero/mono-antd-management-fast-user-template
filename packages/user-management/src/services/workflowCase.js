import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/workflowCase/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const pageListUnderwayDataApiAddress = '/workflowCase/pageListUnderway';

export async function pageListUnderwayData(parameters) {
  return request({
    api: pageListUnderwayDataApiAddress,
    params: parameters,
  });
}

export const pageListLatestApproveDataApiAddress =
  '/workflowCase/pageListLatestApprove';

export async function pageListLatestApproveData(parameters) {
  return request({
    api: pageListLatestApproveDataApiAddress,
    params: parameters,
  });
}

export const pageListWaitApproveDataApiAddress =
  '/workflowCase/pageListWaitApprove';

export async function pageListWaitApproveData(parameters) {
  return request({
    api: pageListWaitApproveDataApiAddress,
    params: parameters,
  });
}

export const pageListUserMonitorDataApiAddress =
  '/workflowCase/pageListUserMonitor';

export async function pageListUserMonitorData(parameters) {
  return request({
    api: pageListUserMonitorDataApiAddress,
    params: parameters,
  });
}

export const singleListNextNodeApproverDataApiAddress =
  '/workflowCase/singleListNextNodeApprover';

export async function singleListNextNodeApproverData(parameters) {
  return request({
    api: singleListNextNodeApproverDataApiAddress,
    params: parameters,
  });
}

export const getNextNextNodeApproverAndWorkflowNodeDataApiAddress =
  '/workflowCase/getNextNextNodeApproverAndWorkflowNode';

export async function getNextNextNodeApproverAndWorkflowNodeData(parameters) {
  return request({
    api: getNextNextNodeApproverAndWorkflowNodeDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/workflowCase/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const verifyCodeDataApiAddress = '/workflowCase/verifyCode';

export async function verifyCodeData(parameters) {
  return request({
    api: verifyCodeDataApiAddress,
    params: parameters,
  });
}

export const getChainDataApiAddress = '/workflowCase/getChain';

export async function getChainData(parameters) {
  return request({
    api: getChainDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress = '/workflowCase/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress = '/workflowCase/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const toggleEmergencyDataApiAddress = '/workflowCase/toggleEmergency';

export async function toggleEmergencyData(parameters) {
  return request({
    api: toggleEmergencyDataApiAddress,
    params: parameters,
  });
}

export const submitFormDataApiAddress = '/workflowCase/submitForm';

export async function submitFormData(parameters) {
  return request({
    api: submitFormDataApiAddress,
    params: parameters,
  });
}

export const submitApprovalDataApiAddress = '/workflowCase/submitApproval';

export async function submitApprovalData(parameters) {
  return request({
    api: submitApprovalDataApiAddress,
    params: parameters,
  });
}

export const forceEndDataApiAddress = '/workflowCase/forceEnd';

export async function forceEndData(parameters) {
  return request({
    api: forceEndDataApiAddress,
    params: parameters,
  });
}

export const disuseDataApiAddress = '/workflowCase/disuse';

export async function disuseData(parameters) {
  return request({
    api: disuseDataApiAddress,
    params: parameters,
  });
}

export const hideDataApiAddress = '/workflowCase/hide';

export async function hideData(parameters) {
  return request({
    api: hideDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/workflowCase/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/workflowCase/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
