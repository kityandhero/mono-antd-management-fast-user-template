/* eslint-disable no-unused-vars */
import { Checkbox, Divider } from 'antd';

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
  flowNodeApproveModeCollection,
  flowNodeTypeCollection,
} from '../../../../customConfig';
import {
  renderFormFlowBranchConditionItemTargetComparisonModeSelect,
  renderFormFlowBranchConditionItemTargetTypeSelect,
} from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { BaseFlowCaseProcessHistoryPassModal } from '../../../../pageBases/general';
import {
  getNextNextNodeApproverAndWorkflowNodeAction,
  singleListNextNodeApproverAction,
} from '../../../../pageBases/general/WorkflowCase/Assist/action';
import { singleListAction } from '../../GeneralDiscourse/Assist/action';
import { typeCollection } from '../../GeneralDiscourse/Common/data';
import { fieldData as fieldDataUser } from '../../User/Common/data';
import { fieldData as fieldDataWorkflowCase } from '../../WorkflowCaseMadeByMe/Common/data';
import { fieldData as fieldDataWorkflowFormDesign } from '../../WorkflowFormDesign/Common/data';
import { singleListApproverUserWithNodeAndFlowCaseAction } from '../../WorkflowNodeApprover/Assist/action';
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
      nextNodeSkip: whetherNumber.no,
      nextNextNextApproveWorkflowNode: null,
      nextNextNextNodeApproverUserList: [],
    };
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.loadGeneralDiscourseList();
    this.reloadNextNodeApproverList();
  };

  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.setState({
      nextNodeApproverUserList: [],
      nextNodeSkip: whetherNumber.no,
      nextNextNextApproveWorkflowNode: null,
      nextNextNextNodeApproverUserList: [],
    });
  };

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

  checkHasGetNextNextNodeApproverAndWorkflowNodeAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowCase.getNextNextNodeApproverAndWorkflowNode
        .permission,
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

  loadNextNextNodeApproverAndWorkflowNode = () => {
    const { externalData } = this.props;

    const d = {};

    d[this.getFlowCaseIdName()] = this.getFlowCaseId(externalData);

    getNextNextNodeApproverAndWorkflowNodeAction({
      target: this,
      handleData: {
        ...d,
      },
      successCallback: ({ target, remoteData }) => {
        const { listUser, workflowNode } = remoteData;

        if (
          isArray(listUser) &&
          !isEmptyArray(listUser) &&
          listUser.length === 1
        ) {
          const firstData = listUser[0];

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

          target.nextNextWorkflowNodeApproverUserId = userId;
          target.nextNextWorkflowNodeApproverUserRealName = friendlyName;
        }

        target.setState({
          nextNextNextNodeApproverUserList: [...listUser],
          nextNextNextApproveWorkflowNode: workflowNode,
        });
      },
    });
  };

  supplementSubmitRequestParams = (o) => {
    const d = { ...o };
    const { nextNodeSkip } = this.state;
    const { externalData } = this.props;

    d[fieldDataFlowCaseProcessHistory.flowCaseId.name] =
      this.getFlowCaseId(externalData);

    d[fieldDataFlowCaseProcessHistory.approveUserId.name] =
      this.approveUserId ?? '';

    let nextWorkflowNodeApproverUserIdCollection = [];

    if (nextNodeSkip === whetherNumber.yes) {
      nextWorkflowNodeApproverUserIdCollection = checkStringIsNullOrWhiteSpace(
        this.nextNextWorkflowNodeApproverUserId ?? '',
      )
        ? []
        : [this.nextNextWorkflowNodeApproverUserId];
    } else {
      nextWorkflowNodeApproverUserIdCollection = checkStringIsNullOrWhiteSpace(
        this.nextWorkflowNodeApproverUserId ?? '',
      )
        ? []
        : [this.nextWorkflowNodeApproverUserId];
    }

    d.nextWorkflowNodeApproverUserIdCollection =
      nextWorkflowNodeApproverUserIdCollection.join(',');

    d.whetherSkipNextProcess = nextNodeSkip;

    delete d[this.approveUserName];
    delete d[this.nextNodeApproverUserName];

    if (nextNodeSkip === whetherNumber.yes) {
      delete d[this.nextNextNodeApproverUserName];
    }

    delete d[this.generalDiscourseName];

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  onNextNextNodeApproverChange = (v, option) => {
    this.nextNextWorkflowNodeApproverUserId = v;
  };

  onSkipNextChange = ({ target }) => {
    const { checked } = target;

    console.log(target);

    this.setState({
      nextNodeSkip: checked ? whetherNumber.yes : whetherNumber.no,
    });
  };

  establishNextNodeApproverUserViewConfig = () => {
    const { nextNodeApproverUserList, nextNodeSkip, metaData } = this.state;

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

    const nextNextApproveWorkflowNodeWhetherOneSignatureAllowSkip =
      getValueByKey({
        data: nextNextApproveWorkflowNode,
        key: fieldDataFlowNode.whetherOneSignatureAllowSkip.name,
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
            addonAfter:
              nextNextApproveWorkflowNodeWhetherOneSignatureAllowSkip ===
              whetherNumber.yes ? (
                <Checkbox
                  defaultChecked={nextNodeSkip === whetherNumber.yes}
                  onChange={this.onSkipNextChange}
                >
                  跳过审批
                </Checkbox>
              ) : null,
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
            innerProps: {
              disabled: nextNodeSkip === whetherNumber.yes,
            },
            addonAfter: (
              <>
                {buildButton({
                  text: '',
                  icon: iconBuilder.reload(),
                  disabled: nextNodeSkip === whetherNumber.yes,
                  handleClick: () => {
                    this.reloadNextNodeApproverList();
                  },
                })}

                {nextNextApproveWorkflowNodeWhetherOneSignatureAllowSkip ===
                whetherNumber.yes ? (
                  <Checkbox
                    defaultChecked={nextNodeSkip === whetherNumber.yes}
                    onChange={this.onSkipNextChange}
                  >
                    跳过审批
                  </Checkbox>
                ) : null}
              </>
            ),
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

  establishNextNextNodeApproverUserViewConfig = () => {
    const {
      nextNextNextNodeApproverUserList,
      nextNextNextApproveWorkflowNode,
      nextNodeSkip,
      metaData,
    } = this.state;

    const debugApproverMode = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.debugApproverMode.name,
      convert: convertCollection.number,
    });

    let list = [];

    if (!nextNodeSkip) {
      return list;
    }

    const nextApproveWorkflowNodeWhetherFinalApprovalNode =
      getValueByKey({
        data: nextNextNextApproveWorkflowNode,
        key: fieldDataFlowNode.type.name,
        convert: convertCollection.number,
      }) === flowNodeTypeCollection.endNode
        ? whetherNumber.yes
        : whetherNumber.no;

    const nextNextNextApproveWorkflowNodeApproveMode = getValueByKey({
      data: nextNextNextApproveWorkflowNode,
      key: fieldDataFlowNode.approveMode.name,
      convert: convertCollection.number,
    });

    const nextNextNextApproveWorkflowNodeWhetherOneSignatureDesignateNextApprover =
      getValueByKey({
        data: nextNextNextApproveWorkflowNode,
        key: fieldDataFlowNode.whetherOneSignatureDesignateNextApprover.name,
        convert: convertCollection.number,
      });

    if (
      nextNextNextApproveWorkflowNodeApproveMode ===
      flowNodeApproveModeCollection.oneSignature
    ) {
      if (
        nextApproveWorkflowNodeWhetherFinalApprovalNode === whetherNumber.no &&
        nextNextNextApproveWorkflowNodeWhetherOneSignatureDesignateNextApprover ===
          whetherNumber.yes
      ) {
        list = [
          ...list,
          {
            lg: 24,
            type: cardConfig.contentItemType.onlyShowInput,
            fieldData: {
              label: '下下步审批人',
              name: this.nextNextNodeApproverUserName,
              helper: '',
            },
            value: this.nextNextWorkflowNodeApproverUserRealName,
            hidden:
              nextNextNextNodeApproverUserList.length !== 1 ||
              !this.checkHasGetNextNextNodeApproverAndWorkflowNodeAuthority(),
            require: true,
          },
          {
            lg: 24,
            type: cardConfig.contentItemType.select,
            fieldData: {
              label: '下下步审批人',
              name: this.nextNextNodeApproverUserName,
              helper: '',
            },
            listData: nextNextNextNodeApproverUserList,
            dataConvert: dataFormFieldApproverConvert,
            onChange: this.onNextNextNodeApproverChange,
            addonAfter: buildButton({
              text: '',
              icon: iconBuilder.reload(),
              handleClick: () => {
                this.reloadNextNextNodeApproverAndWorkflowNode();
              },
            }),
            hidden:
              nextNextNextNodeApproverUserList.length <= 1 ||
              !this.checkHasGetNextNextNodeApproverAndWorkflowNodeAuthority(),
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
