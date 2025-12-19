/* eslint-disable no-unused-vars */
import { Divider, Empty, Space } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  formatCollection,
  getValueByKey,
  isArray,
  isEmptyArray,
  isEmptyObject,
  logException,
  whetherNumber,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import {
  buildButton,
  CenterBox,
  ColorText,
  HelpBox,
  iconBuilder,
  ScrollFacadeBox,
} from 'antd-management-fast-component';
import {
  DocumentPrintDesigner,
  FileViewer,
  SchemaDisplayer,
} from 'antd-management-fast-design-playground';
import { FlowProcessHistory } from 'antd-management-fast-flow';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import {
  accessWayCollection,
  emptySignet,
  fieldDataFlowCase,
  fieldDataFlowCaseFormAttachment,
  fieldDataFlowCaseProcessHistory,
  fieldDataFlowFormDesign,
  fieldDataFlowNode,
  flowApproveActionModeCollection,
  flowCaseStatusCollection,
  flowNodeTypeCollection,
  signetStyle,
} from '../../../customConfig';
import { FlowDisplayDrawer } from '../../../pages/general/Workflow/FlowDisplayDrawer';
import { AddAttachmentModal } from '../../../pages/general/WorkflowCaseFormAttachment/AddAttachmentModal';
import { removeAction } from '../../../pages/general/WorkflowCaseFormAttachment/Assist/action';
import { PreviewDrawer as WorkflowCaseFormAttachmentPreviewDrawer } from '../../../pages/general/WorkflowCaseFormAttachment/PreviewDrawer';
import { cancelApproveAction } from '../../../pages/general/WorkflowCaseProcessHistory/Assist/action';
import { PassModal } from '../../../pages/general/WorkflowCaseProcessHistory/PassModal';
import { RefuseModal } from '../../../pages/general/WorkflowCaseProcessHistory/RefuseModal';
import { FlowCaseFormDocumentDisplayDrawer } from '../../../pages/general/WorkflowFormDesign/FlowCaseFormDocumentDisplayDrawer';
import { buildFlowCaseFormInitialValues } from '../../../utils';
import { BaseFlowCaseApprovalDrawer } from '../../FlowCase';
import { getChainAction, submitApprovalAction } from '../Assist/action';
import { fieldData } from '../Common/data';

let temporaryFormValues = {};

const visibleFlag = '2cc086ca95564d68a06f930917ba25de';

@connect(({ workflowCase, schedulingControl }) => ({
  workflowCase,
  schedulingControl,
}))
class ApprovalDrawer extends BaseFlowCaseApprovalDrawer {
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
      loadApiPath: 'workflowCase/get',
      submitApiPath: 'workflowCase/submitForm',
    };
  }

  closeSelf = () => {
    ApprovalDrawer.close();
  };

  loadChainApprove = () => {
    const { externalData } = this.state;

    getChainAction({
      target: this,
      handleData: {
        workflowCaseId: this.getFlowCaseId(externalData),
      },
      successCallback: ({ target, remoteData }) => {
        const listChainApprove = getValueByKey({
          data: remoteData,
          key: fieldData.listChainApprove.name,
          convert: convertCollection.array,
        });

        target.setState({
          listChainApprove: isArray(listChainApprove)
            ? listChainApprove.map((o) => {
                const { name } = { name: '', ...o };

                return {
                  title: name,
                  ...o,
                };
              })
            : [],
        });
      },
    });
  };

  checkHasSubmitFormAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowCase.submitForm.permission,
    );
  };

  checkHasSubmitApprovalAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowCase.submitApproval.permission,
    );
  };

  checkHasRefuseAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowCaseProcessHistory.refuse.permission,
    );
  };

  checkHasPassAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowCaseProcessHistory.pass.permission,
    );
  };

  // eslint-disable-next-line no-unused-vars
  getFlowCaseId = (o) => {
    return getValueByKey({
      data: o,
      key: fieldData.workflowCaseId.name,
    });
  };

  getFlowCaseIdName = () => {
    return fieldData.workflowCaseId.name;
  };

  removeAttachment = (o) => {
    removeAction({
      target: this,
      handleData: o,
      successCallback: ({ target }) => {
        target.saveForm(temporaryFormValues);
      },
    });
  };

  // eslint-disable-next-line no-unused-vars
  submitApproval = (o, formValue) => {
    const that = this;

    that.execSubmitApi({
      values: formValue,
      successCallback: () => {
        submitApprovalAction({
          target: that,
          handleData: o,
          successCallback: ({ target }) => {
            target.reloadChainApprove();
            target.reloadData({});
          },
        });
      },
    });
  };

  cancelApprove = (o) => {
    cancelApproveAction({
      target: this,
      handleData: {
        flowCaseId: getValueByKey({
          data: o,
          key: fieldData.workflowCaseId.name,
        }),
      },
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  openFlowCaseFormAttachmentPreviewDrawer = () => {
    WorkflowCaseFormAttachmentPreviewDrawer.open();
  };

  openPassModal = () => {
    PassModal.open();
  };

  openRefuseModal = () => {
    RefuseModal.open();
  };

  openFlowDisplayDrawer = () => {
    FlowDisplayDrawer.open();
  };

  openAddAttachmentModal = () => {
    AddAttachmentModal.open();
  };

  openFlowCaseFormDocumentDisplayDrawer = () => {
    FlowCaseFormDocumentDisplayDrawer.open();
  };

  doOtherAfterPassModalOK = () => {
    ApprovalDrawer.close();
  };

  doOtherAfterRefuseModalOK = () => {
    ApprovalDrawer.close();
  };

  renderPresetOther = () => {
    const {
      metaData,
      currentAttachment,
      listApprove,
      listChainApprove,
      listFormStorage,
    } = this.state;

    const workflowCaseId = getValueByKey({
      data: metaData,
      key: fieldData.workflowCaseId.name,
      convert: convertCollection.string,
    });

    const qRCodeImage = getValueByKey({
      data: metaData,
      key: fieldData.qRCodeImage.name,
      convert: convertCollection.string,
    });

    const watermarkVisibility = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.watermarkVisibility.name,
      convert: convertCollection.number,
      defaultValue: whetherNumber.no,
    });

    const watermarkText =
      watermarkVisibility === whetherNumber.yes
        ? getValueByKey({
            data: metaData,
            key: fieldDataFlowCase.watermarkText.name,
            convert: convertCollection.string,
            defaultValue: '',
          })
        : '';

    const { showApply, listApply } = this.getApplicantConfig();

    const { showAttention, listAttention } = this.getAttentionConfig();

    return (
      <>
        <PassModal
          externalData={metaData}
          afterOK={() => {
            this.afterPassModalOK();
          }}
        />

        <RefuseModal
          externalData={metaData}
          afterOK={() => {
            this.afterRefuseModalOK();
          }}
        />

        <FlowDisplayDrawer
          maskClosable
          externalData={{
            workflowId: getValueByKey({
              data: metaData,
              key: fieldData.workflowId.name,
              defaultValue: '',
            }),
          }}
        />

        <AddAttachmentModal
          externalData={metaData}
          afterClose={this.afterAddAttachmentModalClose}
        />

        <WorkflowCaseFormAttachmentPreviewDrawer
          maskClosable
          externalData={currentAttachment}
        />

        <FlowCaseFormDocumentDisplayDrawer
          maskClosable
          externalData={metaData}
        />
      </>
    );
  };
}

export { ApprovalDrawer };
