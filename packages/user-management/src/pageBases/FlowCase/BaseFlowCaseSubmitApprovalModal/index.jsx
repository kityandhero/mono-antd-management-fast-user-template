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
} from '../../../customConfig';
import {
  renderFormFlowBranchConditionItemTargetComparisonModeSelect,
  renderFormFlowBranchConditionItemTargetTypeSelect,
} from '../../../customSpecialComponents';
import { singleListAction } from '../../../pages/general/GeneralDiscourse/Assist/action';
import { typeCollection } from '../../../pages/general/GeneralDiscourse/Common/data';
import { fieldData as fieldDataUser } from '../../../pages/general/User/Common/data';
import { singleListNextNodeApproverAction } from '../../../pages/general/WorkflowDebugCase/Assist/action';

const { BaseUpdateModal } = DataModal;

class BaseFlowCaseSubmitApprovalModal extends BaseUpdateModal {
  nextNodeApproverUserName = '34a4fdf96438429dbb84f0af08e65bc6';

  nextWorkflowNodeApproverUserId = '';

  nextWorkflowNodeApproverUserRealName = '';

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '提交审批',
      loadApiPath: '',
      submitApiPath: '',
      nextNodeApproverUserList: [],
    };
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
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

  supplementSubmitRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.props;

    d[this.getFlowCaseIdName()] = this.getFlowCaseId(externalData);

    const nextWorkflowNodeApproverUserIdCollection =
      checkStringIsNullOrWhiteSpace(this.nextWorkflowNodeApproverUserId ?? '')
        ? []
        : [this.nextWorkflowNodeApproverUserId];

    d.nextWorkflowNodeApproverUserIdCollection =
      nextWorkflowNodeApproverUserIdCollection.join(',');

    delete d[this.nextNodeApproverUserName];

    return d;
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
}

export { BaseFlowCaseSubmitApprovalModal };
