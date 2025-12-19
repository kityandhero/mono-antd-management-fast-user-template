import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { BaseFlowCaseFormDocumentPreviewDrawer } from '../../../pageBases';
import { getChainByWorkflowAction } from '../Assist/action';
import { fieldData as fieldDataWorkflowDebugCase } from '../Common/data';

const visibleFlag = '2840c06bb3f84d3488274d33bbee57bc';

@connect(
  ({
    workflowFormDesign,
    workflowDebugCase,
    workflowDebugCaseFormStorage,
    schedulingControl,
  }) => ({
    workflowFormDesign,
    workflowDebugCase,
    workflowDebugCaseFormStorage,
    schedulingControl,
  }),
)
class FormDocumentPreviewDrawer extends BaseFlowCaseFormDocumentPreviewDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
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

export { FormDocumentPreviewDrawer };
