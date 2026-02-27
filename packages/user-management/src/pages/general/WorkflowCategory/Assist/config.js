export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowCategoryId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowCategoryId } = currentState;

  const { workflowCategoryId: workflowCategoryIdPre } = preState;

  return workflowCategoryIdPre !== workflowCategoryId;
}
