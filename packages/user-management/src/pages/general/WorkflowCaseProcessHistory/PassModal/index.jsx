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
import { singleListNextNodeApproverAction } from '../../../pageBases/WorkflowCase/Assist/action';
import { singleListAction } from '../../GeneralDiscourse/Assist/action';
import { typeCollection } from '../../GeneralDiscourse/Common/data';
import { fieldData as fieldDataUser } from '../../User/Common/data';
import { fieldData as fieldDataWorkflowCase } from '../../WorkflowCaseMadeByMe/Common/data';
import { fieldData as fieldDataWorkflowFormDesign } from '../../WorkflowFormDesign/Common/data';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

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

const visibleFlag = 'a77db1cf951344a5993a7c4abe7f4f65';

@connect(({ workflowCaseProcessHistory, schedulingControl }) => ({
  workflowCaseProcessHistory,
  schedulingControl,
}))
class PassModal extends BaseFlowCaseProcessHistoryPassModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '同意审批',
      loadApiPath: modelTypeCollection.workflowCaseTypeCollection.get,
      submitApiPath:
        modelTypeCollection.workflowCaseProcessHistoryTypeCollection.pass,
      nextNodeApproverUserList: [],
    };
  }

  getFlowCaseId = (o) => {
    return getValueByKey({
      data: o,
      key: fieldDataWorkflowCase.workflowCaseId.name,
      defaultValue: '0',
    });
  };

  getFlowCaseIdName = () => {
    return fieldDataWorkflowCase.workflowCaseId.name;
  };

  checkHasSingleListNextNodeApproverAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowCase.singleListNextNodeApprover.permission,
    );
  };

  loadNextNodeApproverList = () => {
    const { externalData } = this.props;

    const d = {};

    d[this.getFlowCaseIdName()] = this.getFlowCaseId(externalData);

    singleListNextNodeApproverAction({
      target: this,
      handleData: {
        ...d,
      },
      successCallback: ({ target, remoteListData }) => {
        if (
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

  supplementSubmitRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.props;

    d[fieldDataFlowCaseProcessHistory.flowCaseId.name] =
      this.getFlowCaseId(externalData);

    const nextWorkflowNodeApproverUserIdCollection =
      checkStringIsNullOrWhiteSpace(this.nextWorkflowNodeApproverUserId ?? '')
        ? []
        : [this.nextWorkflowNodeApproverUserId];

    d.nextWorkflowNodeApproverUserIdCollection =
      nextWorkflowNodeApproverUserIdCollection.join(',');

    delete d[this.nextNodeApproverUserName];
    delete d[this.generalDiscourseName];

    return d;
  };

  establishNextNodeApproverUserViewConfig = () => {
    const { nextNodeApproverUserList, metaData } = this.state;

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

    let list = [];

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
              nextNodeApproverUserList.length !== 1 ||
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
              nextNodeApproverUserList.length <= 1 ||
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
