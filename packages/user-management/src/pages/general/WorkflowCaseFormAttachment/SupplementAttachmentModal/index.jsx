import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseSupplementAttachmentModal } from '../../../pageBases';
import { fieldData as fieldDataWorkflowCase } from '../../../pageBases/WorkflowCase/Common/data';
import { supplementAction } from '../Assist/action';

const visibleFlag = '5e21fad4cf554284be72f9f5692c6ca5';

@connect(({ workflowCaseFormAttachment, schedulingControl }) => ({
  workflowCaseFormAttachment,
  schedulingControl,
}))
class SupplementAttachmentModal extends BaseSupplementAttachmentModal {
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

  supplement = (data) => {
    supplementAction(data);
  };

  closeAttachmentModal = () => {
    SupplementAttachmentModal.close();
  };

  getUploadAction = () => `/workflowCaseFormAttachment/uploadFile`;
}

export { SupplementAttachmentModal };
