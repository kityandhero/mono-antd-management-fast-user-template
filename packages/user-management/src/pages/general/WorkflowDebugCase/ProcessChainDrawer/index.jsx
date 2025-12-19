import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseFlowCaseProcessChainDrawer } from '../../../pageBases';

const visibleFlag = 'd3ed843693fe45f0bf547ae0e04614a7';

@connect(({ workflowDebugCase, schedulingControl }) => ({
  workflowDebugCase,
  schedulingControl,
}))
class ProcessChainDrawer extends BaseFlowCaseProcessChainDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'workflowDebugCase/getChainByWorkflow',
    };
  }
}

export { ProcessChainDrawer };
