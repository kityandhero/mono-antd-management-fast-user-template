/* eslint-disable no-unused-vars */
import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  filter,
  getValueByKey,
  isArray,
  isEmptyArray,
  toString,
  zeroString,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import {
  accessWayCollection,
  fieldDataFlowCase,
  fieldDataFlowCaseProcessHistory,
  flowBranchConditionItemTargetComparisonModelCollection,
  flowBranchConditionItemTargetTypeCollection,
  flowDebugApproverModeCollection,
} from '../../../../customConfig';
import {
  renderFormFlowBranchConditionItemTargetComparisonModeSelect,
  renderFormFlowBranchConditionItemTargetTypeSelect,
} from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { BaseFlowCaseProcessHistoryRefuseModal } from '../../../../pageBases/general';
import { singleListAction } from '../../GeneralDiscourse/Assist/action';
import { typeCollection } from '../../GeneralDiscourse/Common/data';
import { fieldData as fieldDataUser } from '../../User/Common/data';
import { fieldData as fieldDataWorkflowDebugCase } from '../../WorkflowDebugCase/Common/data';
import { fieldData as fieldDataWorkflowFormDesign } from '../../WorkflowFormDesign/Common/data';
import { singleListApproverUserWithNodeAndFlowCaseAction } from '../../WorkflowNodeApprover/Assist/action';
import { fieldData } from '../Common/data';

// eslint-disable-next-line no-unused-vars
function dataFormFieldApproverConvert(o, index) {
  const { friendlyName, userId } = o;

  return {
    label: friendlyName,
    value: userId,
    disabled: false,
    ...o,
  };
}

const visibleFlag = 'aa69ca05b3aa40819d03e998a673d073';

@connect(
  ({
    workflowDebugCaseProcessHistory,
    generalDiscourse,
    schedulingControl,
  }) => ({
    workflowDebugCaseProcessHistory,
    generalDiscourse,
    schedulingControl,
  }),
)
class RefuseModal extends BaseFlowCaseProcessHistoryRefuseModal {
  approveUserId = '';

  approveUserRealName = '';

  approveUserName = 'ff1e20b2ecd747509449655d3976cc29';

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.workflowDebugCaseTypeCollection.get,
      submitApiPath:
        modelTypeCollection.workflowDebugCaseProcessHistoryTypeCollection
          .refuse,
      approverList: [],
    };
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.loadGeneralDiscourseList();
    this.loadApproverUserWithNodeAndFlowCaseList();
  };

  getFlowCaseId = (o) => {
    return getValueByKey({
      data: o,
      key: fieldDataWorkflowDebugCase.workflowDebugCaseId.name,
      defaultValue: '0',
    });
  };

  getFlowCaseIdName = () => {
    return fieldDataWorkflowDebugCase.workflowDebugCaseId.name;
  };

  loadApproverUserWithNodeAndFlowCaseList = () => {
    const { externalData } = this.props;

    const debugApproverMode = getValueByKey({
      data: externalData,
      key: fieldDataFlowCase.debugApproverMode.name,
      convert: convertCollection.number,
    });

    if (debugApproverMode === flowDebugApproverModeCollection.globalDebugUser) {
      this.approveUserId = getValueByKey({
        data: externalData,
        key: fieldDataFlowCase.flowDebugUserId.name,
        convert: convertCollection.string,
      });

      this.approveUserRealName = getValueByKey({
        data: externalData,
        key: fieldDataFlowCase.flowDebugUserRealName.name,
        convert: convertCollection.string,
      });
    }

    singleListApproverUserWithNodeAndFlowCaseAction({
      target: this,
      handleData: {
        workflowNodeId: getValueByKey({
          data: externalData,
          key: fieldDataFlowCase.nextApproveWorkflowNodeId.name,
          defaultValue: '',
        }),
        flowCaseUserId: getValueByKey({
          data: externalData,
          key: fieldDataFlowCase.userId.name,
          defaultValue: '',
        }),
      },
      successCallback: ({ target, remoteListData }) => {
        if (
          debugApproverMode ===
            flowDebugApproverModeCollection.flowConfiguration &&
          isArray(remoteListData) &&
          !isEmptyArray(remoteListData) &&
          remoteListData.length === 1
        ) {
          const firstData = remoteListData[0];

          const userId = getValueByKey({
            data: firstData,
            key: fieldDataUser.userId.name,
            convert: convertCollection.string,
          });

          const friendlyName = getValueByKey({
            data: firstData,
            key: fieldDataUser.friendlyName.name,
            convert: convertCollection.string,
          });

          target.approveUserId = userId;
          target.approveUserRealName = friendlyName;
        }

        target.setState({
          approverList: [...remoteListData],
        });
      },
    });
  };

  reloadApproverUserWithNodeAndFlowCaseList = () => {
    this.loadApproverUserWithNodeAndFlowCaseList();
  };

  supplementSubmitRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.props;

    d[fieldDataFlowCaseProcessHistory.flowCaseId.name] =
      this.getFlowCaseId(externalData);

    d[fieldDataFlowCaseProcessHistory.approveUserId.name] =
      this.approveUserId ?? '';

    delete d[this.approveUserName];
    delete d[this.generalDiscourseName];

    return d;
  };

  onApproverChange = (v, option) => {
    this.approveUserId = v;
  };

  establishCustomExtraViewConfig = () => {
    const { externalData, approverList } = this.state;

    const debugApproverMode = getValueByKey({
      data: externalData,
      key: fieldDataFlowCase.debugApproverMode.name,
      convert: convertCollection.number,
    });

    return [
      {
        lg: 24,
        type: cardConfig.contentItemType.onlyShowInput,
        fieldData: {
          label: '当前审批人',
          name: this.approveUserName,
          helper: '',
        },
        value: this.approveUserRealName,
        hidden:
          (debugApproverMode ===
            flowDebugApproverModeCollection.flowConfiguration &&
            approverList.length !== 1) ||
          !checkHasAuthority(
            accessWayCollection.workflowNodeApprover.singleList.permission,
          ),
        require: true,
      },
      {
        lg: 24,
        type: cardConfig.contentItemType.select,
        fieldData: {
          label: '当前审批人',
          name: this.approveUserName,
          helper: '',
        },
        listData: approverList,
        dataConvert: dataFormFieldApproverConvert,
        onChange: this.onApproverChange,
        addonAfter: buildButton({
          text: '',
          icon: iconBuilder.reload(),
          handleClick: () => {
            this.reloadApproverUserWithNodeAndFlowCaseList();
          },
        }),
        hidden:
          debugApproverMode ===
            flowDebugApproverModeCollection.globalDebugUser ||
          (debugApproverMode ===
            flowDebugApproverModeCollection.flowConfiguration &&
            approverList.length === 1) ||
          !checkHasAuthority(
            accessWayCollection.workflowNodeApprover.singleList.permission,
          ),
        require: true,
      },
    ];
  };
}

export { RefuseModal };
