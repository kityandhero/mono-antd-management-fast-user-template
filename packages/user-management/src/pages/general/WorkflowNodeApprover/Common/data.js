import { formNameCollection } from '../../../../customConfig';

const formExtraData = {};

export const fieldData = {
  ...formNameCollection,
  workflowNodeApproverId: {
    label: '数据标识',
    name: 'workflowNodeApproverId',
    helper: '',
  },
  workflowId: {
    label: '工作流标识',
    name: 'workflowId',
    helper: '',
  },
  workflowName: {
    label: '工作流',
    name: 'workflowName',
    helper: '',
  },
  workflowNodeId: {
    label: '工作流节点标识',
    name: 'workflowNodeId',
    helper: '',
  },
  workflowNodeName: {
    label: '工作流节点',
    name: 'workflowNodeName',
    helper: '',
  },
  userId: {
    label: '审批人标识',
    name: 'userId',
    helper: '',
  },
  userRealName: {
    label: '审批人',
    name: 'userRealName',
    helper: '',
  },
  positionGradeId: {
    label: '职级',
    name: 'positionGradeId',
    helper: '',
  },
  positionGradeName: {
    label: '职级',
    name: 'positionGradeName',
    helper: '',
  },
  approverName: {
    label: '审批',
    name: 'approverName',
    helper: '',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '',
  },
  ...formExtraData,
};
