import { formNameCollection } from 'antd-management-fast-common';

const fieldDataExtra = {
  ascription: {
    label: '归属',
    name: 'ascription',
    helper: '账户归属的公司',
  },
  hasSuperRole: {
    label: '超级权限',
    name: 'hasSuperRole',
    helper: '账户是否拥有超级权限',
  },
};

export const fieldData = {
  ...formNameCollection,
  loginName: {
    label: '账户名',
    name: 'loginName',
    helper: '登录用账户名',
  },
  name: {
    label: '名称',
    name: 'name',
    helper: '登录用账户名',
  },
  realName: {
    label: '姓名',
    name: 'realName',
    helper: '注意书写名称规范',
  },
  nickname: {
    label: '昵称',
    name: 'nickname',
    helper: '',
  },
  avatar: {
    label: '头像',
    name: 'avatar',
    helper: '',
  },
  email: {
    label: '邮箱',
    name: 'email',
    helper: '邮箱地址需确保有效',
  },
  phone: {
    label: '手机号码',
    name: 'phone',
    helper: '手机号码格式需规范并保证有效',
  },
  cityId: {
    label: '地区代码',
    name: 'cityId',
    helper: '',
  },
  cityName: {
    label: '所属地区',
    name: 'cityName',
    helper: '',
  },
  description: {
    label: '个人描述',
    name: 'description',
    helper: '描述个人特征信息',
  },
  originalWord: {
    label: '原密码',
    name: 'originalWord',
    helper: '请输入正确的原密码',
  },
  newWord: {
    label: '新密码',
    name: 'newWord',
    helper: '密码不得少于六位',
  },
  reNewWord: {
    label: '确认新密码',
    name: 'reNewWord',
    helper: '确认密码应与密码保持一致',
  },
  ...fieldDataExtra,
};
