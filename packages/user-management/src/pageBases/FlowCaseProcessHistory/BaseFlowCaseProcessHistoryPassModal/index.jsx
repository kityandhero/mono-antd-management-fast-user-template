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
} from '../../../customConfig';
import {
  renderFormFlowBranchConditionItemTargetComparisonModeSelect,
  renderFormFlowBranchConditionItemTargetTypeSelect,
} from '../../../customSpecialComponents';
import { singleListAction } from '../../../pages/GeneralDiscourse/Assist/action';
import { typeCollection } from '../../../pages/GeneralDiscourse/Common/data';
import { fieldData as fieldDataUser } from '../../../pages/User/Common/data';
import { singleListNextNodeApproverAction } from '../../../pages/WorkflowDebugCase/Assist/action';
import { singleListApproverUserWithNodeAndFlowCaseAction } from '../../../pages/WorkflowNodeApprover/Assist/action';

const { BaseUpdateModal } = DataModal;

// eslint-disable-next-line no-unused-vars
function dataFormFieldGeneralDiscourseConvert(o, index) {
  const { content, key } = o;

  return {
    label: content,
    value: key,
    disabled: false,
    ...o,
  };
}

class BaseFlowCaseProcessHistoryPassModal extends BaseUpdateModal {
  nextWorkflowNodeApproverUserId = '';

  nextWorkflowNodeApproverUserRealName = '';

  nextNodeApproverUserName = '17158fea9dbc42d4abbe967cdc099ba1';

  generalDiscourseName = '991d90f0881b4e14909c7e8f270e593f';

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      width: 640,
      pageTitle: '同意审批',
      loadApiPath: '',
      submitApiPath: '',
      generalDiscourseList: [],
    };
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.loadGeneralDiscourseList();
    this.reloadNextNodeApproverList();
  };

  // eslint-disable-next-line no-unused-vars
  getFlowCaseId = (o) => {
    throw new Error('getFlowCaseId need overrode to implement');
  };

  getFlowCaseIdName = () => {
    throw new Error('getFlowCaseIdName need overrode to implement');
  };

  checkHasSingleListNextNodeApproverAuthority = () => {
    throw new Error(
      'checkHasSingleListNextNodeApproverAuthority need overrode to implement, need return boolean',
    );
  };

  supplementLoadRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.props;

    d[this.getFlowCaseIdName()] = this.getFlowCaseId(externalData);

    return d;
  };

  loadGeneralDiscourseList = () => {
    const { externalData } = this.props;

    singleListAction({
      target: this,
      handleData: {
        type: typeCollection.workflow,
      },
      successCallback: ({ target, remoteListData }) => {
        target.setState({
          generalDiscourseList: remoteListData,
        });
      },
    });
  };

  reloadGeneralDiscourseList = () => {
    this.loadGeneralDiscourseList();
  };

  loadNextNodeApproverList = () => {
    throw new Error(
      'loadNextNodeApproverList need overrode to implement, need return boolean',
    );
  };

  reloadNextNodeApproverList = () => {
    this.loadNextNodeApproverList();
  };

  onGeneralDiscourseChange = (v, option) => {
    const { content } = option;

    if (!checkStringIsNullOrWhiteSpace(content)) {
      const data = {};

      data[fieldDataFlowCaseProcessHistory.note.name] = content;
      data[this.generalDiscourseName] = null;

      this.setFormFieldsValue(data);
    }
  };

  onNextNodeApproverChange = (v, option) => {
    this.nextWorkflowNodeApproverUserId = v;
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.title.name,
    });
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        flex: '100px',
      },
      wrapperCol: {
        flex: 'auto',
      },
    };
  };

  fillInitialValuesAfterLoad = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    return values;
  };

  establishNextNodeApproverUserViewConfig = () => {
    return [];
  };

  establishCardCollectionConfig = () => {
    const { metaData, generalDiscourseList } = this.state;

    const debugApproverMode = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.debugApproverMode.name,
      convert: convertCollection.number,
    });

    const nextApproveWorkflowNode = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.nextApproveWorkflowNode.name,
    });

    const nextApproveWorkflowNodeName = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.nextApproveWorkflowNodeName.name,
      convert: convertCollection.string,
    });

    const nextApproveWorkflowNodeApproveMode = getValueByKey({
      data: nextApproveWorkflowNode,
      key: fieldDataFlowNode.approveMode.name,
      convert: convertCollection.number,
    });

    let approveMode = '';

    if (metaData != null) {
      switch (nextApproveWorkflowNodeApproveMode) {
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
                ...fieldDataFlowCase.nextApproveWorkflowNodeName,
                label: '当前节点',
              },
              value: `${approveMode}${nextApproveWorkflowNodeName}`,
            },
            ...this.establishNextNodeApproverUserViewConfig(),
            {
              lg: 24,
              type: cardConfig.contentItemType.select,
              fieldData: {
                label: '快捷常用语',
                name: this.generalDiscourseName,
                helper: '',
              },
              listData: generalDiscourseList,
              dataConvert: dataFormFieldGeneralDiscourseConvert,
              onChange: this.onGeneralDiscourseChange,
              addonAfter: buildButton({
                text: '',
                icon: iconBuilder.reload(),
                handleClick: () => {
                  this.reloadGeneralDiscourseList();
                },
              }),
              hidden: !checkHasAuthority(
                accessWayCollection.generalDiscourse.singleList.permission,
              ),
              require: false,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldDataFlowCaseProcessHistory.note,
              require: true,
            },
          ],
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '审批人为当前审批节点的操作人。',
        },
        {
          text: '下步审批人为指定的当前审批节点下一节点的审批人',
        },
        {
          text: '测试环境当前审批人选择列表将加载节点配置的全部审批人, 若选择了上一审批中未指定的审批人, 则审批会发生错误, 受限于交互，此情况为特意设置，目的是为了检测选择了不应选择的当前审批人的状况',
        },
        {
          text: '选择常用语可以快速填充审批意见。',
        },
      ],
    };
  };
}

export { BaseFlowCaseProcessHistoryPassModal };
