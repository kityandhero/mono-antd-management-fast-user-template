import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkStringIsNullOrWhiteSpace,
  getValueByKey,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import {
  accessWayCollection,
  flowStatusCollection,
} from '../../../../customConfig';
import { getFlowStatusName } from '../../../../customSpecialComponents';
import { addBasicInfoAction } from '../../../pageBases/WorkflowCase/Assist/action';
import { getFlowStatusBadge } from '../../../utils';
import { fieldData as fieldDataUser } from '../../User/Common/data';
import { fieldData as fieldDataWorkflowCaseMadeByMe } from '../../WorkflowCaseMadeByMe/Common/data';
import { fieldData } from '../Common/data';

const { MultiPageDrawer } = DataMultiPageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'c06b2e0747114a6ab358f628565b6be6';

@connect(({ workflow, workflowCase, schedulingControl }) => ({
  workflow,
  workflowCase,
  schedulingControl,
}))
class PageListCreateCaseDrawer extends MultiPageDrawer {
  reloadWhenShow = true;

  componentAuthority =
    accessWayCollection.workflow.pageListSelfBuild.permission;

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
      pageTitle: '创建自制流程实例',
      loadApiPath: 'workflow/pageListSelfBuild',
      tableScrollX: 920,
      newWorkflowCaseId: '',
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
    const d = { ...o };

    d[fieldData.status.name] = flowStatusCollection.enable;

    return d;
  };

  /**
   * 当可见性变为隐藏后附加的执行
   */
  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    const { newWorkflowCaseId } = this.state;

    if (checkStringIsNullOrWhiteSpace(newWorkflowCaseId)) {
      return;
    }

    this.goToPath(
      `/flowCase/workflowCaseMadeByMe/edit/load/${newWorkflowCaseId}/key/basicInfo`,
    );
  };

  create = (r) => {
    const { externalData } = this.props;

    const userId = getValueByKey({
      data: externalData,
      key: fieldDataUser.userId.name,
    });

    const workflowId = getValueByKey({
      data: r,
      key: fieldData.workflowId.name,
    });

    addBasicInfoAction({
      target: this,
      handleData: {
        userId: userId || 0,
        workflowId: workflowId || 0,
      },
      successCallback: ({ target, remoteData }) => {
        const workflowCaseId = getValueByKey({
          data: remoteData,
          key: fieldDataWorkflowCaseMadeByMe.workflowCaseId.name,
        });

        target.setState({ newWorkflowCaseId: workflowCaseId }, () => {
          PageListCreateCaseDrawer.close();
        });
      },
    });
  };

  renderPresetTitleIcon = () => null;

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 8,
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

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      icon: iconBuilder.addCircle(),
      text: '发起审批',
      disabled: !checkHasAuthority(
        accessWayCollection.workflowCase.addBasicInfo.permission,
      ),
      handleButtonClick: () => {
        this.create(record);
      },
      confirm: true,
      title: '即将发起新的审批，创建后自动跳转详情，确定吗？',
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      align: 'left',
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
          status: getFlowStatusBadge(value),
          text: getFlowStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.workflowId,
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

export { PageListCreateCaseDrawer };
