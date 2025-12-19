import { connect } from 'easy-soft-dva';
import { checkInCollection, filter, toString } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { switchControlAssist } from 'antd-management-fast-framework';

import { flowNodeApproverModeCollection } from '../../../../customConfig';
import { renderFormFlowNodeApproverModeSelect } from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { BaseAddPointDrawer } from '../BaseAddPointDrawer';
import { fieldData } from '../Common/data';

const visibleFlag = '39dcda85c912483f944d9efc6475afae';

@connect(({ workflowNode, schedulingControl }) => ({
  workflowNode,
  schedulingControl,
}))
class AddCarbonCopyPointDrawer extends BaseAddPointDrawer {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  // showCallProcess = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增抄送点',
      submitApiPath:
        modelTypeCollection.workflowNodeTypeCollection.addCarbonCopyPoint,
    };
  }

  adjustApproverModeListData = (list) => {
    const listAdjust = filter(list, (one) => {
      const { flag } = one;

      return checkInCollection(
        [toString(flowNodeApproverModeCollection.designated)],
        toString(flag),
      );
    });

    return listAdjust;
  };

  fillDefaultInitialValues = () => {
    const initialValues = {};

    initialValues[fieldData.approverMode.name] = toString(
      flowNodeApproverModeCollection.designated,
    );

    return initialValues;
  };

  establishCustomExtraViewConfig = () => {
    const that = this;

    return [
      {
        lg: 24,
        type: cardConfig.contentItemType.component,
        component: renderFormFlowNodeApproverModeSelect({
          label: '抄送人模式',
          adjustListData: that.adjustApproverModeListData,
        }),
        require: true,
      },
    ];
  };

  renderPresetTitle = () => {
    return '新增抄送点';
  };
}

export { AddCarbonCopyPointDrawer };
