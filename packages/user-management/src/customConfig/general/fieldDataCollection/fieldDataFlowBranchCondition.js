import { formNameCollection } from './fieldDataCommon';

const fieldDataExtra = {
  whetherCurrentChannel: {
    label: '是否当前通道',
    name: 'whetherCurrentChannel',
    helper: '',
  },
  listWorkflowBranchConditionItem: {
    label: '条件项列表',
    name: 'listWorkflowBranchConditionItem',
    helper: '',
  },
};

export const fieldDataFlowBranchCondition = {
  ...formNameCollection,
  workflowBranchConditionId: {
    label: '数据标识',
    name: 'workflowBranchConditionId',
    helper: '',
  },
  workflowId: {
    label: '工作流标识',
    name: 'workflowId',
    helper: '',
  },
  workflowNodeId: {
    label: '工作流节点标识',
    name: 'workflowNodeId',
    helper: '',
  },
  workflowName: {
    label: '工作流',
    name: 'workflowName',
    helper: '',
  },
  workflowNodeName: {
    label: '工作流节点',
    name: 'workflowNodeName',
    helper: '',
  },
  name: {
    label: '名称',
    name: 'name',
    helper: '',
  },
  description: {
    label: '简介描述 ',
    name: 'description',
    helper: '',
  },
  judgmentMode: {
    label: '判断模式',
    name: 'judgmentMode',
    helper: '',
  },
  judgmentModeNote: {
    label: '判断模式',
    name: 'judgmentModeNote',
    helper: '',
  },
  ...fieldDataExtra,
};
