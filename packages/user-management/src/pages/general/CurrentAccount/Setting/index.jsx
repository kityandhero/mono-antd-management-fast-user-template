import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getCurrentOperatorCache,
  getValueByKey,
  whetherNumber,
} from 'easy-soft-utility';

import { defaultUserAvatar } from 'antd-management-fast-common';
import { DataMenuContainer } from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

@connect(({ currentOperator, currentAccount, schedulingControl }) => ({
  currentOperator,
  currentAccount,
  schedulingControl,
}))
class Setting extends DataMenuContainer {
  showReloadButton = false;

  menuList = [
    {
      key: 'basicInfo',
      defaultSelect: true,
      text: '基本信息',
    },
    {
      key: 'password',
      text: '更改密码',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'currentAccount/get',
      submitApiPath: 'currentAccount/updateBasicInfo',
      avatar: '',
    };
  }

  establishPageHeaderAvatarConfig = () => {
    const currentOperator = getCurrentOperatorCache();

    const avatar = getValueByKey({
      data: currentOperator,
      key: 'avatar',
    });

    return { src: avatar || defaultUserAvatar };
  };

  getPresetPageTitle = () => {
    const currentOperator = getCurrentOperatorCache();

    const name = getValueByKey({
      data: currentOperator,
      key: fieldData.name.name,
      defaultValue: '',
    });

    const hasSuperRole = getValueByKey({
      data: currentOperator,
      key: fieldData.hasSuperRole.name,
      convert: convertCollection.boolean,
    });

    return `${name} ${
      hasSuperRole === whetherNumber.yes ? '【 超级权限 】' : ''
    }`;
  };
}

export default Setting;
