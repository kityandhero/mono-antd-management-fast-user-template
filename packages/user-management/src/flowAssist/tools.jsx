import React from 'react';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  datetimeFormat,
  filter,
  formatDatetime,
  getNow,
  getValueByKey,
  hasKey,
  isArray,
  isEmptyArray,
  logException,
  toLower,
  toLowerFirst,
  toString,
  whetherNumber,
} from 'easy-soft-utility';

import { ColorText, ImageBox } from 'antd-management-fast-component';
import {
  nodeApply,
  nodeAttention,
} from 'antd-management-fast-design-playground';
import { adjustEdge, adjustNode } from 'antd-management-fast-flow';

import {
  emptySignet,
  fieldDataFlow,
  fieldDataFlowCase,
  fieldDataFlowFormDesign,
  fieldDataFlowLine,
  fieldDataFlowNode,
  flowApproveActionModeCollection,
  flowLineTypeCollection,
  flowNodeApproveModeCollection,
  flowNodeTypeCollection,
} from '../customConfig';
import { getFlowNodeApproveModeName } from '../customSpecialComponents';

export function getSimpleApplicantConfig(o) {
  const applicantSignSwitch = getValueByKey({
    data: o,
    key: fieldDataFlow.applicantSignSwitch.name,
    convert: convertCollection.number,
  });

  const applicantStatementTitle = getValueByKey({
    data: o,
    key: fieldDataFlow.defaultApplicantStatementTitle.name,
    convert: convertCollection.string,
  });

  const applicantStatementContent = getValueByKey({
    data: o,
    key: fieldDataFlow.defaultApplicantStatementContent.name,
    convert: convertCollection.string,
  });

  const globalDebugUserSignet = getValueByKey({
    data: o,
    key: fieldDataFlow.globalDebugUserSignet.name,
    convert: convertCollection.string,
  });

  const listApply = [
    {
      ...nodeApply,
      title: applicantStatementTitle,
      note: applicantStatementContent,
      ...(checkStringIsNullOrWhiteSpace(globalDebugUserSignet)
        ? {
            signet: emptySignet,
          }
        : {
            signet: globalDebugUserSignet,
          }),
      time: formatDatetime({
        data: getNow(),
        format: datetimeFormat.yearMonthDayHourMinuteSecond,
      }),
    },
  ];

  return {
    showApply: applicantSignSwitch === whetherNumber.yes,
    listApply,
  };
}

export function getSimpleAttentionConfig(o) {
  const attentionSignSwitch = getValueByKey({
    data: o,
    key: fieldDataFlow.attentionSignSwitch.name,
    convert: convertCollection.number,
  });

  const attentionStatementTitle = getValueByKey({
    data: o,
    key: fieldDataFlow.defaultAttentionStatementTitle.name,
    convert: convertCollection.string,
  });

  const attentionStatementContent = getValueByKey({
    data: o,
    key: fieldDataFlow.defaultAttentionStatementContent.name,
    convert: convertCollection.string,
  });

  const attentionUserSignet = getValueByKey({
    data: o,
    key: fieldDataFlow.defaultAttentionUserSignet.name,
    convert: convertCollection.string,
  });

  const listAttention = [
    {
      ...nodeAttention,
      title: attentionStatementTitle,
      note: attentionStatementContent,
      ...(checkStringIsNullOrWhiteSpace(attentionUserSignet)
        ? {
            signet: emptySignet,
          }
        : {
            signet: attentionUserSignet,
          }),
      time: formatDatetime({
        data: getNow(),
        format: datetimeFormat.yearMonthDayHourMinuteSecond,
      }),
    },
  ];

  return {
    showAttention: attentionSignSwitch === whetherNumber.yes,
    listAttention,
  };
}

