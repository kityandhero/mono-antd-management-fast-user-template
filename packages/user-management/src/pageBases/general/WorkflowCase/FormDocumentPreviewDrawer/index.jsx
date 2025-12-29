import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkInCollection,
  convertCollection,
  getValueByKey,
} from 'easy-soft-utility';

import { CenterBox, ColorText } from 'antd-management-fast-component';
import { FileViewer } from 'antd-management-fast-design-playground';
import { switchControlAssist } from 'antd-management-fast-framework';

import {
  accessWayCollection,
  fieldDataFlowCaseFormAttachment,
  flowCaseStatusCollection,
} from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { PreviewDrawer as WorkflowCaseFormAttachmentPreviewDrawer } from '../../../../pages/general/WorkflowCaseFormAttachment/PreviewDrawer';
import { BaseFlowCaseFormDocumentPreviewDrawer } from '../..';
import { getChainAction } from '../Assist/action';
import { fieldData as fieldDataWorkflowCase } from '../Common/data';

const visibleFlag = 'c1cbece289ac45759dd187349a7ca912';

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
class FormDocumentPreviewDrawer extends BaseFlowCaseFormDocumentPreviewDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.workflowCaseTypeCollection.get,
      currentAttachment: null,
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

  showWorkflowCaseFormAttachmentPreviewDrawer = (item) => {
    this.setState(
      {
        currentAttachment: item,
      },
      () => {
        WorkflowCaseFormAttachmentPreviewDrawer.open();
      },
    );
  };

  renderAttachmentArea = () => {
    const { listAttachment } = this.state;

    return (
      <CenterBox>
        <div
          style={{
            paddingTop: '10px',
            paddingLeft: '60px',
            paddingRight: '60px',
            width: '920px',
          }}
        >
          <FileViewer
            canUpload={false}
            canSupplement={
              checkHasAuthority(
                accessWayCollection.workflowCaseFormAttachment.supplement
                  .permission,
              ) && checkInCollection([flowCaseStatusCollection.success], status)
            }
            canRemove={false}
            list={listAttachment}
            dataTransfer={(o) => {
              return {
                ...o,
                name: getValueByKey({
                  data: o,
                  key: fieldDataFlowCaseFormAttachment.alias.name,
                }),
                url: getValueByKey({
                  data: o,
                  key: fieldDataFlowCaseFormAttachment.url.name,
                }),
              };
            }}
            nameRender={(v) => {
              return (
                <ColorText
                  textPrefix={v}
                  separator=""
                  text={'【已加密】'}
                  color={'green'}
                />
              );
            }}
            onItemClick={(o) => {
              this.showWorkflowCaseFormAttachmentPreviewDrawer(o);
            }}
          />
        </div>
      </CenterBox>
    );
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

export { FormDocumentPreviewDrawer };
