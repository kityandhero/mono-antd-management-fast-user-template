import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { BaseFlowCaseFormDocumentDisplayDrawer } from '../../../../pageBases';
import { getChainByWorkflowAction } from '../../WorkflowDebugCase/Assist/action';
import { fieldData as fieldDataWorkflowDebugCase } from '../../WorkflowDebugCase/Common/data';

const visibleFlag = '6579a159f1bb4c79ab3230b7ef9cf9e9';

/**
 * 流程表单打印样例展示
 */
@connect(({ workflowFormDesign, schedulingControl }) => ({
  workflowFormDesign,
  schedulingControl,
}))
class FlowCaseFormExampleDocumentDisplayDrawer extends BaseFlowCaseFormDocumentDisplayDrawer {
  useEmptyMode = true;

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
      pageTitle: '流程表单打印样例展示',
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

  establishHelpConfig = () => {
    const list = [];

    return {
      title: '操作提示',
      list: [
        {
          text: '此图例显示的流程表单打印样例概览, 用于排查打印设计效果，实际效果尚需要使用实际的审批实例进一步确定。',
        },
        ...list,
      ],
    };
  };
}

export { FlowCaseFormExampleDocumentDisplayDrawer };
