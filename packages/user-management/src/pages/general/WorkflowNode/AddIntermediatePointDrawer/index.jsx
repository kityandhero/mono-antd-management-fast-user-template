import { connect } from 'easy-soft-dva';
import {
  checkInCollection,
  filter,
  toNumber,
  toString,
  whetherString,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { FunctionSupplement } from 'antd-management-fast-component';
import { switchControlAssist } from 'antd-management-fast-framework';

import {
  flowNodeApproveModeCollection,
  flowNodeApproverModeCollection,
} from '../../../../customConfig';
import {
  getFlowNodeApproveModeName,
  renderFormFlowNodeApproveModeSelect,
  renderFormFlowNodeApproverModeSelect,
} from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { BaseAddPointDrawer } from '../BaseAddPointDrawer';
import { fieldData } from '../Common/data';

const {
  Whether: { getWhetherName },
} = FunctionSupplement;

const visibleFlag = '5b915cb3dd214380b250154709563a7c';

@connect(({ workflowNode, schedulingControl }) => ({
  workflowNode,
  schedulingControl,
}))
class AddIntermediatePointDrawer extends BaseAddPointDrawer {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  // showCallProcess = true;

  currentApproveMode = toString(
    flowNodeApproverModeCollection.directlyAffiliatedDepartment,
  );

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增过程点',
      submitApiPath:
        modelTypeCollection.workflowNodeTypeCollection.addIntermediatePoint,
      approveModeSelectable: true,
      currentApproveMode: flowNodeApproveModeCollection.oneSignature,
    };
  }

  adjustApproverModeListData = (list) => {
    const listAdjust = filter(list, (one) => {
      const { flag } = one;

      return checkInCollection(
        [
          toString(flowNodeApproverModeCollection.designated),
          toString(flowNodeApproverModeCollection.directlyAffiliatedDepartment),
        ],
        toString(flag),
      );
    });

    return listAdjust;
  };

  // eslint-disable-next-line no-unused-vars
  onApproverModeChange = (v, option) => {
    const data = {};

    const approveModeData = {};

    if (toString(v) !== toString(flowNodeApproverModeCollection.designated)) {
      data[fieldData.approveMode.name] = toString(
        flowNodeApproveModeCollection.oneSignature,
      );
      data[fieldData.whetherOneSignatureDesignateNextApprover.name] =
        whetherString.yes;

      approveModeData.currentApproveMode =
        flowNodeApproveModeCollection.oneSignature;
    }

    this.setFormFieldsValue(data);

    this.setState({
      ...approveModeData,
      approveModeSelectable:
        toString(v) === toString(flowNodeApproverModeCollection.designated),
    });
  };

  // eslint-disable-next-line no-unused-vars
  onApproveModeChange = (v, option) => {
    this.setState({
      currentApproveMode: toNumber(v),
    });
  };

  fillDefaultInitialValues = () => {
    const initialValues = {};

    initialValues[fieldData.approverMode.name] = toString(
      flowNodeApproverModeCollection.designated,
    );

    initialValues[fieldData.approveMode.name] = toString(
      flowNodeApproveModeCollection.oneSignature,
    );

    initialValues[fieldData.whetherOneSignatureDesignateNextApprover.name] =
      whetherString.yes;

    initialValues[fieldData.whetherCounterSignatureInSequence.name] =
      whetherString.yes;

    return initialValues;
  };

  establishCustomExtraViewConfig = () => {
    const { currentApproveMode, approveModeSelectable } = this.state;

    const that = this;

    return [
      {
        lg: 12,
        type: cardConfig.contentItemType.component,
        component: renderFormFlowNodeApproverModeSelect({
          adjustListData: that.adjustApproverModeListData,
          onChange: this.onApproverModeChange,
        }),
        require: true,
      },
      {
        lg: 12,
        type: cardConfig.contentItemType.component,
        component: renderFormFlowNodeApproveModeSelect({
          onChange: this.onApproveModeChange,
        }),
        require: true,
        hidden: !approveModeSelectable,
      },
      {
        lg: 12,
        type: cardConfig.contentItemType.onlyShowInput,
        fieldData: fieldData.approveMode,
        value: getFlowNodeApproveModeName({
          value: toString(flowNodeApproveModeCollection.oneSignature),
        }),
        require: true,
        hidden: approveModeSelectable,
      },
      {
        lg: 12,
        type: cardConfig.contentItemType.whetherSelect,
        fieldData: fieldData.whetherOneSignatureDesignateNextApprover,
        require: true,
        hidden:
          !approveModeSelectable ||
          currentApproveMode !== flowNodeApproveModeCollection.oneSignature,
      },
      {
        lg: 12,
        type: cardConfig.contentItemType.onlyShowInput,
        fieldData: fieldData.whetherOneSignatureDesignateNextApprover,
        value: getWhetherName({
          value: whetherString.yes,
        }),
        require: true,
        hidden:
          approveModeSelectable ||
          currentApproveMode !== flowNodeApproveModeCollection.oneSignature,
      },
      {
        lg: 12,
        type: cardConfig.contentItemType.whetherSelect,
        fieldData: fieldData.whetherCounterSignatureInSequence,
        require: true,
        hidden:
          currentApproveMode !== flowNodeApproveModeCollection.counterSignature,
      },
      {
        lg: 12,
        type: cardConfig.contentItemType.onlyShowInput,
        fieldData: fieldData.typeNote,
        value: '过程点',
      },
    ];
  };

  renderPresetTitle = () => {
    return '新增流程点';
  };
}

export { AddIntermediatePointDrawer };
