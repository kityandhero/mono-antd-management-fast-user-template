import { Flex, Tooltip } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getCurrentOperatorCache,
  getValueByKey,
  whetherNumber,
} from 'easy-soft-utility';

import { columnFacadeMode } from 'antd-management-fast-common';
import { ColorText, iconBuilder } from 'antd-management-fast-component';
import {
  DataMultiPageView,
  getCurrentOperator,
} from 'antd-management-fast-framework';

import { getFlowCaseStatusName } from '../../customSpecialComponents';
import { getFlowCaseStatusBadge } from '../../pageBases';
import { ApprovalDrawer } from '../../pageBases/WorkflowCase/ApprovalDrawer';
import { fieldData } from '../WorkflowCaseMadeByMe/Common/data';

import { CaseLatestApproveCount } from './CaseLatestApproveCount';
import { CaseSubmitCount } from './CaseSubmitCount';
import { CaseWaitApproveCount } from './CaseWaitApproveCount';
import { NotificationWaitReadCount } from './NotificationWaitReadCount';
import { PageHeaderContent } from './PageHeaderContent';
import { ShortcutPanel } from './ShortcutPanel';

const { MultiPage } = DataMultiPageView;

@connect(({ workflowCase, currentOperator, schedulingControl }) => ({
  workflowCase,
  currentOperator,
  schedulingControl,
}))
class Index extends MultiPage {
  columnOperateWidth = 140;

  resetDataAfterLoad = false;

  showSearchForm = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '工作台',
      listTitle: '待我审批的流程列表',
      loadApiPath: 'workflowCase/pageListWaitApprove',
      tableScrollX: 1020,
      pageSize: 8,
      currentOperator: null,
      currentRecord: null,
    };
  }

  doWorkAdjustDidMount = () => {
    const that = this;

    getCurrentOperator({
      successCallback: (data) => {
        that.setState({ currentOperator: data });
      },
    });

    that.repeatRefreshData();
  };

  repeatRefreshData = () => {
    const that = this;

    setTimeout(() => {
      that.refreshData({
        completeCallback: () => {
          that.repeatRefreshData();
        },
      });
    }, 60_000);
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'goToEdit': {
        this.goToEdit(handleData);
        break;
      }

      default: {
        break;
      }
    }
  };

  openForm = (item) => {
    this.setState(
      {
        currentRecord: item,
      },
      () => {
        ApprovalDrawer.open();
      },
    );
  };

  goToEdit = (item) => {
    const workflowCaseId = getValueByKey({
      data: item,
      key: fieldData.workflowCaseId.name,
    });

    this.goToPath(
      `/flowCase/workflowCaseWaitApprove/edit/load/${workflowCaseId}/key/formInfo`,
    );
  };

  afterApprovalDrawerClose = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  establishPageHeaderTitlePrefix = () => {
    return '标题';
  };

  establishPageHeaderSubTitle = () => {
    return '在这里可以快速开展任务作业';
  };

  establishPageContentLayoutSiderConfig = () => {
    return {
      position: 'right',
    };
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '快速审批',
      placement: 'topRight',
      icon: iconBuilder.edit(),
      handleButtonClick: ({ handleData }) => {
        this.openForm(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'goToEdit',
          icon: iconBuilder.form(),
          text: '查阅详情',
        },
      ],
    };
  };

  establishPageHeaderContentComponentConfig = () => {
    const currentOperator = getCurrentOperatorCache();

    const avatar = getValueByKey({
      data: currentOperator,
      key: 'avatar',
    });

    const name = getValueByKey({
      data: currentOperator,
      key: 'name',
      defaultValue: '--',
    });

    return {
      component: <PageHeaderContent avatar={avatar} name={name} />,
    };
  };

  establishSiderTopAreaConfig = () => {
    return (
      <>
        <ShortcutPanel />
      </>
    );
  };

  getColumnWrapper = () => [
    {
      dataTarget: { ...fieldData.workflowCaseId, label: '项目流水号' },
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.title,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
      render: (value, record) => {
        const whetherEmergency = getValueByKey({
          data: record,
          key: fieldData.whetherEmergency.name,
          convert: convertCollection.number,
        });

        const valuePart =
          whetherEmergency === whetherNumber.yes ? (
            <ColorText
              textPrefix="[紧急]"
              textPrefixStyle={{
                color: 'red',
                paddingRight: '6px',
              }}
              separator=""
              text={value}
              multiLine
            />
          ) : (
            <ColorText text={value} multiLine />
          );

        return (
          <Tooltip placement="topLeft" title={value}>
            <div>{valuePart}</div>
          </Tooltip>
        );
      },
    },
    {
      dataTarget: fieldData.userRealName,
      width: 140,
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
          status: getFlowCaseStatusBadge(value),
          text: getFlowCaseStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];

  renderPresetPageBodyTop = () => {
    const { currentRecord } = this.state;

    return (
      <div
        style={{
          padding: '10px',
          textAlign: 'center',
          marginBottom: '10px',
        }}
      >
        <Flex
          style={{ width: '100%' }}
          justify={'space-between'}
          align={'center'}
        >
          <CaseSubmitCount
            onClick={() => {
              this.goToPath(`/flowCase/workflowCaseMadeByMe/pageList/no`);
            }}
          />

          <CaseLatestApproveCount
            onClick={() => {
              this.goToPath(`/flowCase/workflowCaseLatestApprove/pageList/no`);
            }}
          />

          <CaseWaitApproveCount
            onClick={() => {
              this.goToPath(`/flowCase/workflowCaseWaitApprove/pageList/no`);
            }}
          />

          <NotificationWaitReadCount
            onClick={() => {
              this.goToPath(`/flowCase/nextProcessNotification/pageList/no`);
            }}
          />

          <ApprovalDrawer
            maskClosable
            externalData={currentRecord}
            afterClose={this.afterApprovalDrawerClose}
          />
        </Flex>
      </div>
    );
  };
}

export default Index;
