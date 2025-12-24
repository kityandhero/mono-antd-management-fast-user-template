import { request } from 'easy-soft-utility';

export const toggleAllowScanCodeVerificationDataApiAddress =
  '/userWorkflowConfigure/toggleAllowScanCodeVerification';

export async function toggleAllowScanCodeVerificationData(parameters) {
  return request({
    api: toggleAllowScanCodeVerificationDataApiAddress,
    params: parameters,
  });
}
