import { connect } from 'easy-soft-dva';

import { WorkflowCase } from '../../../../pageBases';

const { Edit: EditWorkflowCase } = WorkflowCase;

@connect(({ workflowCase, schedulingControl }) => ({
  workflowCase,
  schedulingControl,
}))
class Edit extends EditWorkflowCase {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      backPath: `/flowCase/workflowCaseWaitApprove/pageList/key`,
    };
  }
}

export default Edit;
