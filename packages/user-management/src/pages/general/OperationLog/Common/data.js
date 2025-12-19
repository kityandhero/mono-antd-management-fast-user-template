import { formNameCollection } from '../../../../customConfig';

const fieldExtraData = {
  operatorModeNote: {
    label: '操作人模式',
    name: 'operatorModeNote',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  operationLogId: {
    label: '数据标识',
    name: 'operationLogId',
    helper: '',
  },
  primaryKeyValue: {
    label: '数据目标标识',
    name: 'primaryKeyValue',
    helper: '',
  },
  operatorId: {
    label: '操作人标识',
    name: 'operatorId',
    helper: '',
  },
  operatorName: {
    label: '操作人',
    name: 'operatorName',
    helper: '',
  },
  operatorMode: {
    label: '操作人模式',
    name: 'operatorMode',
    helper: '',
  },
  title: {
    label: '标题',
    name: 'title',
    helper: '',
  },
  content: {
    label: '内容',
    name: 'content',
    helper: '',
  },
  tableName: {
    label: '目标所在',
    name: 'tableName',
    helper: '',
  },
  ...fieldExtraData,
};
