import { request } from 'easy-soft-utility';

export const setMobileApproveViewModeDataApiAddress =
  '/userWorkflowConfigure/setMobileApproveViewMode';

export async function setMobileApproveViewModeData(parameters) {
  return request({
    api: setMobileApproveViewModeDataApiAddress,
    params: parameters,
  });
}

export const toggleAllowScanCodeVerificationDataApiAddress =
  '/userWorkflowConfigure/toggleAllowScanCodeVerification';

export async function toggleAllowScanCodeVerificationData(parameters) {
  return request({
    api: toggleAllowScanCodeVerificationDataApiAddress,
    params: parameters,
  });
}

export const toggleAllowAutoReuseProcessHistoryDataApiAddress =
  '/userWorkflowConfigure/toggleAllowAutoReuseProcessHistory';

export async function toggleAllowAutoReuseProcessHistoryData(parameters) {
  return request({
    api: toggleAllowAutoReuseProcessHistoryDataApiAddress,
    params: parameters,
  });
}
