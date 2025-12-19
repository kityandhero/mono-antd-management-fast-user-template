import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { BaseFlowCaseFormDocumentDisplayDrawer } from '../../../pageBases';
import { getChainAction } from '../../../pageBases/WorkflowCase/Assist/action';
import { fieldData as fieldDataWorkflowCase } from '../../../pageBases/WorkflowCase/Common/data';

const visibleFlag = '010012cdadee4558bb71f2617793f2ef';

@connect(({ workflowCase, schedulingControl }) => ({
  workflowCase,
  schedulingControl,
}))
class FlowCaseFormDocumentDisplayDrawer extends BaseFlowCaseFormDocumentDisplayDrawer {
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
      loadApiPath: modelTypeCollection.workflowCaseTypeCollection.get,
    };
  }

  getFlowCaseId = () => {
    const { externalData } = this.state;

    return getValueByKey({
      data: externalData,
      key: fieldDataWorkflowCase.workflowCaseId.name,
    });
  };

  supplementLoadRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.props;

    d[fieldDataWorkflowCase.workflowCaseId.name] =
      this.getFlowCaseId(externalData);

    return d;
  };

  loadChainApprove = () => {
    const { externalData } = this.props;

    getChainAction({
      target: this,
      handleData: {
        workflowCaseId: getValueByKey({
          data: externalData,
          key: fieldDataWorkflowCase.workflowCaseId.name,
        }),
      },
      successCallback: ({ target, remoteData }) => {
        const listChainApprove = getValueByKey({
          data: remoteData,
          key: fieldDataWorkflowCase.listChainApprove.name,
          convert: convertCollection.array,
        });

        target.setState({
          listChainApprove: listChainApprove,
        });
      },
    });
  };
}

export { FlowCaseFormDocumentDisplayDrawer };
