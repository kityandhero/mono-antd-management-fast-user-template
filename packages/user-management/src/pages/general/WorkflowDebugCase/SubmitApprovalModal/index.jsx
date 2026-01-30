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
import { BaseFlowCaseSubmitApprovalModal } from '../../../../pageBases/general';
import { fieldData as fieldDataUser } from '../../User/Common/data';
import { singleListNextNodeApproverAction } from '../Assist/action';
import { fieldData as fieldDataWorkflowDebugCase } from '../Common/data';

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

const visibleFlag = '8d89719daadd42ec830239cc4081d1b2';

@connect(({ workflowDebugCase, schedulingControl }) => ({
  workflowDebugCase,
  schedulingControl,
}))
class SubmitApprovalModal extends BaseFlowCaseSubmitApprovalModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.workflowDebugCaseTypeCollection.get,
      submitApiPath:
        modelTypeCollection.workflowDebugCaseTypeCollection.submitApproval,
    };
  }

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

  establishCardCollectionConfig = () => {
    const { externalData, nextNodeApproverUserList, metaData } = this.state;

    const debugApproverMode = getValueByKey({
      data: externalData,
      key: fieldDataFlowCase.debugApproverMode.name,
      convert: convertCollection.number,
    });

    const firstApproveWorkflowNode = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.firstApproveWorkflowNode.name,
    });

    const firstApproveWorkflowNodeName = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.firstApproveWorkflowNodeName.name,
      defaultValue: '',
    });

    const firstApproveWorkflowNodeApproveMode = getValueByKey({
      data: firstApproveWorkflowNode,
      key: fieldDataFlowNode.approveMode.name,
      convert: convertCollection.number,
    });

    const firstApproveWorkflowNodeWhetherOneSignatureDesignateNextApprover =
      getValueByKey({
        data: firstApproveWorkflowNode,
        key: fieldDataFlowNode.whetherOneSignatureDesignateNextApprover.name,
        convert: convertCollection.number,
      });

    const firstApproveWorkflowNodeWhetherFinalApprovalNode = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.firstApproveWorkflowNodeWhetherFinalApprovalNode
        .name,
      convert: convertCollection.number,
    });

    let approveMode = '';

    if (metaData != null) {
      switch (firstApproveWorkflowNodeApproveMode) {
        case flowNodeApproveModeCollection.oneSignature: {
          approveMode = '【或签】';

          break;
        }

        case flowNodeApproveModeCollection.counterSignature: {
          approveMode = '【会签】';

          break;
        }

        default: {
          approveMode = '';

          break;
        }
      }
    }

    let list = [];

    logConsole({
      debugApproverMode,
      flowDebugApproverMode: flowDebugApproverModeCollection.globalDebugUser,
      v:
        debugApproverMode === flowDebugApproverModeCollection.globalDebugUser ||
        (debugApproverMode ===
          flowDebugApproverModeCollection.flowConfiguration &&
          nextNodeApproverUserList.length <= 1) ||
        !this.checkHasSingleListNextNodeApproverAuthority(),
    });

    if (
      firstApproveWorkflowNodeApproveMode ===
      flowNodeApproveModeCollection.oneSignature
    ) {
      if (
        firstApproveWorkflowNodeWhetherFinalApprovalNode === whetherNumber.no &&
        firstApproveWorkflowNodeWhetherOneSignatureDesignateNextApprover ===
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

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.onlyShowText,
              fieldData: {
                ...fieldDataFlowCase.firstApproveWorkflowNodeName,
                label: '首审批节点',
              },
              value: `${approveMode}${firstApproveWorkflowNodeName}`,
            },
            ...list,
          ],
        },
      ],
    };
  };
}

export { SubmitApprovalModal };
