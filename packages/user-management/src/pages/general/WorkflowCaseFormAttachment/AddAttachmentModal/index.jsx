import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseAddAttachmentModal } from '../../../../pageBases/general';
import { fieldData as fieldDataWorkflowCase } from '../../../../pageBases/general/WorkflowCase/Common/data';
import { addBasicInfoAction } from '../Assist/action';

const visibleFlag = 'a4f35fb66c684e418af5e030ecc29e65';

@connect(({ workflowCaseFormAttachment, schedulingControl }) => ({
  workflowCaseFormAttachment,
  schedulingControl,
}))
class AddAttachmentModal extends BaseAddAttachmentModal {
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

  addBasicInfo = (data) => {
    addBasicInfoAction(data);
  };

  closeAttachmentModal = () => {
    AddAttachmentModal.close();
  };

  getUploadAction = () => `/workflowCaseFormAttachment/uploadFile`;
}

export { AddAttachmentModal };
