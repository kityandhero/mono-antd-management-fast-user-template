import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { BaseFlowCaseFormDocumentDisplayDrawer } from '../../../../pageBases';
import { getChainByWorkflowAction } from '../../WorkflowDebugCase/Assist/action';
import { fieldData as fieldDataWorkflowDebugCase } from '../../WorkflowDebugCase/Common/data';

const visibleFlag = '64d7f22032f54376a6af4777d475b680';

@connect(({ workflowDebugCase, schedulingControl }) => ({
  workflowDebugCase,
  schedulingControl,
}))
class FlowDebugCaseFormDocumentDisplayDrawer extends BaseFlowCaseFormDocumentDisplayDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  static close() {
    switchControlAssist.close(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.workflowDebugCaseTypeCollection.getByWorkflow,
    };
  }

  getFlowCaseId = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldDataWorkflowDebugCase.workflowDebugCaseId.name,
    });
  };

  supplementLoadRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.props;

    d[fieldDataWorkflowDebugCase.workflowId.name] = getValueByKey({
      data: externalData,
      key: fieldDataWorkflowDebugCase.workflowId.name,
    });

    return d;
  };

  loadChainApprove = () => {
    const { externalData } = this.props;

    getChainByWorkflowAction({
      target: this,
      handleData: {
        workflowId: getValueByKey({
          data: externalData,
          key: fieldDataWorkflowDebugCase.workflowId.name,
        }),
      },
      successCallback: ({ target, remoteData }) => {
        const listChainApprove = getValueByKey({
          data: remoteData,
          key: fieldDataWorkflowDebugCase.listChainApprove.name,
          convert: convertCollection.array,
        });

        target.setState({
          listChainApprove: listChainApprove,
        });
      },
    });
  };
}

export { FlowDebugCaseFormDocumentDisplayDrawer };
