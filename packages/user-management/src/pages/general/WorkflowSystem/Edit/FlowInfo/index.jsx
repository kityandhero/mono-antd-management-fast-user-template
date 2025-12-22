import { connect } from 'easy-soft-dva';
import {
  checkInCollection,
  convertCollection,
  getValueByKey,
  isArray,
  toLowerFirst,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { adjustEdge, Flow } from 'antd-management-fast-flow';

import {
  accessWayCollection,
  flowLineTypeCollection,
  flowNodeTypeCollection,
} from '../../../../../customConfig';
import { modelTypeCollection } from '../../../../../modelBuilders';
import { fieldData as fieldDataWorkflowLine } from '../../../WorkflowLine/Common/data';
import { fieldData as fieldDataWorkflowNode } from '../../../WorkflowNode/Common/data';
import { fieldData as fieldDataWorkflowNodeApprover } from '../../../WorkflowNodeApprover/Common/data';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ workflow, schedulingControl }) => ({
  workflow,
  schedulingControl,
}))
class FlowInfo extends TabPageBase {
  componentAuthority = accessWayCollection.workflow.get.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.workflowTypeCollection.get,
      workflowId: null,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
    );
  }

  doOtherAfterLoadSuccess = ({ metaData }) => {
    const workflowNodeList = getValueByKey({
      data: metaData,
      key: fieldData.workflowNodeList.name,
      convert: convertCollection.array,
    });

    const workflowLineList = getValueByKey({
      data: metaData,
      key: fieldData.workflowLineList.name,
      convert: convertCollection.array,
    });

    const nodeList = (isArray(workflowNodeList) ? workflowNodeList : []).map(
      (o) => {
        const workflowNodeId = getValueByKey({
          data: o,
          key: fieldDataWorkflowNode.workflowNodeId.name,
        });

        const type = getValueByKey({
          data: o,
          key: fieldDataWorkflowNode.type.name,
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

        const result = {
          id: workflowNodeId,
          type: nodeType,
          position: { x: 0, y: 0 },
          ...viewConfig,
          data: {
            data: o,
          },
        };

        return result;
      },
    );

    const edgeList = (isArray(workflowLineList) ? workflowLineList : []).map(
      (o, index) => {
        const workflowLineId = getValueByKey({
          data: o,
          key: fieldDataWorkflowLine.workflowLineId.name,
        });

        const fromId = getValueByKey({
          data: o,
          key: fieldDataWorkflowLine.fromId.name,
        });

        const fromPositionName = getValueByKey({
          data: o,
          key: fieldDataWorkflowLine.fromPositionName.name,
          convertBuilder: (v) => {
            return toLowerFirst(v);
          },
        });

        const toId = getValueByKey({
          data: o,
          key: fieldDataWorkflowLine.toId.name,
        });

        const toPositionName = getValueByKey({
          data: o,
          key: fieldDataWorkflowLine.toPositionName.name,
          convertBuilder: (v) => {
            return toLowerFirst(v);
          },
        });

        const type = getValueByKey({
          data: o,
          key: fieldDataWorkflowLine.type.name,
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

    this.setState({
      nodeList: [...nodeList],
      edgeList: [...edgeList],
    });
  };

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    return values;
  };

  establishCardCollectionConfig = () => {
    const { nodeList, edgeList } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          hasExtra: true,
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={{ height: '630px' }}>
                  <Flow
                    canEdit={false}
                    nodeNameKey={fieldDataWorkflowNode.name.name}
                    listApproverKey={fieldDataWorkflowNode.listApprover.name}
                    approverNameKey={
                      fieldDataWorkflowNodeApprover.approverName.name
                    }
                    approverNameLabel={
                      fieldDataWorkflowNodeApprover.approverName.label
                    }
                    carbonCopyNameKey={
                      fieldDataWorkflowNodeApprover.approverName.name
                    }
                    carbonCopyNameLabel="抄送"
                    nodes={[...(isArray(nodeList) ? nodeList : [])]}
                    edges={[...(isArray(edgeList) ? edgeList : [])]}
                    updateViewConfig={this.updateViewConfig}
                  />
                </div>
              ),
            },
          ],
        },
      ],
    };
  };
}

export default FlowInfo;
