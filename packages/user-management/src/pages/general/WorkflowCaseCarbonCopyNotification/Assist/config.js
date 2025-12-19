export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowCaseId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowCaseCarbonCopyNotificationId } = currentState;

  const { workflowCaseId: workflowCaseCarbonCopyNotificationIdPre } = preState;

  return (
    workflowCaseCarbonCopyNotificationIdPre !==
    workflowCaseCarbonCopyNotificationId
  );
}
