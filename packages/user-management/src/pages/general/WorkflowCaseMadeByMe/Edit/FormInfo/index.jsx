import { connect } from 'easy-soft-dva';

import { WorkflowCase } from '../../../../pageBases';

const { FormInfo: FormInfoWorkflowCase } = WorkflowCase;

@connect(({ workflowCase, schedulingControl }) => ({
  workflowCase,
  schedulingControl,
}))
class FormInfo extends FormInfoWorkflowCase {}

export default FormInfo;
