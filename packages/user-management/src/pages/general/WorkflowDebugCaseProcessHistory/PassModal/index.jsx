/* eslint-disable no-unused-vars */
import { Checkbox } from 'antd';

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
  flowNodeTypeCollection,
} from '../../../../customConfig';
import {
  renderFormFlowBranchConditionItemTargetComparisonModeSelect,
  renderFormFlowBranchConditionItemTargetTypeSelect,
} from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { BaseFlowCaseProcessHistoryPassModal } from '../../../../pageBases/general';
import { fieldData as fieldDataUser } from '../../User/Common/data';
import {
  getNextNextNodeApproverAndWorkflowNodeAction,
  singleListNextNodeApproverAction,
} from '../../WorkflowDebugCase/Assist/action';
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
      nextNodeSkip: whetherNumber.no,
      nextNextNextApproveWorkflowNode: null,
      nextNextNextNodeApproverUserList: [],
    };
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.loadGeneralDiscourseList();
    this.loadApproverUserWithNodeAndFlowCaseList();
    this.reloadNextNodeApproverList();
  };

  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.setState({
      approverList: [],
      nextNodeApproverUserList: [],
      nextNodeSkip: whetherNumber.no,
      nextNextNextApproveWorkflowNode: null,
      nextNextNextNodeApproverUserList: [],
    });
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

  checkHasGetNextNextNodeApproverAndWorkflowNodeAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowDebugCase
        .getNextNextNodeApproverAndWorkflowNode.permission,
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

  loadNextNextNodeApproverAndWorkflowNode = () => {
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

    getNextNextNodeApproverAndWorkflowNodeAction({
      target: this,
      handleData: {
        ...d,
      },
      successCallback: ({ target, remoteData }) => {
        const { listUser, workflowNode } = remoteData;

        if (
          debugApproverMode ===
            flowDebugApproverModeCollection.flowConfiguration &&
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
  onApproverChange = (v, option) => {
    this.approveUserId = v;
  };

  onSkipNextChange = ({ target }) => {
    const { checked } = target;

    console.log(target);

    this.setState({
      nextNodeSkip: checked ? whetherNumber.yes : whetherNumber.no,
    });
  };

  establishNextNodeApproverUserViewConfig = () => {
    const { approverList, nextNodeApproverUserList, nextNodeSkip, metaData } =
      this.state;

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
              !this.checkHasSingleListNextNodeApproverAuthority(),
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
              (debugApproverMode ===
                flowDebugApproverModeCollection.flowConfiguration &&
                nextNextNextNodeApproverUserList.length !== 1) ||
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
            onChange: this.onNextNodeApproverChange,
            addonAfter: buildButton({
              text: '',
              icon: iconBuilder.reload(),
              handleClick: () => {
                this.reloadNextNextNodeApproverAndWorkflowNode();
              },
            }),
            hidden:
              debugApproverMode ===
                flowDebugApproverModeCollection.globalDebugUser ||
              (debugApproverMode ===
                flowDebugApproverModeCollection.flowConfiguration &&
                nextNextNextNodeApproverUserList.length <= 1) ||
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
