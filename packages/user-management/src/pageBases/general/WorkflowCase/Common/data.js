import { fieldDataFlowCase } from '../../../../customConfig';

const fieldDataExtra = {
  canHide: {
    label: '能否隐藏',
    name: 'canHide',
    helper: '',
  },
};

export const fieldData = {
  ...fieldDataFlowCase,
  workflowCaseId: {
    label: '数据标识',
    name: 'workflowCaseId',
    helper: '',
  },
  approveAction: {
    label: '审批动作',
    name: 'approveAction',
    helper: '',
  },
  approveActionNote: {
    label: '审批动作',
    name: 'approveActionNote',
    helper: '',
  },
  approveActionMode: {
    label: '审批动作模式',
    name: 'approveActionMode',
    helper: '',
  },
  approveActionModeNote: {
    label: '审批动作模式',
    name: 'approveActionModeNote',
    helper: '',
  },
  ...fieldDataExtra,
};
