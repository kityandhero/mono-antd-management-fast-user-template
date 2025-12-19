import { connect } from 'easy-soft-dva';

import { columnFacadeMode } from 'antd-management-fast-common';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { fieldData } from '../../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ currentAccount, schedulingControl }) => ({
  currentAccount,
  schedulingControl,
}))
class PageList extends MultiPage {
  columnOperateVisible = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'currentAccount/pageListLoginLog',
      dateRangeFieldName: '操作时间',
    };
  }

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.loginName,
      width: 180,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      sorter: false,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
  ];
}

export default PageList;
