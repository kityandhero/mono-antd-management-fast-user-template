import { formNameCollection } from '../../../../customConfig';

const fieldExtraData = {
  tagName: {
    label: '标签名称',
    name: 'tagName',
    helper: '',
  },
  tagDisplayName: {
    label: '标签显示名',
    name: 'tagDisplayName',
    helper: '',
  },
  color: {
    label: '色值 ',
    name: 'color',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  workflowTagRelationId: {
    label: '数据标识',
    name: 'workflowTagRelationId',
    helper: '',
  },
  workflowId: {
    label: '流程标识',
    name: 'workflowId',
    helper: '',
  },
  tagId: {
    label: '用户标识',
    name: 'tagId',
    helper: '',
  },
  ...fieldExtraData,
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 正常
   * value : 100
   */
  normal: 100,
};
