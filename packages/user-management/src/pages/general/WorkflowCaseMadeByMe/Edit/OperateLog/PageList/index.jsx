import { connect } from 'easy-soft-dva';

import { WorkflowCase } from '../../../../../../pageBases';

const {
  OperateLog: { PageList: PageListOperateLogWorkflowCase },
} = WorkflowCase;

@connect(({ workflowCase, schedulingControl }) => ({
  workflowCase,
  schedulingControl,
}))
class PageList extends PageListOperateLogWorkflowCase {}

export default PageList;
