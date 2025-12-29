import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { BasePreviewDrawer } from '../../../../pageBases/general';
import { fieldData } from '../Common/data';

const visibleFlag = 'a404781120e544f58faacd6733150e85';

@connect(({ workflowCaseFormAttachment, schedulingControl }) => ({
  workflowCaseFormAttachment,
  schedulingControl,
}))
class PreviewDrawer extends BasePreviewDrawer {
  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.workflowCaseFormAttachmentTypeCollection.get,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.workflowCaseFormAttachmentId.name] =
      this.getFlowCaseFormAttachmentId(externalData);

    return d;
  };

  getFlowCaseFormAttachmentId = (o) => {
    return getValueByKey({
      data: o,
      key: fieldData.workflowCaseFormAttachmentId.name,
      defaultValue: '',
    });
  };

  getFlowCaseFormAttachmentIdLabel = () => {
    return fieldData.workflowCaseFormAttachmentId.label;
  };
}

export { PreviewDrawer };
