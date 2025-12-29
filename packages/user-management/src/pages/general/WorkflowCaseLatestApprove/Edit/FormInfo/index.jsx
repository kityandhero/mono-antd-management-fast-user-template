import { connect } from 'easy-soft-dva';

import { WorkflowCase } from '../../../../../pageBases/general';

const { FormInfo: FormInfoWorkflowCase } = WorkflowCase;

@connect(({ workflowCase, schedulingControl }) => ({
  workflowCase,
  schedulingControl,
}))
class BasicInfo extends FormInfoWorkflowCase {}

export default BasicInfo;
