import { formNameCollection } from '../../../../customConfig';

export const fieldData = {
  ...formNameCollection,
  noticeUserRelationId: {
    label: '数据标识',
    name: 'noticeUserRelationId',
    helper: '',
  },
  noticeId: {
    label: '通告标识',
    name: 'noticeId',
    helper: '',
  },
  userId: {
    label: '用户标识',
    name: 'userId',
    helper: '',
  },
  realName: {
    label: '姓名',
    name: 'realName',
    helper: '',
  },
  nickname: {
    label: '昵称',
    name: 'nickname',
    helper: '',
  },
  phone: {
    label: '手机号码',
    name: 'phone',
    helper: '',
  },
  subsidiaryId: {
    label: '公司标识',
    name: 'subsidiaryId',
    helper: '',
  },
  subsidiaryShortName: {
    label: '所属公司简称',
    name: 'subsidiaryShortName',
    helper: '',
  },
  subsidiaryFullName: {
    label: '所属公司全称',
    name: 'subsidiaryFullName',
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
