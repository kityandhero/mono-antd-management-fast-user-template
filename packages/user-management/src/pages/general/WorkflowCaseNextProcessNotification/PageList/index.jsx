import React from 'react';

import { connect } from 'easy-soft-dva';
import { checkHasAuthority } from 'easy-soft-utility';

import { columnFacadeMode } from 'antd-management-fast-common';

import { accessWayCollection } from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import {
  BaseFlowCaseNextProcessNotificationPageList,
  WorkflowCase,
} from '../../../../pageBases/general';
import { refreshCacheAction } from '../Assist/action';
import { fieldData } from '../Common/data';
import { WorkflowCaseNextProcessNotificationPreviewDrawer } from '../PreviewDrawer';

const { FormDocumentPreviewDrawer } = WorkflowCase;

@connect(({ workflowCaseNextProcessNotification, schedulingControl }) => ({
  workflowCaseNextProcessNotification,
  schedulingControl,
}))
class PageList extends BaseFlowCaseNextProcessNotificationPageList {
  componentAuthority =
    accessWayCollection.workflowCaseNextProcessNotification.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '审批通知列表',
      paramsKey:
        accessWayCollection.workflowCaseNextProcessNotification.pageList
          .paramsKey,
      loadApiPath:
        modelTypeCollection.workflowCaseNextProcessNotificationTypeCollection
          .pageList,
      currentRecord: null,
    };
  }

  getFlowCaseNextProcessNotificationIdDataTarget = () => {
    return fieldData.workflowCaseNextProcessNotificationId;
  };

  checkHasGetFlowCaseAuthority = () => {
    return checkHasAuthority(accessWayCollection.workflowCase.get.permission);
  };

  refreshCache = (item) => {
    refreshCacheAction({
      target: this,
      handleData: item,
    });
  };

  checkGetAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowCaseNextProcessNotification.get.permission,
    );
  };

  checkHasRefreshCacheAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowCaseNextProcessNotification.refreshCache
        .permission,
    );
  };

  preview = (item) => {
    this.setState(
      {
        currentRecord: item,
      },
      () => {
        WorkflowCaseNextProcessNotificationPreviewDrawer.open();
      },
    );
  };

  showFormDocumentPreviewDrawer = (o) => {
    this.setState({ currentRecord: o }, () => {
      FormDocumentPreviewDrawer.open();
    });
  };

  getColumnWrapper = () => [
    {
      dataTarget: { ...fieldData.flowCaseId, label: '项目流水号' },
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.content,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.whetherReadNote,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <WorkflowCaseNextProcessNotificationPreviewDrawer
          maskClosable
          externalData={currentRecord}
        />

        <FormDocumentPreviewDrawer maskClosable externalData={currentRecord} />
      </>
    );
  };
}

export default PageList;
