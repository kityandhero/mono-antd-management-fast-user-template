import { connect } from 'easy-soft-dva';
import { checkHasAuthority } from 'easy-soft-utility';

import {
  columnFacadeMode,
  getDerivedStateFromPropertiesForUrlParameters,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../../../customConfig';
import { getUserSubsidiaryInfoStatusName } from '../../../../../../customSpecialComponents';
import { refreshCacheAction } from '../../../../UserSubsidiaryInfo/Assist/action';
import { getStatusBadge } from '../../../../UserSubsidiaryInfo/Assist/tools';
import { fieldData } from '../../../../UserSubsidiaryInfo/Common/data';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../../../Assist/config';

const { InnerMultiPage } = DataMultiPageView;

@connect(({ userSubsidiaryInfo, schedulingControl }) => ({
  userSubsidiaryInfo,
  schedulingControl,
}))
class PageList extends InnerMultiPage {
  componentAuthority =
    accessWayCollection.userSubsidiaryInfo.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '用户公司关系列表',
      paramsKey: accessWayCollection.userSubsidiaryInfo.pageList.paramsKey,
      loadApiPath: 'userSubsidiaryInfo/pageList',
      dateRangeFieldName: '创建时间',
      userId: null,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
    );
  }

  checkNeedUpdate = (preProperties, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProperties, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { userId } = this.state;

    d.userId = userId;

    return d;
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'remove': {
        this.remove(handleData);

        break;
      }

      case 'refreshCache': {
        this.refreshCache(handleData);

        break;
      }

      default: {
        break;
      }
    }
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.userSubsidiaryInfoId,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '编辑',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(
        accessWayCollection.userSubsidiaryInfo.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          withDivider: true,
          uponDivider: true,
          key: 'remove',
          icon: iconBuilder.delete(),
          text: '移除所属关系',
          confirm: true,
          title: '将要移除所属关系，确定吗？',
        },
        {
          withDivider: true,
          uponDivider: true,
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          confirm: true,
          title: '将要刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.realName,
      width: 140,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.phone,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.subsidiaryShortName,
      width: 300,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.subsidiaryFullName,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.status,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getUserSubsidiaryInfoStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.userSubsidiaryInfoId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];
}

export default PageList;
