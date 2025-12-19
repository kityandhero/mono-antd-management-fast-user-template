import { fieldDataFlowCase } from '../../../../customConfig';

const fieldExtraData = {
  debugSimulateActualEffect: {
    label: '是否模拟实际效果',
    name: 'debugSimulateActualEffect',
    helper: '',
  },
};

export const fieldData = {
  ...fieldDataFlowCase,
  workflowDebugCaseId: {
    label: '数据标识',
    name: 'workflowDebugCaseId',
    helper: '',
  },
  ...fieldExtraData,
};
