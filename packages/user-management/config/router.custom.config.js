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
      component: './Workbench',
      icon: 'bars',
      name: 'workbench',
      path: '/dashboard/workbench',
    },
  ],
};

export const notice = {
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.notice.pageList.permission,
    accessWayCollection.notice.get.permission,
    accessWayCollection.notice.addBasicInfo.permission,
  ],
  icon: 'bars',
  name: 'notice',
  path: '/notice',
  routes: [
    {
      path: '/notice',
      redirect: '/notice/pageList',
    },
    {
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.notice.pageList.permission,
      ],
      icon: 'bars',
      name: 'pageList',
      path: '/notice/pageList',
      redirect: '/notice/pageList/no',
    },
    {
      component: './Notice/PageList',
      hideInMenu: true,
      path: '/notice/pageList/:pageKey',
    },
    {
      component: './Notice/Edit',
      hideInMenu: true,
      name: 'edit',
      path: '/notice/edit/:op/:id/:pageKey',
      routes: [
        {
          access: 'checkAccess',
          authority: [
            accessWayCollection.super.permission,
            accessWayCollection.notice.updateBasicInfo.permission,
          ],
          component: './Notice/Edit/BasicInfo',
          name: 'basicInfo',
          path: '/notice/edit/:op/:id/:pageKey/basicInfo',
        },
        {
          access: 'checkAccess',
          authority: [
            accessWayCollection.super.permission,
            accessWayCollection.notice.updateContentInfo.permission,
          ],
          component: './Notice/Edit/ContentInfo',
          name: 'contentInfo',
          path: '/notice/edit/:op/:id/:pageKey/contentInfo',
        },
        {
          access: 'checkAccess',
          authority: [
            accessWayCollection.super.permission,
            accessWayCollection.noticeTagRelation.pageList.permission,
          ],
          name: 'tagInfo',
          path: '/notice/edit/:op/:id/:pageKey/tagInfo',
          routes: [
            {
              path: '/notice/edit/:op/:id/:pageKey/tagInfo',
              redirect: '/notice/edit/:op/:id/:pageKey/tagInfo/pageList',
            },
            {
              component: './Notice/Edit/TagInfo/PageList',
              path: '/notice/edit/:op/:id/:pageKey/tagInfo/pageList',
            },
          ],
        },
        {
          access: 'checkAccess',
          authority: [
            accessWayCollection.super.permission,
            accessWayCollection.noticeAttachment.pageList.permission,
          ],
          name: 'attachmentInfo',
          path: '/notice/edit/:op/:id/:pageKey/attachmentInfo',
          routes: [
            {
              path: '/notice/edit/:op/:id/:pageKey/attachmentInfo',
              redirect: '/notice/edit/:op/:id/:pageKey/attachmentInfo/pageList',
            },
            {
              component: './Notice/Edit/AttachmentInfo/PageList',
              path: '/notice/edit/:op/:id/:pageKey/attachmentInfo/pageList',
            },
          ],
        },
        {
          access: 'checkAccess',
          authority: [
            accessWayCollection.super.permission,
            accessWayCollection.noticeUserRelation.pageList.permission,
          ],
          name: 'surveyInfo',
          path: '/notice/edit/:op/:id/:pageKey/surveyInfo',
          routes: [
            {
              path: '/notice/edit/:op/:id/:pageKey/surveyInfo',
              redirect: '/notice/edit/:op/:id/:pageKey/surveyInfo/pageList',
            },
            {
              component: './Notice/Edit/SurveyInfo/PageList',
              path: '/notice/edit/:op/:id/:pageKey/surveyInfo/pageList',
            },
          ],
        },
        {
          access: 'checkAccess',
          authority: [
            accessWayCollection.super.permission,
            accessWayCollection.notice.pageListOperateLog.permission,
          ],
          name: 'operateLog',
          path: '/notice/edit/:op/:id/:pageKey/operateLog',
          routes: [
            {
              path: '/notice/edit/:op/:id/:pageKey/operateLog',
              redirect: '/notice/edit/:op/:id/:pageKey/operateLog/pageList',
            },
            {
              component: './Notice/Edit/OperateLog/PageList',
              path: '/notice/edit/:op/:id/:pageKey/operateLog/pageList',
            },
          ],
        },
      ],
    },
    {
      component: './Notice/Detail',
      hideInMenu: true,
      name: 'detail',
      path: '/notice/detail/:id',
    },
  ],
};