export function buildFlowCaseFormInitialValues(
  listFormStorage,
  dataSchemaList,
) {
  const data = {};

  let listFormStorageAdjust = listFormStorage.map((o) => {
    const { name } = { name: '', ...o };

    const dataSchemaListFilter = filter(dataSchemaList, (one) => {
      const { name: nameOne } = {
        name: '',
        ...one,
      };

      return name === nameOne;
    });

    let dataSchemaType = '';

    if (dataSchemaListFilter.length > 0) {
      let first = dataSchemaListFilter[0];

      const { type } = {
        type: '',
        ...first,
      };

      dataSchemaType = type ?? '';
    }

    return {
      dataSchemaType,
      ...o,
    };
  });

  if (isArray(listFormStorageAdjust) && !isEmptyArray(listFormStorageAdjust)) {
    for (const o of listFormStorageAdjust) {
      const { dataSchemaType } = {
        dataSchemaType: '',
        ...o,
      };

      try {
        data[o.name] = checkInCollection(
          ['string', 'number'],
          toLower(dataSchemaType),
        )
          ? o.value
          : JSON.parse(o.value);
      } catch {
        data[o.name] = o.value;
      }
    }
  }

  if (!isArray(dataSchemaList) || isEmptyArray(dataSchemaList)) {
    return data;
  }

  for (const item of dataSchemaList) {
    const { name, type } = { name: '', type: '', ...item };

    if (checkStringIsNullOrWhiteSpace(name)) {
      continue;
    }

    if (checkStringIsNullOrWhiteSpace(type)) {
      continue;
    }

    if (hasKey(data, name)) {
      continue;
    }

    if (type === 'string') {
      data[name] = '';
    }

    if (type === 'number') {
      data[name] = '';
    }

    if (type === '[]') {
      data[name] = [];
    }
  }

  return data;
}

export function adjustFlowCaseData(o, options) {
  const { workflow } = {
    workflow: {
      workflowNodeList: [],
      workflowLineList: [],
    },
    ...o,
  };

  const nextApproveWorkflowNodeId = getValueByKey({
    data: o,
    key: fieldDataFlowCase.nextApproveWorkflowNodeId.name,
    convert: convertCollection.string,
    defaultValue: '',
  });

  const listProcessHistory = getValueByKey({
    data: o,
    key: fieldDataFlowCase.listProcessHistory.name,
    convert: convertCollection.array,
    defaultValue: [],
  });

  const { approveBatchNumber, whetherFilterBatchNumber } = {
    approveBatchNumber: 0,
    whetherFilterBatchNumber: false,
    ...options,
  };

  const { nodeList, edgeList, listApprove } = adjustFlowCaseDataItem({
    workflow,
    nextApproveWorkflowNodeId,
    listProcessHistory,
    approveBatchNumber,
    whetherFilterBatchNumber,
  });

  return {
    nodeList,
    edgeList,
    listApprove,
    listProcessHistory,
  };
}

