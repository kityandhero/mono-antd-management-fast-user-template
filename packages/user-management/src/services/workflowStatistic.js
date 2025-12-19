import { request } from 'easy-soft-utility';

export const statisticCaseSubmitCountDataApiAddress =
  '/workflowStatistic/statisticCaseSubmitCount';

export async function statisticCaseSubmitCountData(parameters) {
  return request({
    api: statisticCaseSubmitCountDataApiAddress,
    params: parameters,
  });
}

export const statisticCaseLatestApproveCountDataApiAddress =
  '/workflowStatistic/statisticCaseLatestApproveCount';

export async function statisticCaseLatestApproveCountData(parameters) {
  return request({
    api: statisticCaseLatestApproveCountDataApiAddress,
    params: parameters,
  });
}

export const statisticCaseWaitApproveCountDataApiAddress =
  '/workflowStatistic/statisticCaseWaitApproveCount';

export async function statisticCaseWaitApproveCountData(parameters) {
  return request({
    api: statisticCaseWaitApproveCountDataApiAddress,
    params: parameters,
  });
}

export const statisticCaseNotificationWaitReadCountDataApiAddress =
  '/workflowStatistic/statisticCaseNotificationWaitReadCount';

export async function statisticCaseNotificationWaitReadCountData(parameters) {
  return request({
    api: statisticCaseNotificationWaitReadCountDataApiAddress,
    params: parameters,
  });
}
