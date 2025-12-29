import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey, isArray } from 'easy-soft-utility';

import { extraBuildType } from 'antd-management-fast-common';
import { iconBuilder, SyntaxHighlighter } from 'antd-management-fast-component';
import {
  DocumentPrintDesigner,
  filterDocumentPrintDesignerItemConfig,
} from 'antd-management-fast-design-playground';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import {
  fieldDataFlow,
  fieldDataFlowFormDesign,
  signetStyle,
  simpleQRCode,
} from '../../../../customConfig';
import {
  analysisFlowCaseAfterLoad,
  getDocumentPrintDesignerConfig,
  getSimpleApplicantConfig,
  getSimpleAttentionConfig,
} from '../../../../flowAssist';
import { modelTypeCollection } from '../../../../modelBuilders';
import { getChainByWorkflowAction } from '../../../../pages/general/WorkflowDebugCase/Assist/action';
import { fieldData as fieldDataWorkflowDebugCase } from '../../../../pages/general/WorkflowDebugCase/Common/data';
import { updateDocumentSchemaAction } from '../Assist/action';

const { BaseVerticalFlexDrawer } = DataDrawer;

const dataModeCollection = {
  staticSampleData: 'staticSampleData',
  dynamicData: 'dynamicData',
};

const visibleFlag = 'fb97326493c249eebea99f19b937c05f';

const defaultProperties = {};

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
class FlowCaseFormDocumentDesignDrawer extends BaseVerticalFlexDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '流程表单',
      loadApiPath:
        modelTypeCollection.workflowDebugCaseTypeCollection.getByWorkflow,
      width: 1024,
      overlayButtonOpenText: '查看数据',
      overlayButtonCloseText: '关闭数据',
      dataMode: dataModeCollection.staticSampleData,
      workflow: null,
      workflowFormDesign: null,
      listChainApprove: [],
      listFormStorage: [],
      listProcessHistory: [],
      listApprove: [],
    };
  }

  getProperties = () => {
    return {
      ...defaultProperties,
      ...this.props,
    };
  };

  supplementLoadRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.props;

    d[fieldDataFlow.workflowId.name] = getValueByKey({
      data: externalData,
      key: fieldDataFlow.workflowId.name,
    });

    return d;
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

  getFlowCaseId = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldDataWorkflowDebugCase.workflowDebugCaseId.name,
      defaultValue: '0',
    });
  };

  setStaticSampleData = () => {
    this.setState({
      dataMode: dataModeCollection.staticSampleData,
    });
  };

  setDynamicData = () => {
    this.setState({
      dataMode: dataModeCollection.dynamicData,
    });
  };

  getStaticSampleDataApplicantConfig = () => {
    const { workflow } = this.state;

    return getSimpleApplicantConfig(workflow);
  };

  getStaticSampleDataAttentionConfig = () => {
    const { workflow } = this.state;

    return getSimpleAttentionConfig(workflow);
  };

  saveDataSchema = (data) => {
    const { workflowFormDesign } = this.state;

    const workflowFormDesignId = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.workflowFormDesignId.name,
    });

    const { general, title, items } = {
      general: {},
      title: {},
      items: [],
      ...data,
    };

    delete general['general'];
    delete general['title'];
    delete general['items'];

    const o = {};

    o[fieldDataFlowFormDesign.workflowFormDesignId.name] =
      workflowFormDesignId || '';

    o[fieldDataFlowFormDesign.documentGeneralSchema.name] =
      JSON.stringify(general);

    o[fieldDataFlowFormDesign.documentTitleSchema.name] = JSON.stringify(title);

    o[fieldDataFlowFormDesign.documentItemSchema.name] = JSON.stringify(items);

    updateDocumentSchemaAction({
      target: this,
      handleData: o,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  establishExtraActionConfig = () => {
    const { dataMode } = this.state;

    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.eye(),
          text: '静态示例数据',
          disabled:
            this.checkInProgress() ||
            dataMode === dataModeCollection.staticSampleData,
          handleClick: this.setStaticSampleData,
        },
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.eye(),
          text: '动态测试数据',
          disabled:
            this.checkInProgress() ||
            dataMode === dataModeCollection.dynamicData,
          handleClick: this.setDynamicData,
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '设置为非独占行的单元, 若前一个单元为独占, 则此单元也将转换为行布局, 宽度设置将无效; 设置为金额显示模式的格子，仅在可以转换的情况下才能用金额显示。',
        },
        {
          text: '打印预览需要关闭设计模式。',
        },
        {
          text: '申请人、经办人以及审批节点样例仅在设计时用于占位进行效果展示, 实际表单将呈现真实审批节点。',
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
      dataMode,
      metaData,
      workflowFormDesign,
      listChainApprove,
      listFormStorage,
      listApprove,
    } = this.state;

    const {
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
    } = {
      ...getDocumentPrintDesignerConfig({
        flowCaseId: this.getFlowCaseId(),
        flowCase: metaData,
        workflowFormDesign,
        listChainApprove,
        listFormStorage,
        listApprove,
      }),
      ...(dataMode === dataModeCollection.staticSampleData
        ? {
            values: [],
            approveList: [],
            ...this.getStaticSampleDataApplicantConfig(),
            ...this.getStaticSampleDataAttentionConfig(),
            serialNumberTitle: '审批流水号: ',
            serialNumberContent: '1836370789809655808',
            qRCodeImage: simpleQRCode,
          }
        : {}),
    };

    return (
      <DocumentPrintDesigner
        canDesign
        showToolbar
        showIndependentPrint={false}
        title={workflowTitle}
        values={values}
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
        showAttention={showAttention}
        attentionList={listAttention}
        showRemark={showRemark}
        remarkList={remarkSchemaList}
        serialNumberTitle={serialNumberTitle}
        serialNumberContent={serialNumberContent}
        qRCodeImage={qRCodeImage}
        onSave={(data) => {
          this.saveDataSchema(data);
        }}
      />
    );
  };

  renderOverlayContent = () => {
    const {
      dataMode,
      metaData,
      workflowFormDesign,
      listChainApprove,
      listFormStorage,
      listApprove,
    } = this.state;

    const { general, title, items, formItems, remarkSchemaList, values } = {
      ...getDocumentPrintDesignerConfig({
        flowCaseId: this.getFlowCaseId(),
        flowCase: metaData,
        workflowFormDesign,
        listChainApprove,
        listFormStorage,
        listApprove,
      }),
      ...(dataMode === dataModeCollection.staticSampleData
        ? {
            values: [],
            approveList: [],
            ...this.getStaticSampleDataApplicantConfig(),
            ...this.getStaticSampleDataAttentionConfig(),
            serialNumberTitle: '审批流水号: ',
            serialNumberContent: '1836370789809655808',
            qRCodeImage: simpleQRCode,
          }
        : {}),
    };

    const data = {
      documentSchema: {
        general,
        title,
        items: isArray(items)
          ? items.map((o) => filterDocumentPrintDesignerItemConfig(o))
          : [],
      },
      formItems,
      values: isArray(values) ? values : [],
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

export { FlowCaseFormDocumentDesignDrawer };