function adjustFlowCaseDataItem({
  workflow,
  nextApproveWorkflowNodeId,
  listProcessHistory,
  approveBatchNumber = 0,
  whetherFilterBatchNumber = false,
}) {
  const listApprove = filter(listProcessHistory, (one) => {
    const {
      approveActionMode,
      approveBatchNumber: processHistoryApproveBatchNumber,
    } = {
      approveActionMode: 0,
      approveBatchNumber: 0,
      ...one,
    };

    if (whetherFilterBatchNumber) {
      return (
        approveActionMode === flowApproveActionModeCollection.manualControl &&
        toString(processHistoryApproveBatchNumber) ===
          toString(approveBatchNumber)
      );
    }

    return approveActionMode === flowApproveActionModeCollection.manualControl;
  }).map((o) => {
    const {
      note,
      approveWorkflowNodeName,
      approveUserName,
      approveUserSignet,
      approveTime,
    } = {
      approveWorkflowNodeName: '',
      note: '',
      approveUserName: '张三',
      approveUserSignet: '',
      approveTime: '',
      ...o,
    };

    return {
      ...o,
      title: approveWorkflowNodeName,
      note: note || '未填写',
      name: approveUserName,
      signet: approveUserSignet || emptySignet,
      time: approveTime,
    };
  });

  const workflowNodeList = getValueByKey({
    data: workflow,
    key: fieldDataFlow.workflowNodeList.name,
    convert: convertCollection.array,
  });

  const workflowLineList = getValueByKey({
    data: workflow,
    key: fieldDataFlow.workflowLineList.name,
    convert: convertCollection.array,
  });

  const nodeList = (isArray(workflowNodeList) ? workflowNodeList : []).map(
    (o) => {
      const workflowNodeId = getValueByKey({
        data: o,
        key: fieldDataFlowNode.workflowNodeId.name,
      });

      const type = getValueByKey({
        data: o,
        key: fieldDataFlowNode.type.name,
        convert: convertCollection.number,
      });

      let nodeType = 'intermediate';

      switch (type) {
        case flowNodeTypeCollection.startNode: {
          nodeType = 'start';
          break;
        }

        case flowNodeTypeCollection.endNode: {
          nodeType = 'end';
          break;
        }

        case flowNodeTypeCollection.intermediateNode: {
          nodeType = 'intermediate';
          break;
        }

        case flowNodeTypeCollection.carbonCopyPoint: {
          nodeType = 'carbonCopy';
          break;
        }

        default: {
          nodeType = 'intermediate';
        }
      }

      const { viewConfig } = {
        viewConfig: {
          position: {
            x: 0,
            y: 0,
          },
        },
        ...o,
      };

      const result = adjustNode({
        id: workflowNodeId,
        type: nodeType,
        ...viewConfig,
        data: {
          data: o,
          isNext: nextApproveWorkflowNodeId === workflowNodeId,
          footerBuilder: (data) => {
            return <NodeFooter data={data} />;
          },
        },
      });

      return result;
    },
  );

  const edgeList = (isArray(workflowLineList) ? workflowLineList : []).map(
    (o, index) => {
      const workflowLineId = getValueByKey({
        data: o,
        key: fieldDataFlowLine.workflowLineId.name,
      });

      const fromId = getValueByKey({
        data: o,
        key: fieldDataFlowLine.fromId.name,
      });

      const fromPositionName = getValueByKey({
        data: o,
        key: fieldDataFlowLine.fromPositionName.name,
        convertBuilder: (v) => {
          return toLowerFirst(v);
        },
      });

      const toId = getValueByKey({
        data: o,
        key: fieldDataFlowLine.toId.name,
      });

      const toPositionName = getValueByKey({
        data: o,
        key: fieldDataFlowLine.toPositionName.name,
        convertBuilder: (v) => {
          return toLowerFirst(v);
        },
      });

      const type = getValueByKey({
        data: o,
        key: fieldDataFlowLine.type.name,
        convert: convertCollection.number,
      });

      const positionList = ['top', 'left', 'bottom', 'right'];

      return adjustEdge({
        index,
        id: workflowLineId,
        forward:
          type === flowLineTypeCollection.forward ||
          type === flowLineTypeCollection.carbonCopy,
        carbonCopy: type === flowLineTypeCollection.carbonCopy,
        source: fromId,
        sourceHandle: checkInCollection(positionList, fromPositionName)
          ? fromPositionName
          : 'bottom',
        target: toId,
        targetHandle: checkInCollection(positionList, toPositionName)
          ? toPositionName
          : 'top',
        data: {
          data: o,
        },
      });
    },
  );

  return {
    nodeList,
    edgeList,
    listApprove,
  };
}

export function analysisFlowCaseAfterLoad({ flowCase }) {
  const approveBatchNumber = getValueByKey({
    data: flowCase,
    key: fieldDataFlowCase.approveBatchNumber.name,
    defaultValue: 0,
    convert: convertCollection.number,
  });

  const listFormStorage = getValueByKey({
    data: flowCase,
    key: fieldDataFlowCase.listFormStorage.name,
    convert: convertCollection.array,
    defaultValue: [],
  });

  const workflow = getValueByKey({
    data: flowCase,
    key: fieldDataFlowCase.workflow.name,
    defaultValue: null,
  });

  const workflowFormDesign = getValueByKey({
    data: flowCase,
    key: fieldDataFlowCase.workflowFormDesign.name,
    defaultValue: null,
  });

  const { listApprove, listProcessHistory } = adjustFlowCaseData(flowCase, {
    approveBatchNumber,
    whetherFilterBatchNumber: true,
  });

  return {
    workflow,
    workflowFormDesign,
    listFormStorage: [...listFormStorage],
    listProcessHistory: [...listProcessHistory],
    listApprove: [...listApprove],
  };
}

