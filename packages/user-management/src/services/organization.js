import { request } from 'easy-soft-utility';

export const getGraphicalTreeDataApiAddress = '/organization/getGraphicalTree';

export async function getGraphicalTreeData(parameters) {
  return request({
    api: getGraphicalTreeDataApiAddress,
    params: parameters,
  });
}
