import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { BaseFlowCaseStorageFormDrawer } from '../../../../pageBases/general/FlowCaseFormStorage/BaseFlowCaseStorageFormDrawer';
import { getChainAction } from '../../../../pageBases/general/WorkflowCase/Assist/action';
import { fieldData as fieldDataWorkflowCase } from '../../../../pageBases/general/WorkflowCase/Common/data';
import { PreviewDrawer as WorkflowCaseFormAttachmentPreviewDrawer } from '../../WorkflowCaseFormAttachment/PreviewDrawer';

const visibleFlag = 'f3cc04cdf88f4097b6536b643c34f806';

@connect(
  ({
    workflowFormDesign,
    workflowCase,
    workflowCaseFormStorage,
    schedulingControl,
  }) => ({
    workflowFormDesign,
    workflowCase,
    workflowCaseFormStorage,
    schedulingControl,
  }),
)
class FormDrawer extends BaseFlowCaseStorageFormDrawer {
  componentAuthority = accessWayCollection.workflowCase.get.permission;

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
      pageTitle: '工作流实例表单',
      loadApiPath: modelTypeCollection.workflowCaseTypeCollection.get,
    };
  }

  getFlowCaseId = () => {
    const { externalData } = this.state;

    return getValueByKey({
      data: externalData,
      key: fieldDataWorkflowCase.workflowCaseId.name,
      defaultValue: '0',
    });
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

  supplementRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.state;

    d[fieldDataWorkflowCase.workflowCaseId.name] = getValueByKey({
      data: externalData,
      key: fieldDataWorkflowCase.workflowCaseId.name,
    });

    return d;
  };

  openFlowCaseFormAttachmentPreviewDrawer = () => {
    WorkflowCaseFormAttachmentPreviewDrawer.open();
  };

  renderPresetOther = () => {
    const { currentAttachment } = this.state;

    return (
      <>
        <WorkflowCaseFormAttachmentPreviewDrawer
          maskClosable
          externalData={currentAttachment}
        />
      </>
    );
  };
}

export { FormDrawer };
