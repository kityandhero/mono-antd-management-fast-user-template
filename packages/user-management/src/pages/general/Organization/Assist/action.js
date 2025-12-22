import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../modelBuilders';

export async function getGraphicalTreeAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: modelTypeCollection.organizationTypeCollection.getGraphicalTree,
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}