export function analysisFlowCase({ flowCase }) {
  const approveBatchNumber = getValueByKey({
    data: flowCase,
    key: fieldDataFlowCase.approveBatchNumber.name,
    defaultValue: 0,
    convert: convertCollection.number,
  });

  const listFormStorage = getValueByKey({
    data: flowCase,
    key: fieldDataFlowCase.listFormStorage.name,
    convert: convertCollection.array,
    defaultValue: [],
  });

  const workflow = getValueByKey({
    data: flowCase,
    key: fieldDataFlowCase.workflow.name,
    defaultValue: null,
  });

  const workflowFormDesign = getValueByKey({
    data: flowCase,
    key: fieldDataFlowCase.workflowFormDesign.name,
    defaultValue: null,
  });

  const { listApprove, listProcessHistory } = adjustFlowCaseData(flowCase, {
    approveBatchNumber,
    whetherFilterBatchNumber: true,
  });

  return {
    workflow,
    workflowFormDesign,
    listFormStorage: [...listFormStorage],
    listProcessHistory: [...listProcessHistory],
    listApprove: [...listApprove],
  };
}

export function getDocumentPrintDesignerConfig({
  flowCaseId,
  flowCase,
  workflowFormDesign,
  listChainApprove,
  listFormStorage,
  listApprove,
}) {
  const watermarkVisibility = getValueByKey({
    data: flowCase,
    key: fieldDataFlowCase.watermarkVisibility.name,
    convert: convertCollection.number,
    defaultValue: whetherNumber.no,
  });

  const watermarkText =
    watermarkVisibility === whetherNumber.yes
      ? getValueByKey({
          data: flowCase,
          key: fieldDataFlowCase.watermarkText.name,
          convert: convertCollection.string,
          defaultValue: '',
        })
      : '';

  const sealRefuseVisibility = getValueByKey({
    data: flowCase,
    key: fieldDataFlowCase.sealRefuseVisibility.name,
    convert: convertCollection.number,
    defaultValue: whetherNumber.no,
  });

  const sealRefuseImage =
    sealRefuseVisibility === whetherNumber.yes
      ? getValueByKey({
          data: flowCase,
          key: fieldDataFlowCase.sealRefuseImage.name,
          convert: convertCollection.string,
          defaultValue: '',
        })
      : '';

  const sealDisuseVisibility = getValueByKey({
    data: flowCase,
    key: fieldDataFlowCase.sealDisuseVisibility.name,
    convert: convertCollection.number,
    defaultValue: whetherNumber.no,
  });

  const sealDisuseImage =
    sealDisuseVisibility === whetherNumber.yes
      ? getValueByKey({
          data: flowCase,
          key: fieldDataFlowCase.sealDisuseImage.name,
          convert: convertCollection.string,
          defaultValue: '',
        })
      : '';

  const documentSchema = getValueByKey({
    data: workflowFormDesign,
    key: fieldDataFlowFormDesign.documentSchema.name,
    defaultValue: {},
  });

  const remarkSchemaList = getValueByKey({
    data: workflowFormDesign,
    key: fieldDataFlowFormDesign.remarkSchemaList.name,
    convert: convertCollection.array,
  });

  const workflowTitle = getValueByKey({
    data: workflowFormDesign,
    key: fieldDataFlowFormDesign.workflowTitle.name,
    defaultValue: '',
  });

  const {
    general,
    title,
    items: itemsSource,
  } = {
    general: {},
    title: {},
    items: [],
    ...documentSchema,
  };

  const dataSchema = getValueByKey({
    data: workflowFormDesign,
    key: fieldDataFlowFormDesign.dataSchema.name,
    defaultValue: '[]',
  });

  let listDataSchema = [];

  try {
    listDataSchema = JSON.parse(dataSchema);
  } catch (error) {
    logException(error);
  }

  const listChainApproveAdjust = isArray(listChainApprove)
    ? listChainApprove.map((o) => {
        const { name } = { name: '', ...o };

        return {
          title: name,
          ...o,
        };
      })
    : [];

  const applicantSignSwitch = getValueByKey({
    data: flowCase,
    key: fieldDataFlowCase.applicantSignSwitch.name,
    convert: convertCollection.number,
  });

  const applicantStatementTitle = getValueByKey({
    data: flowCase,
    key: fieldDataFlowCase.applicantStatementTitle.name,
    convert: convertCollection.string,
  });

  const applicantStatementContent = getValueByKey({
    data: flowCase,
    key: fieldDataFlowCase.applicantStatementContent.name,
    convert: convertCollection.string,
  });

  const applicantUserSignet = getValueByKey({
    data: flowCase,
    key: fieldDataFlowCase.applicantUserSignet.name,
    convert: convertCollection.string,
  });

  const listApply = [
    {
      ...nodeApply,
      title: applicantStatementTitle,
      note: applicantStatementContent,
      ...(checkStringIsNullOrWhiteSpace(applicantUserSignet)
        ? {
            signet: emptySignet,
          }
        : {
            signet: applicantUserSignet,
          }),
      time: getValueByKey({
        data: flowCase,
        key: fieldDataFlowCase.applicantTime.name,
        convert: convertCollection.string,
      }),
    },
  ];

  const attentionSignSwitch = getValueByKey({
    data: flowCase,
    key: fieldDataFlowCase.attentionSignSwitch.name,
    convert: convertCollection.number,
  });

  const attentionStatementTitle = getValueByKey({
    data: flowCase,
    key: fieldDataFlowCase.attentionStatementTitle.name,
    convert: convertCollection.string,
  });

  const attentionStatementContent = getValueByKey({
    data: flowCase,
    key: fieldDataFlowCase.attentionStatementContent.name,
    convert: convertCollection.string,
  });

  const attentionUserSignet = getValueByKey({
    data: flowCase,
    key: fieldDataFlowCase.attentionUserSignet.name,
    convert: convertCollection.string,
  });

  const listAttention = [
    {
      ...nodeAttention,
      title: attentionStatementTitle,
      note: attentionStatementContent,
      ...(checkStringIsNullOrWhiteSpace(attentionUserSignet)
        ? {
            signet: emptySignet,
          }
        : {
            signet: attentionUserSignet,
          }),
      time: getValueByKey({
        data: flowCase,
        key: fieldDataFlowCase.attentionTime.name,
        convert: convertCollection.string,
      }),
    },
  ];

  const qRCodeImage = getValueByKey({
    data: flowCase,
    key: fieldDataFlowCase.qRCodeImage.name,
    convert: convertCollection.string,
  });

  return {
    watermarkText,
    sealRefuseVisibility,
    sealRefuseImage,
    sealDisuseVisibility,
    sealDisuseImage,
    workflowTitle,
    general,
    title,
    items: itemsSource,
    formItems: listDataSchema,
    allApproveProcessList: listChainApproveAdjust,
    remarkSchemaList,
    showRemark: !(!isArray(remarkSchemaList) || isEmptyArray(remarkSchemaList)),
    values: listFormStorage,
    approveList: listApprove,
    showApply: applicantSignSwitch === whetherNumber.yes,
    listApply,
    showAttention: attentionSignSwitch === whetherNumber.yes,
    listAttention,
    serialNumberTitle: '审批流水号: ',
    serialNumberContent: flowCaseId,
    qRCodeImage,
  };
}

