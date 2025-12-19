import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  getValueByKey,
  handleItem,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  getDerivedStateFromPropertiesForUrlParameters,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import {
  getChannelName,
  getPresetRoleStatusName,
} from '../../../../customSpecialComponents';
import { refreshCacheAction } from '../Assist/action';
import { parseUrlParametersForSetState } from '../Assist/config';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';
import { ModuleTreeDrawer } from '../ModuleTreeDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ presetRole, schedulingControl }) => ({
  presetRole,
  schedulingControl,
}))
class PageList extends MultiPage {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      paramsKey: accessWayCollection.presetRole.pageList.paramsKey,
      pageTitle: '预设角色列表',
      loadApiPath: 'presetRole/pageList',
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

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'refreshCache': {
        this.refreshCache(handleData);

        break;
      }

      default: {
        break;
      }
    }
  };

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const presetRoleId = getValueByKey({
      data: handleData,
      key: fieldData.presetRoleId.name,
    });

    handleItem({
      target,
      value: presetRoleId,
      compareValueHandler: (o) => {
        const { presetRoleId: v } = o;

        return v;
      },
      handler: (d) => {
        const o = d;

        o[fieldData.status.name] = getValueByKey({
          data: remoteData,
          key: fieldData.status.name,
        });

        return d;
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  showModuleTreeDrawer = (item) => {
    this.setState(
      {
        currentRecord: item,
      },
      () => {
        ModuleTreeDrawer.open();
      },
    );
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '查看',
      icon: iconBuilder.read(),
      handleButtonClick: ({ handleData }) => {
        this.showModuleTreeDrawer(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
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
      dataTarget: fieldData.name,
      width: 200,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.description,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.moduleCount,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      formatValue: (value) => {
        return value === '' ? '0' : value;
      },
    },
    {
      dataTarget: fieldData.createTime,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.status,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getPresetRoleStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.createTime,
      width: 150,
      sorter: false,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.channel,
      width: 160,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 31,
          }),
        };
      },
      formatValue: (value) => {
        return getChannelName({
          value: value,
        });
      },
    },
  ];

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <ModuleTreeDrawer maskClosable externalData={currentRecord} />
      </>
    );
  };
}

export default PageList;
