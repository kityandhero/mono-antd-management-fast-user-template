import { formNameCollection } from '../../../../customConfig';

export const fieldData = {
  ...formNameCollection,
  noticeTagRelationId: {
    label: '数据标识',
    name: 'noticeTagRelationId',
    helper: '',
  },
  noticeId: {
    label: '通告标识',
    name: 'noticeId',
    helper: '',
  },
  tagId: {
    label: '用户标识',
    name: 'tagId',
    helper: '',
  },
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
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '选型的创建时间',
  },
  createOperatorId: {
    label: '创建人',
    name: 'createOperatorId',
    helper: '选型的创建人',
  },
  updateTime: {
    label: '更新时间',
    name: 'updateTime',
    helper: '选型的更新时间',
  },
  updateOperatorId: {
    label: '更新人',
    name: 'updateOperatorId',
    helper: '选型的更新人',
  },
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 正常
   * value : 100
   */
  normal: 100,
};
