import { Watermark } from 'antd';

import {
  convertCollection,
  getValueByKey,
  isArray,
  whetherNumber,
} from 'easy-soft-utility';

import { emptyImage } from 'antd-management-fast-common';
import { DocumentPrintDesigner } from 'antd-management-fast-design-playground';
import { DataDrawer } from 'antd-management-fast-framework';

import {
  fieldDataFlowCase,
  flowCaseStatusCollection,
  signetStyle,
} from '../../../../customConfig';
import {
  analysisFlowCaseAfterLoad,
  getDocumentPrintDesignerConfig,
  SealImage,
} from '../../../../flowAssist';

const { BaseVerticalFlexDrawer } = DataDrawer;

const defaultProperties = {};

class BaseFlowCaseFormDocumentPreviewDrawer extends BaseVerticalFlexDrawer {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '流程表单文档预览',
      loadApiPath: '',
      width: 1024,
      workflow: null,
      workflowFormDesign: null,
      listChainApprove: [],
      listAttachment: [],
      listFormStorage: [],
      listProcessHistory: [],
      listApprove: [],
    };
  }

  getFlowCaseId = () => {
    throw new Error('getFlowCaseId need overrode to implement');
  };

  getFlowCaseIdName = () => {
    throw new Error('getFlowCaseIdName need overrode to implement');
  };

  supplementLoadRequestParams = () => {
    throw new Error('supplementLoadRequestParams need overrode to implement');
  };

  loadChainApprove = () => {
    throw new Error('loadChainApprove need overrode to implement');
  };

  getProperties = () => {
    return {
      ...defaultProperties,
      ...this.props,
    };
  };

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const {
      workflow,
      workflowFormDesign,
      listFormStorage,
      listProcessHistory,
      listApprove,
    } = analysisFlowCaseAfterLoad({
      flowCase: metaData,
    });

    const listAttachment = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.listAttachment.name,
      convert: convertCollection.array,
    });

    this.setState({
      workflow,
      workflowFormDesign,
      listFormStorage: [...listFormStorage],
      listProcessHistory: [...listProcessHistory],
      listApprove: [...listApprove],
      listAttachment: [...listAttachment],
    });
  };

  reloadChainApprove = () => {
    this.loadChainApprove();
  };

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.loadChainApprove();
  };

  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.setState({
      workflow: null,
      workflowFormDesign: null,
      listChainApprove: [],
      listFormStorage: [],
      listProcessHistory: [],
      listApprove: [],
    });
  };

  establishHelpConfig = () => {
    const list = [
      {
        text: '此图例显示的流程表单打印概览, 仅可查看。',
      },
    ];

    return {
      title: '操作提示',
      list: [...list],
    };
  };

  establishPresetContentContainorInnerTopStyle = () => {
    return {
      backgroundColor: '#fff',
    };
  };

  renderAttachmentArea = () => {
    return null;
  };

  renderPresetContentContainorInnerTop = () => {
    const {
      metaData,
      workflowFormDesign,
      listChainApprove,
      listFormStorage,
      listApprove,
    } = this.state;

    const {
      watermarkText,
      sealRefuseVisibility,
      sealRefuseImage,
      sealDisuseVisibility,
      sealDisuseImage,
      workflowTitle,
      general,
      title,
      items,
      formItems,
      allApproveProcessList,
      remarkSchemaList,
      showRemark,
      values,
      approveList,
      showApply,
      listApply,
      showAttention,
      listAttention,
      serialNumberTitle,
      serialNumberContent,
      qRCodeImage,
    } = getDocumentPrintDesignerConfig({
      flowCaseId: this.getFlowCaseId(),
      flowCase: metaData,
      workflowFormDesign,
      listChainApprove,
      listFormStorage,
      listApprove,
    });

    const status = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.status.name,
      convert: convertCollection.number,
    });

    return (
      <Watermark content={watermarkText} inherit={false}>
        {status === flowCaseStatusCollection.refuse ? (
          <SealImage
            hidden={sealRefuseVisibility !== whetherNumber.yes}
            image={sealRefuseImage ?? emptyImage}
          />
        ) : null}

        {status === flowCaseStatusCollection.disuse ? (
          <SealImage
            hidden={sealDisuseVisibility !== whetherNumber.yes}
            image={sealDisuseImage}
          />
        ) : null}

        <DocumentPrintDesigner
          canDesign={false}
          showToolbar={false}
          showIndependentPrint
          title={workflowTitle}
          values={isArray(values) ? values : []}
          schema={{
            general: general || {},
            title: title || {},
            items,
          }}
          formItems={formItems}
          approveList={approveList}
          allApproveProcessList={allApproveProcessList}
          signetStyle={signetStyle}
          showApply={showApply || false}
          applyList={listApply}
          showAttention={showAttention || false}
          attentionList={listAttention}
          showRemark={showRemark}
          remarkList={remarkSchemaList}
          serialNumberTitle={serialNumberTitle}
          serialNumberContent={serialNumberContent}
          qRCodeImage={qRCodeImage}
        />

        {this.renderAttachmentArea()}
      </Watermark>
    );
  };
}

export { BaseFlowCaseFormDocumentPreviewDrawer };
