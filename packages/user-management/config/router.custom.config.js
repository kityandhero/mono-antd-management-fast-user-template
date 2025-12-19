// 此文件若不存在，将在从项目模板升级时候创建，若已存在，则不进行改动。
// 此文件用于存放扩展业务类路由配置.

import { accessWayCollection } from '../src/customConfig/accessWayCollection';

export const root = {
  path: '/',
  redirect: '/dashboard',
  routes: [],
};

export const dashboard = {
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.workflowCase.pageListWaitApprove.permission,
  ],
  hideChildrenInMenu: true,
  icon: 'team',
  name: 'dashboard',
  path: '/dashboard',
  routes: [
    {
      path: '/dashboard',
      redirect: '/dashboard/workbench',
    },
    {
      component: './custom/Workbench',
      icon: 'bars',
      name: 'workbench',
      path: '/dashboard/workbench',
    },
  ],
};