export function adjustFlowCaseDataToState(o, options) {
  const { workflow } = {
    workflow: {
      workflowNodeList: [],
      workflowLineList: [],
    },
    ...o,
  };

  const nextApproveWorkflowNodeId = getValueByKey({
    data: o,
    key: fieldDataFlowCase.nextApproveWorkflowNodeId.name,
    convert: convertCollection.string,
    defaultValue: '',
  });

  const listProcessHistory = getValueByKey({
    data: o,
    key: fieldDataFlowCase.listProcessHistory.name,
    convert: convertCollection.array,
    defaultValue: [],
  });

  const { approveBatchNumber, whetherFilterBatchNumber } = {
    approveBatchNumber: 0,
    whetherFilterBatchNumber: false,
    ...options,
  };

  const { nodeList, edgeList, listApprove } = adjustFlowCaseDataItemToState({
    workflow,
    nextApproveWorkflowNodeId,
    listProcessHistory,
    approveBatchNumber,
    whetherFilterBatchNumber,
  });

  return {
    nodeList,
    edgeList,
    listApprove,
    listProcessHistory,
  };
}

function adjustFlowCaseDataItemToState({
  workflow,
  nextApproveWorkflowNodeId,
  listProcessHistory,
  approveBatchNumber = 0,
  whetherFilterBatchNumber = false,
}) {
  const listApprove = filter(listProcessHistory, (one) => {
    const {
      approveActionMode,
      approveBatchNumber: processHistoryApproveBatchNumber,
    } = {
      approveActionMode: 0,
      approveBatchNumber: 0,
      ...one,
    };

    if (whetherFilterBatchNumber) {
      return (
        approveActionMode === flowApproveActionModeCollection.manualControl &&
        toString(processHistoryApproveBatchNumber) ===
          toString(approveBatchNumber)
      );
    }

    return approveActionMode === flowApproveActionModeCollection.manualControl;
  }).map((o) => {
    const {
      note,
      approveWorkflowNodeName,
      approveUserName,
      approveUserSignet,
      approveTime,
    } = {
      approveWorkflowNodeName: '',
      note: '',
      approveUserName: '张三',
      approveUserSignet: '',
      approveTime: '',
      ...o,
    };

    return {
      ...o,
      title: approveWorkflowNodeName,
      note: note || '未填写',
      name: approveUserName,
      signet: approveUserSignet || emptySignet,
      time: approveTime,
    };
  });

  const workflowNodeList = getValueByKey({
    data: workflow,
    key: fieldDataFlow.workflowNodeList.name,
    convert: convertCollection.array,
  });

  const workflowLineList = getValueByKey({
    data: workflow,
    key: fieldDataFlow.workflowLineList.name,
    convert: convertCollection.array,
  });

  const nodeList = (isArray(workflowNodeList) ? workflowNodeList : []).map(
    (o) => {
      const workflowNodeId = getValueByKey({
        data: o,
        key: fieldDataFlowNode.workflowNodeId.name,
      });

      const type = getValueByKey({
        data: o,
        key: fieldDataFlowNode.type.name,
        convert: convertCollection.number,
      });

      let nodeType = 'intermediate';

      switch (type) {
        case flowNodeTypeCollection.startNode: {
          nodeType = 'start';
          break;
        }

        case flowNodeTypeCollection.endNode: {
          nodeType = 'end';
          break;
        }

        case flowNodeTypeCollection.intermediateNode: {
          nodeType = 'intermediate';
          break;
        }

        case flowNodeTypeCollection.carbonCopyPoint: {
          nodeType = 'carbonCopy';
          break;
        }

        default: {
          nodeType = 'intermediate';
        }
      }

      const { viewConfig } = {
        viewConfig: {
          position: {
            x: 0,
            y: 0,
          },
        },
        ...o,
      };

      const result = adjustNode({
        id: workflowNodeId,
        type: nodeType,
        ...viewConfig,
        data: {
          data: o,
          isNext: nextApproveWorkflowNodeId === workflowNodeId,
          footerBuilder: (data) => {
            return <NodeFooter data={data} />;
          },
        },
      });

      return result;
    },
  );

  const edgeList = (isArray(workflowLineList) ? workflowLineList : []).map(
    (o, index) => {
      const workflowLineId = getValueByKey({
        data: o,
        key: fieldDataFlowLine.workflowLineId.name,
      });

      const fromId = getValueByKey({
        data: o,
        key: fieldDataFlowLine.fromId.name,
      });

      const fromPositionName = getValueByKey({
        data: o,
        key: fieldDataFlowLine.fromPositionName.name,
        convertBuilder: (v) => {
          return toLowerFirst(v);
        },
      });

      const toId = getValueByKey({
        data: o,
        key: fieldDataFlowLine.toId.name,
      });

      const toPositionName = getValueByKey({
        data: o,
        key: fieldDataFlowLine.toPositionName.name,
        convertBuilder: (v) => {
          return toLowerFirst(v);
        },
      });

      const type = getValueByKey({
        data: o,
        key: fieldDataFlowLine.type.name,
        convert: convertCollection.number,
      });

      const positionList = ['top', 'left', 'bottom', 'right'];

      return adjustEdge({
        index,
        id: workflowLineId,
        forward:
          type === flowLineTypeCollection.forward ||
          type === flowLineTypeCollection.carbonCopy,
        carbonCopy: type === flowLineTypeCollection.carbonCopy,
        source: fromId,
        sourceHandle: checkInCollection(positionList, fromPositionName)
          ? fromPositionName
          : 'bottom',
        target: toId,
        targetHandle: checkInCollection(positionList, toPositionName)
          ? toPositionName
          : 'top',
        data: {
          data: o,
        },
      });
    },
  );

  return {
    nodeList,
    edgeList,
    listApprove,
  };
}

