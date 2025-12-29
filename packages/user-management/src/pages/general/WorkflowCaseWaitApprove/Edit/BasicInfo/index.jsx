import { connect } from 'easy-soft-dva';

import { WorkflowCase } from '../../../../../pageBases/general';

const { BasicInfo: BasicInfoWorkflowCase } = WorkflowCase;

@connect(({ workflowCase, schedulingControl }) => ({
  workflowCase,
  schedulingControl,
}))
class BasicInfo extends BasicInfoWorkflowCase {}

export default BasicInfo;
