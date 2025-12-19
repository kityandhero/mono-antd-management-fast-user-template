import { connect } from 'easy-soft-dva';

import { WorkflowCase } from '../../../../../pageBases';

const { FormInfo: FormInfoWorkflowCase } = WorkflowCase;

@connect(({ workflowCase, schedulingControl }) => ({
  workflowCase,
  schedulingControl,
}))
class BasicInfo extends FormInfoWorkflowCase {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      backPath: `/flowCase/workflowCaseWaitApprove/pageList/key`,
    };
  }
}

export default BasicInfo;
