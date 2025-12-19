import { connect } from 'easy-soft-dva';
import {
  checkInCollection,
  filter,
  getValueByKey,
  toString,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { flowLinePositionCollection } from '../../../../customConfig';
import {
  renderFormFlowLineFromPositionSelect,
  renderFormFlowLineToPositionSelect,
  renderFormFlowLineTypeSelect,
} from '../../../../customSpecialComponents';
import { fieldData as fieldDataWorkflowNode } from '../../WorkflowNode/Common/data';
import { FromNodeSelectModalField } from '../../WorkflowNode/FromNodeSelectModalField';
import { ToNodeSelectModalField } from '../../WorkflowNode/ToNodeSelectModalField';
import { fieldData as fieldDataWorkflow } from '../../WorkflowSelfBuild/Common/data';
import { fieldData } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;

const visibleFlag = 'ab4bc7ae04d54b059121dce931c8bb62';

@connect(({ workflowNode, schedulingControl }) => ({
  workflowNode,
  schedulingControl,
}))
class AddLineDrawer extends BaseAddDrawer {
  destroyOnClose = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增流程线',
      submitApiPath: 'workflowLine/createLine',
      fromId: '',
      fromName: '',
      toId: '',
      toName: '',
    };
  }

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData, fromId, toId } = this.state;

    const workflowId = getValueByKey({
      data: externalData,
      key: fieldDataWorkflow.workflowId.name,
    });

    d[fieldData.workflowId.name] = workflowId;
    d[fieldData.fromId.name] = fromId;
    d[fieldData.toId.name] = toId;

    return d;
  };

  afterFromNodeSelect = (d) => {
    const fromId = getValueByKey({
      data: d,
      key: fieldDataWorkflowNode.workflowNodeId.name,
    });

    const fromName = getValueByKey({
      data: d,
      key: fieldDataWorkflowNode.name.name,
    });

    this.setState({
      fromId: fromId,
      fromName: fromName,
    });
  };

  afterFromNodeClearSelect = () => {
    this.setState({
      fromId: '',
      fromName: '',
    });
  };

  afterToNodeSelect = (d) => {
    const toId = getValueByKey({
      data: d,
      key: fieldDataWorkflowNode.workflowNodeId.name,
    });

    const toName = getValueByKey({
      data: d,
      key: fieldDataWorkflowNode.name.name,
    });

    this.setState({
      toId: toId,
      toName: toName,
    });
  };

  afterToNodeClearSelect = () => {
    this.setState({
      toId: '',
      toName: '',
    });
  };

  adjustLinePositionListData = (list) => {
    const listAdjust = filter(list, (one) => {
      const { flag } = one;

      return checkInCollection(
        [
          toString(flowLinePositionCollection.top),
          toString(flowLinePositionCollection.left),
          toString(flowLinePositionCollection.right),
          toString(flowLinePositionCollection.bottom),
        ],
        toString(flag),
      );
    });

    return listAdjust;
  };

  renderPresetTitle = () => {
    return '新增流程线';
  };

  establishCardCollectionConfig = () => {
    const { externalData, fromName, toName } = this.state;

    const that = this;

    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customSelect,
              component: renderFormFlowLineTypeSelect({}),
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: (
                <FromNodeSelectModalField
                  externalData={externalData}
                  label={fieldData.fromName.label}
                  defaultValue={fromName || null}
                  helper={fieldData.fromName.helper}
                  afterSelectSuccess={(d) => {
                    this.afterFromNodeSelect(d);
                  }}
                  afterClearSelect={() => {
                    this.afterFromNodeClearSelect();
                  }}
                />
              ),
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: renderFormFlowLineFromPositionSelect({
                adjustListData: that.adjustLinePositionListData,
              }),
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: (
                <ToNodeSelectModalField
                  externalData={externalData}
                  label={fieldData.toName.label}
                  defaultValue={toName || null}
                  helper={fieldData.toName.helper}
                  afterSelectSuccess={(d) => {
                    this.afterToNodeSelect(d);
                  }}
                  afterClearSelect={() => {
                    this.afterToNodeClearSelect();
                  }}
                />
              ),
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: renderFormFlowLineToPositionSelect({
                adjustListData: that.adjustLinePositionListData,
              }),
              require: true,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '标题与描述',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.title,
              require: false,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
              require: false,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '其他信息',
          },
          items: [
            {
              type: cardConfig.contentItemType.nowTime,
            },
          ],
        },
      ],
    };
  };
}

export { AddLineDrawer };