export const flow = {
  access: 'checkAccess',
  authority: [accessWayCollection.super.permission],
  icon: 'reconciliation',
  name: 'flow',
  path: '/flow',
  routes: [
    {
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.workflow.pageListSelfBuild.permission,
      ],
      hideChildrenInMenu: true,
      icon: 'bars',
      name: 'workflowSelfBuild',
      path: '/flow/workflowSelfBuild',
      routes: [
        {
          path: '/flow/workflowSelfBuild',
          redirect: '/flow/workflowSelfBuild/pageList',
        },
        {
          icon: 'bars',
          name: 'pageList',
          path: '/flow/workflowSelfBuild/pageList',
          redirect: '/flow/workflowSelfBuild/pageList/no',
        },
        {
          component: './WorkflowSelfBuild/PageList',
          hideInMenu: true,
          path: '/flow/workflowSelfBuild/pageList/:pageKey',
        },
        {
          component: './WorkflowSelfBuild/Edit',
          hideInMenu: true,
          name: 'edit',
          path: '/flow/workflowSelfBuild/edit/:op/:id/:pageKey',
          routes: [
            {
              component: './WorkflowSelfBuild/Edit/BasicInfo',
              name: 'basicInfo',
              path: '/flow/workflowSelfBuild/edit/:op/:id/:pageKey/basicInfo',
            },
            {
              component: './WorkflowSelfBuild/Edit/FromInfo',
              name: 'fromInfo',
              path: '/flow/workflowSelfBuild/edit/:op/:id/:pageKey/fromInfo',
            },
            {
              component: './WorkflowSelfBuild/Edit/DesignInfo',
              name: 'designInfo',
              path: '/flow/workflowSelfBuild/edit/:op/:id/:pageKey/designInfo',
            },
            {
              component: './WorkflowSelfBuild/Edit/DebugCaseInfo',
              name: 'debugCaseInfo',
              path: '/flow/workflowSelfBuild/edit/:op/:id/:pageKey/debugCaseInfo',
            },
            {
              name: 'operateLog',
              path: '/flow/workflowSelfBuild/edit/:op/:id/:pageKey/operateLog',
              routes: [
                {
                  path: '/flow/workflowSelfBuild/edit/:op/:id/:pageKey/operateLog',
                  redirect:
                    '/flow/workflowSelfBuild/edit/:op/:id/:pageKey/operateLog/pageList',
                },
                {
                  component: './WorkflowSelfBuild/Edit/OperateLog/PageList',
                  path: '/flow/workflowSelfBuild/edit/:op/:id/:pageKey/operateLog/pageList',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.workflow.pageListSystem.permission,
      ],
      hideChildrenInMenu: true,
      icon: 'bars',
      name: 'workflowSystem',
      path: '/flow/workflowSystem',
      routes: [
        {
          path: '/flow/workflowSystem',
          redirect: '/flow/workflowSystem/pageList',
        },
        {
          icon: 'bars',
          name: 'pageList',
          path: '/flow/workflowSystem/pageList',
          redirect: '/flow/workflowSystem/pageList/no',
        },
        {
          component: './WorkflowSystem/PageList',
          hideInMenu: true,
          path: '/flow/workflowSystem/pageList/:pageKey',
        },
        {
          component: './WorkflowSystem/Edit',
          hideInMenu: true,
          name: 'edit',
          path: '/flow/workflowSystem/edit/:op/:id/:pageKey',
          routes: [
            {
              component: './WorkflowSystem/Edit/BasicInfo',
              name: 'basicInfo',
              path: '/flow/workflowSystem/edit/:op/:id/:pageKey/basicInfo',
            },
            {
              component: './WorkflowSystem/Edit/FromInfo',
              name: 'fromInfo',
              path: '/flow/workflowSystem/edit/:op/:id/:pageKey/fromInfo',
            },
            {
              component: './WorkflowSystem/Edit/FlowInfo',
              name: 'flowInfo',
              path: '/flow/workflowSystem/edit/:op/:id/:pageKey/flowInfo',
            },
          ],
        },
      ],
    },
  ],
};

export const flowCase = {
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.workflowCase.pageList.permission,
    accessWayCollection.workflowCase.pageListWaitApprove.permission,
    accessWayCollection.workflowCase.pageListLatestApprove.permission,
  ],
  icon: 'reconciliation',
  name: 'flowCase',
  path: '/flowCase',
  routes: [
    {
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.workflowCase.pageList.permission,
      ],
      hideChildrenInMenu: true,
      icon: 'reconciliation',
      name: 'workflowCaseMadeByMe',
      path: '/flowCase/workflowCaseMadeByMe',
      routes: [
        {
          path: '/flowCase/workflowCaseMadeByMe',
          redirect: '/flowCase/workflowCaseMadeByMe/pageList',
        },
        {
          icon: 'bars',
          name: 'pageList',
          path: '/flowCase/workflowCaseMadeByMe/pageList',
          redirect: '/flowCase/workflowCaseMadeByMe/pageList/no',
        },
        {
          component: './WorkflowCaseMadeByMe/PageList',
          hideInMenu: true,
          path: '/flowCase/workflowCaseMadeByMe/pageList/:pageKey',
        },
        {
          component: './WorkflowCaseMadeByMe/Edit',
          hideInMenu: true,
          name: 'edit',
          path: '/flowCase/workflowCaseMadeByMe/edit/:op/:id/:pageKey',
          routes: [
            {
              component: './WorkflowCaseMadeByMe/Edit/BasicInfo',
              name: 'basicInfo',
              path: '/flowCase/workflowCaseMadeByMe/edit/:op/:id/:pageKey/basicInfo',
            },
            {
              component: './WorkflowCaseMadeByMe/Edit/FormInfo',
              name: 'formInfo',
              path: '/flowCase/workflowCaseMadeByMe/edit/:op/:id/:pageKey/formInfo',
            },
            {
              name: 'operateLog',
              path: '/flowCase/workflowCaseMadeByMe/edit/:op/:id/:pageKey/operateLog',
              routes: [
                {
                  path: '/flowCase/workflowCaseMadeByMe/edit/:op/:id/:pageKey/operateLog',
                  redirect:
                    '/flowCase/workflowCaseMadeByMe/edit/:op/:id/:pageKey/operateLog/pageList',
                },
                {
                  component: './WorkflowCaseMadeByMe/Edit/OperateLog/PageList',
                  path: '/flowCase/workflowCaseMadeByMe/edit/:op/:id/:pageKey/operateLog/pageList',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.workflowCase.pageListWaitApprove.permission,
      ],
      hideChildrenInMenu: true,
      icon: 'reconciliation',
      name: 'workflowCaseWaitApprove',
      path: '/flowCase/workflowCaseWaitApprove',
      routes: [
        {
          path: '/flowCase/workflowCaseWaitApprove',
          redirect: '/flowCase/workflowCaseWaitApprove/pageList',
        },
        {
          icon: 'bars',
          name: 'pageList',
          path: '/flowCase/workflowCaseWaitApprove/pageList',
          redirect: '/flowCase/workflowCaseWaitApprove/pageList/no',
        },
        {
          component: './WorkflowCaseWaitApprove/PageList',
          hideInMenu: true,
          path: '/flowCase/workflowCaseWaitApprove/pageList/:pageKey',
        },
        {
          component: './WorkflowCaseWaitApprove/Edit',
          hideInMenu: true,
          name: 'edit',
          path: '/flowCase/workflowCaseWaitApprove/edit/:op/:id/:pageKey',
          routes: [
            {
              component: './WorkflowCaseWaitApprove/Edit/BasicInfo',
              name: 'basicInfo',
              path: '/flowCase/workflowCaseWaitApprove/edit/:op/:id/:pageKey/basicInfo',
            },
            {
              component: './WorkflowCaseWaitApprove/Edit/FormInfo',
              name: 'formInfo',
              path: '/flowCase/workflowCaseWaitApprove/edit/:op/:id/:pageKey/formInfo',
            },
            {
              name: 'operateLog',
              path: '/flowCase/workflowCaseWaitApprove/edit/:op/:id/:pageKey/operateLog',
              routes: [
                {
                  path: '/flowCase/workflowCaseWaitApprove/edit/:op/:id/:pageKey/operateLog',
                  redirect:
                    '/flowCase/workflowCaseWaitApprove/edit/:op/:id/:pageKey/operateLog/pageList',
                },
                {
                  component:
                    './WorkflowCaseWaitApprove/Edit/OperateLog/PageList',
                  path: '/flowCase/workflowCaseWaitApprove/edit/:op/:id/:pageKey/operateLog/pageList',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.workflowCase.pageListLatestApprove.permission,
      ],
      hideChildrenInMenu: true,
      icon: 'reconciliation',
      name: 'workflowCaseLatestApprove',
      path: '/flowCase/workflowCaseLatestApprove',
      routes: [
        {
          path: '/flowCase/workflowCaseLatestApprove',
          redirect: '/flowCase/workflowCaseLatestApprove/pageList',
        },
        {
          icon: 'bars',
          name: 'pageList',
          path: '/flowCase/workflowCaseLatestApprove/pageList',
          redirect: '/flowCase/workflowCaseLatestApprove/pageList/no',
        },
        {
          component: './WorkflowCaseLatestApprove/PageList',
          hideInMenu: true,
          path: '/flowCase/workflowCaseLatestApprove/pageList/:pageKey',
        },
        {
          component: './WorkflowCaseLatestApprove/Edit',
          hideInMenu: true,
          name: 'edit',
          path: '/flowCase/workflowCaseLatestApprove/edit/:op/:id/:pageKey',
          routes: [
            {
              component: './WorkflowCaseLatestApprove/Edit/BasicInfo',
              name: 'basicInfo',
              path: '/flowCase/workflowCaseLatestApprove/edit/:op/:id/:pageKey/basicInfo',
            },
            {
              component: './WorkflowCaseLatestApprove/Edit/FormInfo',
              name: 'formInfo',
              path: '/flowCase/workflowCaseLatestApprove/edit/:op/:id/:pageKey/formInfo',
            },
            {
              name: 'operateLog',
              path: '/flowCase/workflowCaseLatestApprove/edit/:op/:id/:pageKey/operateLog',
              routes: [
                {
                  path: '/flowCase/workflowCaseLatestApprove/edit/:op/:id/:pageKey/operateLog',
                  redirect:
                    '/flowCase/workflowCaseLatestApprove/edit/:op/:id/:pageKey/operateLog/pageList',
                },
                {
                  component:
                    './WorkflowCaseLatestApprove/Edit/OperateLog/PageList',
                  path: '/flowCase/workflowCaseLatestApprove/edit/:op/:id/:pageKey/operateLog/pageList',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.workflowCaseCarbonCopyNotification.pageList
          .permission,
      ],
      hideChildrenInMenu: true,
      icon: 'bars',
      name: 'carbonCopyNotification',
      path: '/flowCase/carbonCopyNotification',
      routes: [
        {
          path: '/flowCase/carbonCopyNotification',
          redirect: '/flowCase/carbonCopyNotification/pageList',
        },
        {
          access: 'checkAccess',
          authority: [
            accessWayCollection.super.permission,
            accessWayCollection.workflowCaseCarbonCopyNotification.pageList
              .permission,
          ],
          icon: 'bars',
          name: 'pageList',
          path: '/flowCase/carbonCopyNotification/pageList',
          redirect: '/flowCase/carbonCopyNotification/pageList/no',
        },
        {
          component: './WorkflowCaseCarbonCopyNotification/PageList',
          hideInMenu: true,
          path: '/flowCase/carbonCopyNotification/pageList/:pageKey',
        },
      ],
    },
    {
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.workflowCase.pageListUserMonitor.permission,
      ],
      hideChildrenInMenu: true,
      icon: 'reconciliation',
      name: 'workflowCaseUserMonitor',
      path: '/flowCase/workflowCaseUserMonitor',
      routes: [
        {
          path: '/flowCase/workflowCaseUserMonitor',
          redirect: '/flowCase/workflowCaseUserMonitor/pageList',
        },
        {
          icon: 'bars',
          name: 'pageList',
          path: '/flowCase/workflowCaseUserMonitor/pageList',
          redirect: '/flowCase/workflowCaseUserMonitor/pageList/no',
        },
        {
          component: './WorkflowCaseUserMonitor/PageList',
          hideInMenu: true,
          path: '/flowCase/workflowCaseUserMonitor/pageList/:pageKey',
        },
        {
          component: './WorkflowCaseUserMonitor/Edit',
          hideInMenu: true,
          name: 'edit',
          path: '/flowCase/workflowCaseUserMonitor/edit/:op/:id/:pageKey',
          routes: [
            {
              component: './WorkflowCaseUserMonitor/Edit/BasicInfo',
              name: 'basicInfo',
              path: '/flowCase/workflowCaseUserMonitor/edit/:op/:id/:pageKey/basicInfo',
            },
            {
              component: './WorkflowCaseUserMonitor/Edit/FormInfo',
              name: 'formInfo',
              path: '/flowCase/workflowCaseUserMonitor/edit/:op/:id/:pageKey/formInfo',
            },
            {
              name: 'operateLog',
              path: '/flowCase/workflowCaseUserMonitor/edit/:op/:id/:pageKey/operateLog',
              routes: [
                {
                  path: '/flowCase/workflowCaseUserMonitor/edit/:op/:id/:pageKey/operateLog',
                  redirect:
                    '/flowCase/workflowCaseUserMonitor/edit/:op/:id/:pageKey/operateLog/pageList',
                },
                {
                  component:
                    './WorkflowCaseUserMonitor/Edit/OperateLog/PageList',
                  path: '/flowCase/workflowCaseUserMonitor/edit/:op/:id/:pageKey/operateLog/pageList',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.workflowCaseNextProcessNotification.pageList
          .permission,
        accessWayCollection.workflowCaseNextProcessNotification.get.permission,
      ],
      hideChildrenInMenu: true,
      icon: 'bars',
      name: 'nextProcessNotification',
      path: '/flowCase/nextProcessNotification',
      routes: [
        {
          path: '/flowCase/nextProcessNotification',
          redirect: '/flowCase/nextProcessNotification/pageList',
        },
        {
          access: 'checkAccess',
          authority: [
            accessWayCollection.super.permission,
            accessWayCollection.workflowCaseNextProcessNotification.pageList
              .permission,
          ],
          icon: 'bars',
          name: 'pageList',
          path: '/flowCase/nextProcessNotification/pageList',
          redirect: '/flowCase/nextProcessNotification/pageList/no',
        },
        {
          component: './WorkflowCaseNextProcessNotification/PageList',
          hideInMenu: true,
          path: '/flowCase/nextProcessNotification/pageList/:pageKey',
        },
      ],
    },
  ],
};

export const organization = {
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.department.pageList.permission,
    accessWayCollection.organization.getGraphicalTree.permission,
  ],
  icon: 'deploymentUnit',
  name: 'organization',
  path: '/organization',
  routes: [
    {
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.department.pageList.permission,
      ],
      hideChildrenInMenu: true,
      icon: 'department',
      name: 'department',
      path: '/organization/department',
      routes: [
        {
          path: '/organization/department',
          redirect: '/organization/department/pageList',
        },
        {
          icon: 'bars',
          name: 'pageList',
          path: '/organization/department/pageList',
          redirect: '/organization/department/pageList/no',
        },
        {
          component: './Department/PageList',
          hideInMenu: true,
          path: '/organization/department/pageList/:pageKey',
        },
        {
          component: './Department/AddBasicInfo',
          hideInMenu: true,
          name: 'add',
          path: '/organization/department/add',
        },
        {
          component: './Department/Edit',
          hideInMenu: true,
          name: 'edit',
          path: '/organization/department/edit/:op/:id/:pageKey',
          routes: [
            {
              component: './Department/Edit/BasicInfo',
              name: 'basicInfo',
              path: '/organization/department/edit/:op/:id/:pageKey/basicInfo',
            },
            {
              name: 'operateLog',
              path: '/organization/department/edit/:op/:id/:pageKey/operateLog',
              routes: [
                {
                  path: '/organization/department/edit/:op/:id/:pageKey/operateLog',
                  redirect:
                    '/organization/department/edit/:op/:id/:pageKey/operateLog/pageList',
                },
                {
                  component: './Department/Edit/OperateLog/PageList',
                  path: '/organization/department/edit/:op/:id/:pageKey/operateLog/pageList',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.organization.getGraphicalTree.permission,
      ],
      hideChildrenInMenu: true,
      icon: 'graph',
      name: 'graph',
      path: '/organization/graph',
      routes: [
        {
          path: '/organization/graph',
          redirect: '/organization/graph/graphicalTree',
        },
        {
          component: './Organization/GraphicalTree',
          hideInMenu: true,
          name: 'graphicalTree',
          path: '/organization/graph/graphicalTree',
        },
      ],
    },
  ],
};

export const subsidiaryMessages = {
  name: 'subsidiaryMessages',
  icon: 'read',
  path: '/subsidiaryMessages',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.subsidiaryComplaintMessage.pageList.permission,
    accessWayCollection.subsidiaryFeedbackMessage.pageList.permission,
    accessWayCollection.subsidiaryReportMessage.pageList.permission,
  ],
  routes: [
    {
      name: 'subsidiaryComplaintMessage',
      icon: 'bars',
      hideChildrenInMenu: true,
      path: '/subsidiaryMessages/subsidiaryComplaintMessage',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.subsidiaryComplaintMessage.pageList.permission,
      ],
      routes: [
        {
          path: '/subsidiaryMessages/subsidiaryComplaintMessage',
          redirect:
            '/subsidiaryMessages/subsidiaryComplaintMessage/pageList/no',
        },
        {
          path: '/subsidiaryMessages/subsidiaryComplaintMessage/pageList/:pageKey',
          name: 'pageList',
          hideInMenu: true,
          component: './SubsidiaryComplaintMessage/PageList',
        },
        {
          path: '/subsidiaryMessages/subsidiaryComplaintMessage/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './SubsidiaryComplaintMessage/Edit',
          routes: [
            {
              path: '/subsidiaryMessages/subsidiaryComplaintMessage/edit/:op/:id/:pageKey/basicInfo',
              name: 'basicInfo',
              component: './SubsidiaryComplaintMessage/Edit/BasicInfo',
            },
            {
              path: '/subsidiaryMessages/subsidiaryComplaintMessage/edit/:op/:id/:pageKey/operateLog',
              name: 'operateLog',
              routes: [
                {
                  path: '/subsidiaryMessages/subsidiaryComplaintMessage/edit/:op/:id/:pageKey/operateLog',
                  redirect:
                    '/subsidiaryMessages/subsidiaryComplaintMessage/edit/:op/:id/:pageKey/operateLog/pageList',
                },
                {
                  path: '/subsidiaryMessages/subsidiaryComplaintMessage/edit/:op/:id/:pageKey/operateLog/pageList',
                  component:
                    './SubsidiaryComplaintMessage/Edit/OperateLog/PageList',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'subsidiaryFeedbackMessage',
      icon: 'bars',
      path: '/subsidiaryMessages/subsidiaryFeedbackMessage',
      hideChildrenInMenu: true,
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.subsidiaryFeedbackMessage.pageList.permission,
      ],
      routes: [
        {
          path: '/subsidiaryMessages/subsidiaryFeedbackMessage',
          redirect: '/subsidiaryMessages/subsidiaryFeedbackMessage/pageList/no',
        },
        {
          path: '/subsidiaryMessages/subsidiaryFeedbackMessage/pageList/:pageKey',
          name: 'pageList',
          hideInMenu: true,
          component: './SubsidiaryFeedbackMessage/PageList',
        },
        {
          path: '/subsidiaryMessages/subsidiaryFeedbackMessage/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './SubsidiaryFeedbackMessage/Edit',
          routes: [
            {
              path: '/subsidiaryMessages/subsidiaryFeedbackMessage/edit/:op/:id/:pageKey/basicInfo',
              name: 'basicInfo',
              component: './SubsidiaryFeedbackMessage/Edit/BasicInfo',
            },
            {
              path: '/subsidiaryMessages/subsidiaryFeedbackMessage/edit/:op/:id/:pageKey/operateLog',
              name: 'operateLog',
              routes: [
                {
                  path: '/subsidiaryMessages/subsidiaryFeedbackMessage/edit/:op/:id/:pageKey/operateLog',
                  redirect:
                    '/subsidiaryMessages/subsidiaryFeedbackMessage/edit/:op/:id/:pageKey/operateLog/pageList',
                },
                {
                  path: '/subsidiaryMessages/subsidiaryFeedbackMessage/edit/:op/:id/:pageKey/operateLog/pageList',
                  component:
                    './SubsidiaryFeedbackMessage/Edit/OperateLog/PageList',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'subsidiaryReportMessage',
      icon: 'bars',
      hideChildrenInMenu: true,
      path: '/subsidiaryMessages/subsidiaryReportMessage',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.subsidiaryReportMessage.pageList.permission,
      ],
      routes: [
        {
          path: '/subsidiaryMessages/subsidiaryReportMessage',
          redirect: '/subsidiaryMessages/subsidiaryReportMessage/pageList/no',
        },
        {
          path: '/subsidiaryMessages/subsidiaryReportMessage/pageList/:pageKey',
          name: 'pageList',
          hideInMenu: true,
          component: './SubsidiaryReportMessage/PageList',
        },
        {
          path: '/subsidiaryMessages/subsidiaryReportMessage/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './SubsidiaryReportMessage/Edit',
          routes: [
            {
              path: '/subsidiaryMessages/subsidiaryReportMessage/edit/:op/:id/:pageKey/basicInfo',
              name: 'basicInfo',
              component: './SubsidiaryReportMessage/Edit/BasicInfo',
            },
            {
              path: '/subsidiaryMessages/subsidiaryReportMessage/edit/:op/:id/:pageKey/operateLog',
              name: 'operateLog',
              routes: [
                {
                  path: '/subsidiaryMessages/subsidiaryReportMessage/edit/:op/:id/:pageKey/operateLog',
                  redirect:
                    '/subsidiaryMessages/subsidiaryReportMessage/edit/:op/:id/:pageKey/operateLog/pageList',
                },
                {
                  path: '/subsidiaryMessages/subsidiaryReportMessage/edit/:op/:id/:pageKey/operateLog/pageList',
                  component:
                    './SubsidiaryReportMessage/Edit/OperateLog/PageList',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const enterprise = {
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.user.pageList.permission,
    accessWayCollection.cloudStorage.pageList.permission,
  ],
  icon: 'team',
  name: 'enterprise',
  path: '/enterprise',
  routes: [
    {
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.user.pageList.permission,
      ],
      hideChildrenInMenu: true,
      icon: 'addressBook',
      name: 'addressBook',
      path: '/enterprise/addressBook',
      routes: [
        {
          path: '/enterprise/addressBook',
          redirect: '/enterprise/addressBook/pageList',
        },
        {
          icon: 'bars',
          name: 'pageList',
          path: '/enterprise/addressBook/pageList',
          redirect: '/enterprise/addressBook/pageList/no',
        },
        {
          component: './AddressBook/PageList',
          hideInMenu: true,
          path: '/enterprise/addressBook/pageList/:pageKey',
        },
      ],
    },
    {
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.cloudStorage.pageList.permission,
      ],
      hideChildrenInMenu: true,
      icon: 'reconciliation',
      name: 'cloudStorage',
      path: '/enterprise/cloudStorage',
      routes: [
        {
          path: '/enterprise/cloudStorage',
          redirect: '/enterprise/cloudStorage/pageList',
        },
        {
          icon: 'bars',
          name: 'pageList',
          path: '/enterprise/cloudStorage/pageList',
          redirect: '/enterprise/cloudStorage/pageList/no',
        },
        {
          component: './CloudStorage/PageList',
          hideInMenu: true,
          path: '/enterprise/cloudStorage/pageList/:pageKey',
        },
      ],
    },
  ],
};

export const userGeneralDiscourse = {
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.userGeneralDiscourse.pageList.permission,
  ],
  hideChildrenInMenu: true,
  icon: 'bars',
  name: 'userGeneralDiscourse',
  path: '/currentAccount/userGeneralDiscourse',
  routes: [
    {
      path: '/currentAccount/userGeneralDiscourse',
      redirect: '/currentAccount/userGeneralDiscourse/pageList/no',
    },
    {
      component: './UserGeneralDiscourse/PageList',
      hideInMenu: true,
      name: 'pageList',
      path: '/currentAccount/userGeneralDiscourse/pageList/:pageKey',
    },
  ],
};

export const person = {
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.user.pageList.permission,
  ],
  icon: 'team',
  name: 'person',
  path: '/person',
  routes: [
    {
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.user.pageList.permission,
      ],
      hideChildrenInMenu: true,
      icon: 'user',
      name: 'user',
      path: '/person/user',
      routes: [
        {
          path: '/person/user',
          redirect: '/person/user/pageList',
        },
        {
          icon: 'bars',
          name: 'pageList',
          path: '/person/user/pageList',
          redirect: '/person/user/pageList/no',
        },
        {
          component: './User/PageList',
          hideInMenu: true,
          path: '/person/user/pageList/:pageKey',
        },
        {
          component: './User/Edit',
          hideInMenu: true,
          name: 'edit',
          path: '/person/user/edit/:op/:id/:pageKey',
          routes: [
            {
              component: './User/Edit/BasicInfo',
              name: 'basicInfo',
              path: '/person/user/edit/:op/:id/:pageKey/basicInfo',
            },
            {
              name: 'userDepartmentInfo',
              path: '/person/user/edit/:op/:id/:pageKey/userDepartmentInfo',
              routes: [
                {
                  path: '/person/user/edit/:op/:id/:pageKey/userDepartmentInfo',
                  redirect:
                    '/person/user/edit/:op/:id/:pageKey/userDepartmentInfo/pageList',
                },
                {
                  component: './User/Edit/UserDepartmentInfo/PageList',
                  path: '/person/user/edit/:op/:id/:pageKey/userDepartmentInfo/pageList',
                },
              ],
            },
            {
              name: 'operateLog',
              path: '/person/user/edit/:op/:id/:pageKey/operateLog',
              routes: [
                {
                  path: '/person/user/edit/:op/:id/:pageKey/operateLog',
                  redirect:
                    '/person/user/edit/:op/:id/:pageKey/operateLog/pageList',
                },
                {
                  component: './User/Edit/OperateLog/PageList',
                  path: '/person/user/edit/:op/:id/:pageKey/operateLog/pageList',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const permission = {
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.accessWay.pageList.permission,
    accessWayCollection.presetRole.pageList.permission,
  ],
  icon: 'reconciliation',
  name: 'permission',
  path: '/permission',
  routes: [
    {
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.accessWay.pageList.permission,
      ],
      hideChildrenInMenu: true,
      icon: 'bars',
      name: 'accessWay',
      path: '/permission/accessWay',
      routes: [
        {
          path: '/permission/accessWay',
          redirect: '/permission/accessWay/pageList',
        },
        {
          icon: 'bars',
          name: 'pageList',
          path: '/permission/accessWay/pageList',
          redirect: '/permission/accessWay/pageList/no',
        },
        {
          component: './AccessWay/PageList',
          hideInMenu: true,
          path: '/permission/accessWay/pageList/:pageKey',
        },
      ],
    },
    {
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.presetRole.pageList.permission,
      ],
      hideChildrenInMenu: true,
      icon: 'bars',
      name: 'presetRole',
      path: '/permission/presetRole',
      routes: [
        {
          path: '/permission/presetRole',
          redirect: '/permission/presetRole/pageList',
        },
        {
          path: '/permission/presetRole/pageList',
          redirect: '/permission/presetRole/pageList/no',
        },
        {
          component: './PresetRole/PageList',
          hideInMenu: true,
          name: 'pageList',
          path: '/permission/presetRole/pageList/:pageKey',
        },
      ],
    },
  ],
};

const applicationUserFeedback = {
  name: 'applicationUserFeedback',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/currentAccount/applicationUserFeedback',
  routes: [
    {
      path: '/currentAccount/applicationUserFeedback',
      redirect: '/currentAccount/applicationUserFeedback/pageList',
    },
    {
      path: '/currentAccount/applicationUserFeedback/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/currentAccount/applicationUserFeedback/pageList/no',
    },
    {
      path: '/currentAccount/applicationUserFeedback/pageList/:pageKey',
      hideInMenu: true,
      component: './ApplicationUserFeedback/PageList',
    },
    {
      path: '/currentAccount/applicationUserFeedback/edit/:op/:id/:pageKey',
      name: 'edit',
      hideInMenu: true,
      component: './ApplicationUserFeedback/Edit',
      routes: [
        {
          path: '/currentAccount/applicationUserFeedback/edit/:op/:id/:pageKey/basicInfo',
          name: 'basicInfo',
          component: './ApplicationUserFeedback/Edit/BasicInfo',
        },
        {
          path: '/currentAccount/applicationUserFeedback/edit/:op/:id/:pageKey/operateLog',
          name: 'operateLog',
          routes: [
            {
              path: '/currentAccount/applicationUserFeedback/edit/:op/:id/:pageKey/operateLog',
              redirect:
                '/currentAccount/applicationUserFeedback/edit/:op/:id/:pageKey/operateLog/pageList',
            },
            {
              path: '/currentAccount/applicationUserFeedback/edit/:op/:id/:pageKey/operateLog/pageList',
              component: './ApplicationUserFeedback/Edit/OperateLog/PageList',
            },
          ],
        },
      ],
    },
  ],
};

export const currentAccount = {
  icon: 'user',
  name: 'currentAccount',
  path: '/currentAccount',
  routes: [
    {
      path: '/currentAccount',
      redirect: '/currentAccount/setting',
    },
    {
      component: './CurrentAccount/Setting',
      hideChildrenInMenu: true,
      icon: 'bars',
      name: 'setting',
      path: '/currentAccount/setting',
      routes: [
        {
          path: '/currentAccount/setting',
          redirect: '/currentAccount/setting/load/basicInfo',
        },
        {
          component: './CurrentAccount/Setting/BasicInfo',
          path: '/currentAccount/setting/:op/basicInfo',
        },
        {
          component: './CurrentAccount/Setting/Password',
          path: '/currentAccount/setting/:op/password',
        },
      ],
    },
    userGeneralDiscourse,
    applicationUserFeedback,
  ],
};
