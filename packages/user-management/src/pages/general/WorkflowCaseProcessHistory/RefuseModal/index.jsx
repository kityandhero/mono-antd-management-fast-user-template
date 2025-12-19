/* eslint-disable no-unused-vars */
import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  filter,
  getValueByKey,
  toString,
  zeroString,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import {
  accessWayCollection,
  flowBranchConditionItemTargetComparisonModelCollection,
  flowBranchConditionItemTargetTypeCollection,
} from '../../../../customConfig';
import {
  renderFormFlowBranchConditionItemTargetComparisonModeSelect,
  renderFormFlowBranchConditionItemTargetTypeSelect,
} from '../../../../customSpecialComponents';
import { singleListAction } from '../../GeneralDiscourse/Assist/action';
import { typeCollection } from '../../GeneralDiscourse/Common/data';
import { fieldData as fieldDataWorkflowCase } from '../../WorkflowCaseMadeByMe/Common/data';
import { fieldData as fieldDataWorkflowFormDesign } from '../../WorkflowFormDesign/Common/data';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

// eslint-disable-next-line no-unused-vars
function dataFormFieldConvert(o, index) {
  const { content, generalDiscourseId } = o;

  return {
    label: content,
    value: generalDiscourseId,
    disabled: false,
    ...o,
  };
}

const generalDiscourseName = '';

const visibleFlag = '676cbfed43564b3da626b2378e4d4d90';

@connect(({ workflowCaseProcessHistory, schedulingControl }) => ({
  workflowCaseProcessHistory,
  schedulingControl,
}))
class RefuseModal extends BaseUpdateModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '拒绝审批',
      loadApiPath: 'workflowCase/get',
      submitApiPath: 'workflowCaseProcessHistory/refuse',
      generalDiscourseList: [],
    };
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.loadGeneralDiscourseList();
  };

  supplementLoadRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.props;

    d[fieldDataWorkflowCase.workflowCaseId.name] = getValueByKey({
      data: externalData,
      key: fieldDataWorkflowCase.workflowCaseId.name,
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.props;

    d[fieldData.flowCaseId.name] = getValueByKey({
      data: externalData,
      key: fieldDataWorkflowCase.workflowCaseId.name,
    });

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

  onGeneralDiscourseChange = (v, option) => {
    const { content } = option;

    if (!checkStringIsNullOrWhiteSpace(content)) {
      const data = {};

      data[fieldData.note.name] = content;
      data[generalDiscourseName] = null;

      this.setFormFieldsValue(data);
    }
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.title.name,
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

  establishCardCollectionConfig = () => {
    const { generalDiscourseList } = this.state;

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
              type: cardConfig.contentItemType.select,
              fieldData: {
                label: '快捷常用语',
                name: generalDiscourseName,
                helper: '',
              },
              listData: generalDiscourseList,
              dataConvert: dataFormFieldConvert,
              onChange: this.onGeneralDiscourseChange,
              addonAfter: buildButton({
                text: '',
                icon: iconBuilder.reload(),
                handleClick: () => {
                  this.reloadGeneralDiscourseList();
                },
              }),
              require: false,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.note,
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
          text: '选择常用语可以快速填充审批意见。',
        },
      ],
    };
  };
}

export { RefuseModal };
