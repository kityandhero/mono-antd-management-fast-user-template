import { connect } from 'easy-soft-dva';
import {
  checkInCollection,
  convertCollection,
  filter,
  formatCollection,
  getValueByKey,
  toNumber,
  toString,
  whetherString,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import {
  FunctionSupplement,
  iconBuilder,
} from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

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
import { fieldData } from '../Common/data';

const { BaseUpdateDrawer } = DataDrawer;
const {
  Whether: { getWhetherName },
} = FunctionSupplement;

const visibleFlag = 'ca86129cefb84023b637c17ccd1fd4ae';

@connect(({ workflowNode, schedulingControl }) => ({
  workflowNode,
  schedulingControl,
}))
class UpdateBasicInfoDrawer extends BaseUpdateDrawer {
  reloadWhenShow = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '编辑流程节点',
      loadApiPath: modelTypeCollection.workflowNodeTypeCollection.get,
      submitApiPath:
        modelTypeCollection.workflowNodeTypeCollection.updateBasicInfo,
      approveModeSelectable: false,
      currentApproveMode: flowNodeApproveModeCollection.oneSignature,
    };
  }

  supplementLoadRequestParams = (o) => {
    return {
      ...this.supplementRequestParams(o),
    };
  };

  supplementRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.state;

    d[fieldData.workflowNodeId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowNodeId.name,
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.workflowNodeId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowNodeId.name,
    });

    const approverMode = getValueByKey({
      data: o,
      key: fieldData.approverMode.name,
      convert: convertCollection.string,
      defaultValue: '',
    });

    if (approverMode != toString(flowNodeApproverModeCollection.designated)) {
      d[fieldData.approveMode.name] = toString(
        flowNodeApproveModeCollection.oneSignature,
      );
    }

    return d;
  };

  doOtherAfterLoadSuccess = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const approverMode = getValueByKey({
      data: metaData,
      key: fieldData.approverMode.name,
      defaultValue: '',
    });

    const approveMode = getValueByKey({
      data: metaData,
      key: fieldData.approveMode.name,
      defaultValue: '',
    });

    this.setState({
      currentApproveMode: toNumber(approveMode),
      approveModeSelectable:
        toString(approverMode) ===
        toString(flowNodeApproverModeCollection.designated),
    });
  };

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

  renderPresetTitle = () => {
    return '更新流程项';
  };

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    if (metaData != null) {
      values[fieldData.name.name] = getValueByKey({
        data: metaData,
        key: fieldData.name.name,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });

      values[fieldData.approverMode.name] = getValueByKey({
        data: metaData,
        key: fieldData.approverMode.name,
        convert: convertCollection.string,
      });

      values[fieldData.approveMode.name] = getValueByKey({
        data: metaData,
        key: fieldData.approveMode.name,
        convert: convertCollection.string,
      });

      values[fieldData.whetherOneSignatureDesignateNextApprover.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.whetherOneSignatureDesignateNextApprover.name,
          convert: convertCollection.string,
        });

      values[fieldData.whetherCounterSignatureInSequence.name] = getValueByKey({
        data: metaData,
        key: fieldData.whetherCounterSignatureInSequence.name,
        convert: convertCollection.string,
      });

      values[fieldData.whetherOneSignatureAllowSkip.name] = getValueByKey({
        data: metaData,
        key: fieldData.whetherOneSignatureAllowSkip.name,
        convert: convertCollection.string,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { currentApproveMode, approveModeSelectable, metaData } = this.state;

    const that = this;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '名称',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.name,
              require: true,
            },
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
                currentApproveMode !==
                  flowNodeApproveModeCollection.oneSignature,
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
                currentApproveMode !==
                  flowNodeApproveModeCollection.oneSignature,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.whetherSelect,
              fieldData: fieldData.whetherCounterSignatureInSequence,
              require: true,
              hidden:
                currentApproveMode !==
                flowNodeApproveModeCollection.counterSignature,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.whetherSelect,
              fieldData: fieldData.whetherOneSignatureAllowSkip,
              require: true,
              hidden:
                currentApproveMode !==
                flowNodeApproveModeCollection.oneSignature,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.typeNote,
              value: getValueByKey({
                data: metaData,
                key: fieldData.typeNote.name,
              }),
            },
          ],
          instruction: [
            {
              title: '设置说明',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '审批人模式为 ”指定人员“ 时, 需要选择人员作为审批人。',
                },
                {
                  text: '审批人模式为 ”直属部门“ 时, 需要选择职级, 符合所选职级的直属部门人员作为审批人, 请注意，直属部门是提交人所在部门，并非上级部门。',
                },
              ],
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '简介 - 描述 - 备注',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '其他信息',
          },
          items: [
            {
              type: cardConfig.contentItemType.onlyShowInputDatetime,
              fieldData: fieldData.createTime,
              value: getValueByKey({
                data: metaData,
                key: fieldData.createTime.name,
                format: formatCollection.datetime,
              }),
            },
            {
              type: cardConfig.contentItemType.onlyShowInputDatetime,
              fieldData: fieldData.updateTime,
              value: getValueByKey({
                data: metaData,
                key: fieldData.updateTime.name,
                format: formatCollection.datetime,
              }),
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
          text: '操作人模式为 ”指定人员“ 时, 需要选择人员作为审批人。',
        },
        {
          text: '操作人模式为 ”直属部门“ 时, 需要选择职级, 符合所选职级的直属部门人员作为审批人。',
        },
      ],
    };
  };
}

export { UpdateBasicInfoDrawer };
