export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { noticeId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { noticeId } = currentState;

  const { noticeId: noticeIdPre } = preState;

  return noticeIdPre !== noticeId;
}
