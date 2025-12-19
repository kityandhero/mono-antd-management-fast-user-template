import { connect } from 'easy-soft-dva';
import { toString } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { singleTreeListAction } from '../../Department/Assist/action';
import { fieldData } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;

const visibleFlag = 'd12f2e7cfa5541b4a49ad8a0adcad0ea';

@connect(({ user, schedulingControl }) => ({
  user,
  schedulingControl,
}))
class AddBasicInfoDrawer extends BaseAddDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      submitApiPath:
        modelTypeCollection.userTypeCollection.addBasicInfoWithLoginInfo,
      departmentTreeData: [],
      departmentId: '',
    };
  }

  doOtherRemoteRequest = () => {
    singleTreeListAction({
      target: this,
      successCallback: ({ target, remoteListData }) => {
        target.setState({
          departmentTreeData: [...remoteListData],
        });
      },
    });
  };

  supplementSubmitRequestParams = (data) => {
    const { departmentId } = this.state;

    return { ...data, departmentId };
  };

  getPresetPageTitle = () => {
    return '新增用户';
  };

  establishCardCollectionConfig = () => {
    const { departmentTreeData, departmentId } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '账户名',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.loginName,
              require: true,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '登录密码',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.password,
              fieldData: fieldData.password,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.password,
              fieldData: fieldData.passwordVerify,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '人员信息',
          },
          items: [
            {
              lg: 12,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.realName,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.phone,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.treeSelect,
              fieldData: fieldData.departmentId,
              value: departmentId,
              require: true,
              listData: departmentTreeData,
              dataConvert: (o) => {
                const { name: title, code: value } = o;

                return {
                  title,
                  value,
                };
              },
              onChange: ({
                value,
                // eslint-disable-next-line no-unused-vars
                label,
                // eslint-disable-next-line no-unused-vars
                extra,
                // eslint-disable-next-line no-unused-vars
                treeData,
                // eslint-disable-next-line no-unused-vars
                listData,
              }) => {
                this.setState({
                  departmentId: toString(value),
                });
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '其他信息',
          },
          items: [
            {
              type: cardConfig.contentItemType.nowTime,
            },
          ],
        },
      ],
    };
  };
}

export default AddBasicInfoDrawer;
