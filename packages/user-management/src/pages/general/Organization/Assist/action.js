import { actionCore } from 'antd-management-fast-common';

export async function getGraphicalTreeAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: 'organization/getGraphicalTree',
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}
