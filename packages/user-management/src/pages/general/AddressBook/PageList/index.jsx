import { connect } from 'easy-soft-dva';
import { toBoolean } from 'easy-soft-utility';

import {
  cardConfig,
  columnFacadeMode,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import {
  getGenderName,
  getUserStatusName,
} from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { getGraphicalTreeAction } from '../../Organization/Assist/action';
import { getStatusBadge } from '../../User/Assist/tools';
import { fieldData as fieldDataUser } from '../../User/Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ user, schedulingControl }) => ({
  user,
  schedulingControl,
}))
class PageList extends MultiPage {
  columnOperateVisible = false;

  componentAuthority = accessWayCollection.user.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '通讯录',
      paramsKey: accessWayCollection.user.pageList.paramsKey,
      loadApiPath: modelTypeCollection.userTypeCollection.pageList,
      dateRangeFieldName: '创建时间',
      departmentId: '',
      organizationTreeData: [],
    };
  }

  supplementLoadRequestParams = (o) => {
    return {
      ...this.supplementRequestParams(o),
    };
  };

  supplementRequestParams = (o) => {
    const { departmentId } = this.state;

    const d = { ...o };

    d[fieldDataUser.departmentId.name] = departmentId ?? '';

    return d;
  };

  doOtherRemoteRequest = () => {
    getGraphicalTreeAction({
      target: this,
      successCallback: ({ target, remoteData }) => {
        target.setState({
          organizationTreeData: remoteData,
        });
      },
    });
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldDataUser.userId,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldDataUser.realName,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldDataUser.phone,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldDataUser.avatar,
      width: 60,
      showRichFacade: true,
      facadeMode: columnFacadeMode.image,
      fixed: true,
    },
    {
      dataTarget: fieldDataUser.loginName,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
      fixed: true,
    },
    {
      dataTarget: fieldDataUser.realName,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
      fixed: true,
    },
    {
      dataTarget: fieldDataUser.phone,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
      fixed: true,
    },
    {
      dataTarget: fieldDataUser.nickname,
      width: 200,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldDataUser.gender,
      width: 80,
      showRichFacade: true,
      formatValue: (value) => {
        return getGenderName({
          value: value,
          defaultValue: '--',
        });
      },
    },

    {
      dataTarget: fieldDataUser.status,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getUserStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldDataUser.userId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldDataUser.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];

  establishSiderTopAreaConfig = () => {
    const { organizationTreeData } = this.state;

    return {
      list: [
        {
          title: {
            text: '部门信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.tree,
              showLine: true,
              switcherIcon: iconBuilder.down(),
              listData: [organizationTreeData],
              dataConvert: (o) => {
                const {
                  name: title,
                  code: value,
                  key,
                  root,
                } = {
                  root: 0,
                  ...o,
                };

                return {
                  title,
                  value,
                  key,
                  root,
                };
              },
              innerProps: {
                defaultExpandAll: true,
              },
              onSelect: (selectedKeys, o, { node }) => {
                const { root, key } = node;

                this.setState(
                  {
                    departmentId: toBoolean(root) ? '' : key,
                  },
                  () => {
                    this.refreshData({});
                  },
                );
              },
            },
          ],
        },
      ],
    };
  };

  establishSiderBottomAreaConfig = () => {
    return {
      list: [
        {
          instruction: {
            title: '操作说明',
            showDivider: false,
            showNumber: true,
            list: [
              {
                text: '点击部门可查看部门人员',
              },
            ],
          },
        },
      ],
    };
  };
}

export default PageList;
