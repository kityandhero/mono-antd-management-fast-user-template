import { Watermark } from 'antd';

import { isArray } from 'easy-soft-utility';

import { SyntaxHighlighter } from 'antd-management-fast-component';
import {
  DocumentPrintDesigner,
  filterDocumentPrintDesignerItemConfig,
} from 'antd-management-fast-design-playground';
import { DataDrawer } from 'antd-management-fast-framework';

import { signetStyle } from '../../../../customConfig';
import {
  analysisFlowCaseAfterLoad,
  getDocumentPrintDesignerConfig,
} from '../../../../flowAssist';

const { BaseVerticalFlexDrawer } = DataDrawer;

const defaultProperties = {};

class BaseFlowCaseFormDocumentDisplayDrawer extends BaseVerticalFlexDrawer {
  useEmptyMode = false;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '流程表单',
      width: 1024,
      overlayButtonOpenText: '查看数据',
      overlayButtonCloseText: '关闭数据',
      loadApiPath: '',
      workflow: null,
      workflowFormDesign: null,
      listChainApprove: [],
      listFormStorage: [],
      listProcessHistory: [],
      listApprove: [],
    };
  }

  getFlowCaseId = () => {
    throw new Error('getFlowCaseId need overrode to implement');
  };

  loadChainApprove = () => {
    throw new Error('loadChainApprove need overrode to implement');
  };

  supplementLoadRequestParams = () => {
    throw new Error('supplementLoadRequestParams need overrode to implement');
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

    this.setState({
      workflow,
      workflowFormDesign,
      listFormStorage: [...listFormStorage],
      listProcessHistory: [...listProcessHistory],
      listApprove: [...listApprove],
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
      listChainApprove: [],
    });
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '此图例显示的流程表单打印概览, 仅可查看。',
        },
      ],
    };
  };

  establishPresetContentContainorInnerTopStyle = () => {
    return {
      backgroundColor: '#ccc',
    };
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

    return (
      <Watermark content={watermarkText ?? ''} inherit={false}>
        <DocumentPrintDesigner
          canDesign={false}
          title={workflowTitle}
          values={this.useEmptyMode ? [] : values}
          schema={{
            general: general || {},
            title: title || {},
            items,
          }}
          formItems={formItems}
          approveList={this.useEmptyMode ? [] : approveList}
          allApproveProcessList={allApproveProcessList}
          signetStyle={signetStyle}
          showApply={showApply || false}
          applyList={this.useEmptyMode ? [] : listApply}
          showAttention={showAttention || false}
          attentionList={this.useEmptyMode ? [] : listAttention}
          showRemark={showRemark}
          remarkTitle="备注"
          remarkName="remark"
          remarkList={remarkSchemaList}
          showQRCode
          showSerialNumber
          serialNumberTitle={serialNumberTitle}
          serialNumberContent={serialNumberContent}
          qRCodeImage={qRCodeImage}
        />
      </Watermark>
    );
  };

  renderOverlayContent = () => {
    const {
      metaData,
      workflowFormDesign,
      listChainApprove,
      listFormStorage,
      listApprove,
    } = this.state;

    const { general, title, items, formItems, remarkSchemaList, values } =
      getDocumentPrintDesignerConfig({
        flowCaseId: this.getFlowCaseId(),
        flowCase: metaData,
        workflowFormDesign,
        listChainApprove,
        listFormStorage,
        listApprove,
      });

    const data = {
      documentSchema: {
        general,
        title,
        items: isArray(items)
          ? items.map((o) => filterDocumentPrintDesignerItemConfig(o))
          : [],
      },
      formItems,
      values: this.useEmptyMode ? [] : values,
      remarkSchemaList,
    };

    return (
      <div
        style={{
          width: '90%',
          height: '90%',
          background: '#fff',
          padding: '16px 16px 26px 16px',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <SyntaxHighlighter
          language="js"
          value={JSON.stringify(data, null, 2)}
          other={{ showLineNumbers: true, wrapLines: true }}
          style={{
            height: '100%',
            marginLeft: '0px',
            marginRight: '0px',
          }}
        />
      </div>
    );
  };
}

export { BaseFlowCaseFormDocumentDisplayDrawer };
