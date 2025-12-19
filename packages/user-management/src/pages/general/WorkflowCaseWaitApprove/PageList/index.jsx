import { connect } from 'easy-soft-dva';
import { checkHasAuthority, getValueByKey } from 'easy-soft-utility';

import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
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
      pageTitle: '待我审批的审批实例列表',
      paramsKey: accessWayCollection.workflowCase.pageListWaitApprove.paramsKey,
      loadApiPath: 'workflowCase/pageListWaitApprove',
      currentRecord: null,
    };
  }

  showFormDrawer = (item) => {
    const workflowCaseId = getValueByKey({
      data: item,
      key: fieldData.workflowCaseId.name,
    });

    this.goToPath(
      `/flowCase/workflowCaseWaitApprove/edit/load/${workflowCaseId}/key/formInfo`,
    );
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '审批',
      icon: iconBuilder.edit(),
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
      dataTarget: fieldData.nextApproveWorkflowNodeName,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
  ];
}

export default PageList;
