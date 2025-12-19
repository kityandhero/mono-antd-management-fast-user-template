import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  getValueByKey,
} from 'easy-soft-utility';

import { dropdownExpandItemType } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import { getFlowApproveActionName } from '../../../../customSpecialComponents';
import { WorkflowCase } from '../../../../pageBases';
import { fieldData } from '../../../../pageBases/WorkflowCase/Common/data';

const { PageList: PageListWorkflowCase } = WorkflowCase;

@connect(({ workflowCase, schedulingControl }) => ({
  workflowCase,
  schedulingControl,
}))
class PageList extends PageListWorkflowCase {
  columnDataTargetTime = fieldData.lastSubmitApprovalTime;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      tableScrollX: 1660,
      pageTitle: '我已审批的审批实例列表',
      paramsKey:
        accessWayCollection.workflowCase.pageListLatestApprove.paramsKey,
      loadApiPath: 'workflowCase/pageListLatestApprove',
    };
  }

  showFormDrawer = (item) => {
    const workflowCaseId = getValueByKey({
      data: item,
      key: fieldData.workflowCaseId.name,
    });

    this.goToPath(
      `/flowCase/workflowCaseLatestApprove/edit/load/${workflowCaseId}/key/formInfo`,
    );
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '详情',
      icon: iconBuilder.read(),
      disabled: !checkHasAuthority(
        accessWayCollection.workflowCase.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.showFormDrawer(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'showFormDocumentPreviewDrawer',
          icon: iconBuilder.read(),
          hidden: !checkHasAuthority(
            accessWayCollection.workflowCase.get.permission,
          ),
          text: '查看表单文档',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          withDivider: true,
          uponDivider: true,
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          confirm: true,
          title: '将要刷新缓存，确定吗？',
        },
      ],
    };
  };

  getAdditionalColumnWrapper = () => [
    {
      dataTarget: fieldData.latestApproveWorkflowNodeName,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.approveAction,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: value * 2 + 21,
          }),
        };
      },
      formatValue: (value) => {
        return getFlowApproveActionName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.latestApproveUserRealName,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
  ];
}

export default PageList;
