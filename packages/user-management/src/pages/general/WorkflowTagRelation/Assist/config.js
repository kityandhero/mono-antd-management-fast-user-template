export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowTagRelationId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowTagRelationId } = currentState;

  const { workflowTagRelationId: workflowTagRelationIdPre } = preState;

  return workflowTagRelationIdPre !== workflowTagRelationId;
}
