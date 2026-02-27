import { connect } from 'easy-soft-dva';
import { isFunction } from 'easy-soft-utility';

import {
  columnFacadeMode,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import { getWorkflowCategoryStatusName } from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { MultiPageDrawer } = DataMultiPageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '0238603c29cf4205958558bd9ca61719';

@connect(({ workflowCategory, schedulingControl }) => ({
  workflowCategory,
  schedulingControl,
}))
class PageListWorkflowCategorySelectActionDrawer extends MultiPageDrawer {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  // showCallProcess = true;

  reloadWhenShow = true;

  componentAuthority = accessWayCollection.workflowCategory.pageList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  static close() {
    switchControlAssist.close(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      tableScrollX: 920,
      loadApiPath: modelTypeCollection.workflowCategoryTypeCollection.pageList,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  supplementLoadRequestParams = (o) => {
    return {
      ...this.supplementRequestParams(o),
    };
  };

  supplementRequestParams = (o) => {
    const { externalData } = this.state;

    return { ...o, ...externalData };
  };

  onSelect = (selectData) => {
    PageListWorkflowCategorySelectActionDrawer.close();

    const { afterSelect } = this.props;

    if (isFunction(afterSelect)) {
      afterSelect(selectData);
    }
  };

  getPresetPageTitle = () => {
    return '请选择';
  };

  renderPresetTitleIcon = () => null;

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 16,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (item) => {
    return {
      size: 'small',
      text: '选取',
      placement: 'topRight',
      icon: iconBuilder.select(),
      handleData: item,
      confirm: true,
      title: '即将设为此项，确定吗？',
      handleButtonClick: ({ handleData }) => {
        this.onSelect(handleData);
      },
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.image,
      width: 60,
      showRichFacade: true,
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.name,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.parentName,
      width: 160,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.sort,
      width: 80,
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
          text: getWorkflowCategoryStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.workflowCategoryId,
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

export { PageListWorkflowCategorySelectActionDrawer };
