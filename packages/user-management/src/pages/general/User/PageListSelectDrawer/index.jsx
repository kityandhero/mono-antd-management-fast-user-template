import { connect } from 'easy-soft-dva';
import { isArray } from 'easy-soft-utility';

import {
  columnFacadeMode,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

const visibleFlag = 'd602385446e043e6a169a25ef3f07926';

const { MultiPageSelectDrawer } = DataMultiPageView;
@connect(({ user, schedulingControl }) => ({
  user,
  schedulingControl,
}))
// 组件基类, 仅为代码复用性设计, 具体使用时请自行考虑
class PageListSelectDrawer extends MultiPageSelectDrawer {
  // 显示时是否自动刷新数据;
  reloadWhenShow = true;

  confirmSelect = true;

  static close() {
    switchControlAssist.close(visibleFlag);
  }

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      showSelect: true,
      pageTitle: '数据分页选择列表',
      // 页面加载时自动加载的远程请求
      loadApiPath: modelTypeCollection.userTypeCollection.pageList,
      // 设置默认试图模式为 table
      listViewMode: listViewConfig.viewMode.table,
      // table 显示模式行长度, 合理设置可以提升美观以及用户体验，超出可见区域将显示滚动条
      tableScrollX: 820,
    };
  }

  renderPresetTitleIcon = () => {
    return null;
  };

  // 配置搜索框
  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 12,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.realName,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  // 构建通知文本, 仅多选模式有效, 单选时不会触发通知
  buildSelectNotificationDescription = (o) => {
    if (isArray(o)) {
      let list = [];

      for (const item of o) {
        const { title } = item;
        list.push(title);
      }

      if (list.length > 0) {
        return `已选择: ${list.join(',')}`;
      }

      return '';
    } else {
      const { title } = o;

      return `已选择: ${title}`;
    }
  };

  // 配置 table 显示模式数据列
  getColumnWrapper = () => [
    {
      dataTarget: fieldData.avatar,
      width: 60,
      showRichFacade: true,
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.realName,
      width: 200,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.ascription,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.userId,
      width: 140,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
  ];
}

export { PageListSelectDrawer };
