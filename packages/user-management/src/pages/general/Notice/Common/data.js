import { formNameCollection } from 'antd-management-fast-common';

const fieldDataExtra = {
  listTag: {
    label: '标签',
    name: 'listTag',
    helper: '标签列表',
  },
};

export const fieldData = {
  ...formNameCollection,
  noticeId: {
    label: '数据标识',
    name: 'noticeId',
    helper: '',
  },
  title: {
    label: '标题',
    name: 'title',
    helper: '',
  },
  titleColor: {
    label: '标题颜色',
    name: 'titleColor',
    helper: '',
  },
  subtitle: {
    label: '副标题',
    name: 'subtitle',
    helper: '',
  },
  author: {
    label: '作者',
    name: 'author',
    helper: '',
  },
  image: {
    label: '配图 ',
    name: 'image',
    helper: '',
  },
  description: {
    label: '简介描述 ',
    name: 'description',
    helper: '',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '',
  },
  targetMode: {
    label: '对象模式',
    name: 'targetMode',
    helper: '',
  },
  subsidiaryId: {
    label: '所属公司标识',
    name: 'subsidiaryId',
    helper: '所属的公司',
  },
  subsidiaryShortName: {
    label: '所属公司',
    name: 'subsidiaryShortName',
    helper: '',
  },
  contentData: {
    label: '详细内容',
    name: 'contentData',
    helper: '文章的详细内容',
  },
  whetherRecommend: {
    label: '推荐',
    name: 'whetherRecommend',
    helper: '是否推荐',
  },
  whetherRecommendNote: {
    label: '推荐',
    name: 'whetherRecommendNote',
    helper: '是否推荐',
  },
  whetherTop: {
    label: '推荐',
    name: 'whetherTop',
    helper: '是否推荐',
  },
  whetherTopNote: {
    label: '推荐',
    name: 'whetherTopNote',
    helper: '是否推荐',
  },
  topExpirationTime: {
    label: '置顶过期时间',
    name: 'topExpirationTime',
    helper: '置顶状态的过期时间',
  },
  status: {
    label: '状态',
    name: 'status',
    helper: '用户状态',
  },
  statusNote: {
    label: '状态',
    name: 'statusNote',
    helper: '用户状态',
  },
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '',
  },
  updateTime: {
    label: '更新时间',
    name: 'updateTime',
    helper: '',
  },
  ...fieldDataExtra,
};

/**
 * 状态值集合
 */
export const targetModeCollection = {
  /**
   * 当前企业
   * value : 100
   */
  ownershipSubsidiary: 100,

  /**
   * 当前企业以及其下属企业
   * value : 200
   */
  ownershipSubsidiaryAndSubSubsidiary: 200,

  /**
   * 特定用户
   * value : 300
   */
  user: 300,
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 下线
   * value : 0
   */
  offline: 0,

  /**
   * 上线
   * value : 100
   */
  online: 100,
};
