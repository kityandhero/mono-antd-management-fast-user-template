import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

export function singleTreeListAction({
  target,
  handleData = {},
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.tagTypeCollection.singleTreeList,
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function singleTreeListWithWorkflowAction({
  target,
  handleData = {},
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.tagTypeCollection.singleTreeListWithWorkflow,
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function singleTreeListWithQuestionAction({
  target,
  handleData = {},
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.tagTypeCollection.singleTreeListWithQuestion,
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function singleTreeListWithNoticeAction({
  target,
  handleData = {},
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.tagTypeCollection.singleTreeListWithNotice,
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.tagTypeCollection.refreshCache,
    params: {
      tagId: getValueByKey({
        data: handleData,
        key: fieldData.tagId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
