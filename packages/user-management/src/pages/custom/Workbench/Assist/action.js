import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../modelBuilders';

export async function statisticCaseSubmitCountAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
  failCallback = null,
}) {
  actionCore({
    api: modelTypeCollection.workflowStatisticTypeCollection
      .statisticCaseSubmitCount,
    params: { ...handleData },
    target,
    handleData,
    showProcessing: false,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function statisticCaseLatestApproveCountAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
  failCallback = null,
}) {
  actionCore({
    api: modelTypeCollection.workflowStatisticTypeCollection
      .statisticCaseLatestApproveCount,
    params: { ...handleData },
    target,
    handleData,
    showProcessing: false,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function statisticCaseWaitApproveCountAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
  failCallback = null,
}) {
  actionCore({
    api: modelTypeCollection.workflowStatisticTypeCollection
      .statisticCaseWaitApproveCount,
    params: { ...handleData },
    target,
    handleData,
    showProcessing: false,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function statisticCaseNotificationWaitReadCountAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
  failCallback = null,
}) {
  actionCore({
    api: modelTypeCollection.workflowStatisticTypeCollection
      .statisticCaseNotificationWaitReadCount,
    params: { ...handleData },
    target,
    handleData,
    showProcessing: false,
    successCallback,
    successMessage,
    failCallback,
  });
}
