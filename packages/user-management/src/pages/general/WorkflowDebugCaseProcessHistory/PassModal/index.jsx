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
  logConsole,
  toString,
  whetherNumber,
  zeroString,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import {
  accessWayCollection,
  fieldDataFlowCase,
  fieldDataFlowCaseProcessHistory,
  fieldDataFlowNode,
  flowBranchConditionItemTargetComparisonModelCollection,
  flowBranchConditionItemTargetTypeCollection,
  flowDebugApproverModeCollection,
  flowNodeApproveModeCollection,
} from '../../../../customConfig';
import {
  renderFormFlowBranchConditionItemTargetComparisonModeSelect,
  renderFormFlowBranchConditionItemTargetTypeSelect,
} from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { BaseFlowCaseProcessHistoryPassModal } from '../../../pageBases';
import { fieldData as fieldDataUser } from '../../User/Common/data';
import { singleListNextNodeApproverAction } from '../../WorkflowDebugCase/Assist/action';
import { fieldData as fieldDataWorkflowDebugCase } from '../../WorkflowDebugCase/Common/data';
import { singleListApproverUserWithNodeAndFlowCaseAction } from '../../WorkflowNodeApprover/Assist/action';

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

const visibleFlag = '0d408de6b51f4cc6baf614c1630127b6';

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
class PassModal extends BaseFlowCaseProcessHistoryPassModal {
  approveUserId = '';

  approveUserRealName = '';

  approveUserName = '2fcc037383244eeb81d6c71053a79601';

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.workflowDebugCaseTypeCollection.get,
      submitApiPath:
        modelTypeCollection.workflowDebugCaseProcessHistoryTypeCollection.pass,
      approverList: [],
      nextNodeApproverUserList: [],
    };
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.loadGeneralDiscourseList();
    this.loadApproverUserWithNodeAndFlowCaseList();
    this.reloadNextNodeApproverList();
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

  checkHasSingleListNextNodeApproverAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowDebugCase.singleListNextNodeApprover
        .permission,
    );
  };

  loadNextNodeApproverList = () => {
    const { externalData } = this.props;

    const debugApproverMode = getValueByKey({
      data: externalData,
      key: fieldDataFlowCase.debugApproverMode.name,
      convert: convertCollection.number,
    });

    if (debugApproverMode === flowDebugApproverModeCollection.globalDebugUser) {
      this.nextWorkflowNodeApproverUserId = getValueByKey({
        data: externalData,
        key: fieldDataFlowCase.flowDebugUserId.name,
        convert: convertCollection.string,
      });

      this.nextWorkflowNodeApproverUserRealName = getValueByKey({
        data: externalData,
        key: fieldDataFlowCase.flowDebugUserRealName.name,
        convert: convertCollection.string,
      });
    }

    const d = {};

    d[this.getFlowCaseIdName()] = this.getFlowCaseId(externalData);

    singleListNextNodeApproverAction({
      target: this,
      handleData: {
        ...d,
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

          target.nextWorkflowNodeApproverUserId = userId;
          target.nextWorkflowNodeApproverUserRealName = friendlyName;
        }

        target.setState({
          nextNodeApproverUserList: [...remoteListData],
        });
      },
    });
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

    const nextWorkflowNodeApproverUserIdCollection =
      checkStringIsNullOrWhiteSpace(this.nextWorkflowNodeApproverUserId ?? '')
        ? []
        : [this.nextWorkflowNodeApproverUserId];

    d.nextWorkflowNodeApproverUserIdCollection =
      nextWorkflowNodeApproverUserIdCollection.join(',');

    delete d[this.approveUserName];
    delete d[this.nextNodeApproverUserName];
    delete d[this.generalDiscourseName];

    return d;
  };

  onApproverChange = (v, option) => {
    this.approveUserId = v;
  };

  establishNextNodeApproverUserViewConfig = () => {
    const { approverList, nextNodeApproverUserList, metaData } = this.state;

    const debugApproverMode = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.debugApproverMode.name,
      convert: convertCollection.number,
    });

    let list = [
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

    const nextApproveWorkflowNode = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.nextApproveWorkflowNode.name,
    });

    const nextNextApproveWorkflowNode = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.nextNextApproveWorkflowNode.name,
    });

    const nextApproveWorkflowNodeWhetherFinalApprovalNode = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.nextApproveWorkflowNodeWhetherFinalApprovalNode
        .name,
      convert: convertCollection.number,
    });

    const nextNextApproveWorkflowNodeApproveMode = getValueByKey({
      data: nextNextApproveWorkflowNode,
      key: fieldDataFlowNode.approveMode.name,
      convert: convertCollection.number,
    });

    const nextNextApproveWorkflowNodeWhetherOneSignatureDesignateNextApprover =
      getValueByKey({
        data: nextNextApproveWorkflowNode,
        key: fieldDataFlowNode.whetherOneSignatureDesignateNextApprover.name,
        convert: convertCollection.number,
      });

    if (
      nextNextApproveWorkflowNodeApproveMode ===
      flowNodeApproveModeCollection.oneSignature
    ) {
      if (
        nextApproveWorkflowNodeWhetherFinalApprovalNode === whetherNumber.no &&
        nextNextApproveWorkflowNodeWhetherOneSignatureDesignateNextApprover ===
          whetherNumber.yes
      ) {
        list = [
          ...list,
          {
            lg: 24,
            type: cardConfig.contentItemType.onlyShowInput,
            fieldData: {
              label: '下步审批人',
              name: this.nextNodeApproverUserName,
              helper: '',
            },
            value: this.nextWorkflowNodeApproverUserRealName,
            hidden:
              (debugApproverMode ===
                flowDebugApproverModeCollection.flowConfiguration &&
                nextNodeApproverUserList.length !== 1) ||
              !checkHasAuthority(
                accessWayCollection.workflowNodeApprover.singleList.permission,
              ),
            require: true,
          },
          {
            lg: 24,
            type: cardConfig.contentItemType.select,
            fieldData: {
              label: '下步审批人',
              name: this.nextNodeApproverUserName,
              helper: '',
            },
            listData: nextNodeApproverUserList,
            dataConvert: dataFormFieldApproverConvert,
            onChange: this.onNextNodeApproverChange,
            addonAfter: buildButton({
              text: '',
              icon: iconBuilder.reload(),
              handleClick: () => {
                this.reloadNextNodeApproverList();
              },
            }),
            hidden:
              debugApproverMode ===
                flowDebugApproverModeCollection.globalDebugUser ||
              (debugApproverMode ===
                flowDebugApproverModeCollection.flowConfiguration &&
                nextNodeApproverUserList.length <= 1) ||
              !this.checkHasSingleListNextNodeApproverAuthority(),
            require: true,
          },
        ];
      }
    } else {
      // ignore
    }

    return list;
  };
}

export { PassModal };
