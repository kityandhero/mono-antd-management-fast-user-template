import { Tooltip } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkInCollection,
  convertCollection,
  getValueByKey,
  whetherNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
} from 'antd-management-fast-common';
import { ColorText, iconBuilder } from 'antd-management-fast-component';

import {
  accessWayCollection,
  flowCaseStatusCollection,
} from '../../../../customConfig';
import { getFlowCaseStatusName } from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { getFlowCaseStatusBadge, WorkflowCase } from '../../../pageBases';
import {
  disuseAction,
  forceEndAction,
} from '../../../pageBases/WorkflowCase/Assist/action';
import { fieldData } from '../../../pageBases/WorkflowCase/Common/data';
import { FormDrawer } from '../../WorkflowCaseFormStorage/FormDrawer';
import { OperateLogDrawer } from '../OperateLogDrawer';

const { PageList: PageListWorkflowCase } = WorkflowCase;

@connect(({ workflowCase, schedulingControl }) => ({
  workflowCase,
  schedulingControl,
}))
class PageList extends PageListWorkflowCase {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '监控的审批实例列表',
      paramsKey: accessWayCollection.workflowCase.pageListUserMonitor.paramsKey,
      loadApiPath:
        modelTypeCollection.workflowCaseTypeCollection.pageListUserMonitor,
      currentRecord: null,
    };
  }

  forceEnd = (r) => {
    forceEndAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  disuse = (r) => {
    disuseAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  showFormDrawer = (o) => {
    this.setState(
      {
        currentRecord: o,
      },
      () => {
        FormDrawer.open();
      },
    );
  };

  showOperateLogDrawer = (item) => {
    this.setState(
      {
        currentRecord: item,
      },
      () => {
        OperateLogDrawer.open();
      },
    );
  };

  establishListItemDropdownConfig = (record) => {
    const status = getValueByKey({
      data: record,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '详情',
      icon: iconBuilder.read(),
      disabled: !checkHasAuthority(
        accessWayCollection.workflowCase.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.showFormDrawer(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'forceEnd',
          icon: iconBuilder.stop(),
          text: '强制结束',
          hidden: !checkHasAuthority(
            accessWayCollection.workflowCase.forceEnd.permission,
          ),
          disabled: !checkInCollection(
            [
              flowCaseStatusCollection.submitApproval,
              flowCaseStatusCollection.inApprovalProcess,
            ],
            status,
          ),
          confirm: true,
          title: '将要强制结束审批（即该次审批作废），确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'disuse',
          icon: iconBuilder.clear(),
          text: '审批作废',
          disabled: !checkInCollection(
            [flowCaseStatusCollection.success],
            status,
          ),
          hidden: !checkHasAuthority(
            accessWayCollection.workflowCase.forceEnd.permission,
          ),
          confirm: true,
          title: '将要设置该次审批作废，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'hide',
          icon: iconBuilder.delete(),
          text: '移除审批',
          disabled: !checkInCollection(
            [
              flowCaseStatusCollection.created,
              flowCaseStatusCollection.refuse,
              flowCaseStatusCollection.forcedEnd,
              flowCaseStatusCollection.disuse,
            ],
            status,
          ),
          hidden: !checkHasAuthority(
            accessWayCollection.workflowCase.hide.permission,
          ),
          confirm: true,
          title: '将要移除目标审批，确定吗？',
        },
      ],
    };
  };

  getAdditionalColumnWrapper = () => [
    {
      dataTarget: fieldData.nextApproveWorkflowNodeName,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
  ];

  getColumnWrapper = () => {
    return [
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
      ...this.getAdditionalColumnWrapper(),
      {
        dataTarget: fieldData.subsidiaryShortName,
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
        dataTarget: fieldData.lastSubmitApprovalTime,
        width: 160,
        showRichFacade: true,
        facadeMode: columnFacadeMode.datetime,
      },
    ];
  };

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <FormDrawer
          maskClosable
          showIndependentPrint
          externalData={currentRecord}
        />

        <OperateLogDrawer externalData={currentRecord} maskClosable />
      </>
    );
  };
}

export default PageList;