export function SealImage({
  hidden = false,
  image = '',
  top = '180px',
  right = '260px',
}) {
  if (hidden) {
    return null;
  }

  if (checkStringIsNullOrWhiteSpace(image || '')) {
    return null;
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '0px' }}>
      <div
        style={{
          position: 'absolute',
          top: top ?? '180px',
          right: right ?? '260px',
          width: '140px',
          zIndex: '10',
          transform: 'rotate(45deg)',
        }}
      >
        <ImageBox showMode="contentImage" src={image} />
      </div>
    </div>
  );
}

export function NodeFooter({ data }) {
  const approveMode = getValueByKey({
    data: data,
    key: fieldDataFlowNode.approveMode.name,
    convert: convertCollection.number,
    defaultValue: '',
  });

  const approverModeName = getFlowNodeApproveModeName({
    value: approveMode,
  });

  if (checkStringIsNullOrWhiteSpace(approverModeName)) {
    return null;
  }

  let configDescription = '';
  let whetherOneSignatureAllowSkip = whetherNumber.no;

  if (approveMode === flowNodeApproveModeCollection.oneSignature) {
    const whetherOneSignatureDesignateNextApprover = getValueByKey({
      data: data,
      key: fieldDataFlowNode.whetherOneSignatureDesignateNextApprover.name,
      convert: convertCollection.number,
      defaultValue: '',
    });

    whetherOneSignatureAllowSkip = getValueByKey({
      data: data,
      key: fieldDataFlowNode.whetherOneSignatureAllowSkip.name,
      convert: convertCollection.number,
      defaultValue: '',
    });

    configDescription =
      whetherOneSignatureDesignateNextApprover === whetherNumber.yes
        ? '指定审批人签署'
        : '不指定审批人签署';
  }

  if (approveMode === flowNodeApproveModeCollection.counterSignature) {
    const whetherCounterSignatureInSequence = getValueByKey({
      data: data,
      key: fieldDataFlowNode.whetherCounterSignatureInSequence.name,
      convert: convertCollection.number,
      defaultValue: '',
    });

    configDescription =
      whetherCounterSignatureInSequence === whetherNumber.yes
        ? '依照顺序分别签署'
        : '无需依照顺序签署';
  }

  configDescription = `${configDescription}${whetherOneSignatureAllowSkip === whetherNumber.yes ? ', 允许跳过节点审批' : ', 禁止跳过节点审批'}`;

  return (
    <div>
      <div>
        <ColorText
          textPrefix="审批方式"
          text={approverModeName}
          color="#999"
          style={{
            fontSize: 10,
          }}
          textPrefixStyle={{
            color: '#999',
          }}
          separator="："
          separatorStyle={{
            paddingLeft: '2px',
            paddingRight: '0px',
            color: '#999',
          }}
        />
      </div>

      <div>
        <ColorText
          textPrefix="审批配置"
          text={configDescription}
          color="#999"
          style={{
            fontSize: 10,
          }}
          textPrefixStyle={{
            color: '#999',
          }}
          separator="："
          separatorStyle={{
            paddingLeft: '2px',
            paddingRight: '0px',
            color: '#999',
          }}
        />
      </div>
    </div>
  );
}
