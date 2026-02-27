import { formNameCollection } from '../../../../customConfig';

const fieldExtraData = {
  parentName: {
    label: '上级类别',
    name: 'parentName',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  workflowCategoryId: {
    label: '主键标识',
    name: 'workflowCategoryId',
    helper: '',
  },
  name: {
    label: '名称',
    name: 'name',
    helper: '',
  },
  description: {
    label: '简介描述',
    name: 'description',
    helper: '',
  },
  image: {
    label: '图片',
    name: 'image',
    helper: '',
  },
  parentId: {
    label: '父级标识',
    name: 'parentId',
    helper: '',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '',
  },
  whetherRecommend: {
    label: '是否推荐',
    name: 'whetherRecommend',
    helper: '',
  },
  whetherTop: {
    label: '是否置顶',
    name: 'whetherTop',
    helper: '',
  },
  whetherVisible: {
    label: '是否可见',
    name: 'whetherVisible',
    helper: '',
  },
  ...fieldExtraData,
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 已禁用
   * value : 0
   */
  disable: 0,

  /**
   * 已启用
   * value : 100
   */
  enable: 100,
};
