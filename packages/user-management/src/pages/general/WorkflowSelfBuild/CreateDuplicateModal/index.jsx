import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getValueByKey,
  whetherString,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseAddModal } = DataModal;

const visibleFlag = '37d8e5e953794495b2c00b36ad2c5a36';

const fieldDataExtra = {
  whetherCopyApprovalUser: {
    label: '复制节点审批人',
    name: 'whetherCopyApprovalUser',
    helper: '',
  },
  whetherCopyRangeEffectiveRelation: {
    label: '复制适用关系',
    name: 'whetherCopyRangeEffectiveRelation',
    helper: '',
  },
};

@connect(({ workflow, schedulingControl }) => ({
  workflow,
  schedulingControl,
}))
class CreateDuplicateModal extends BaseAddModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '复制流程',
      submitApiPath: modelTypeCollection.workflowTypeCollection.createDuplicate,
    };
  }

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.props;

    d[fieldData.workflowId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowId.name,
      defaultValue: '',
    });

    return d;
  };

  buildNotificationDescription = (
    // eslint-disable-next-line no-unused-vars
    singleData,
    // eslint-disable-next-line no-unused-vars
    listData,
    // eslint-disable-next-line no-unused-vars
    extraData,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line no-unused-vars
    submitData,
  ) => {
    return `工作流复制成功。`;
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        flex: '120px',
      },
      wrapperCol: {
        flex: 'auto',
      },
    };
  };

  fillDefaultInitialValues = () => {
    const initialValues = {};

    initialValues[fieldDataExtra.whetherCopyApprovalUser.name] =
      whetherString.no;
    initialValues[fieldDataExtra.whetherCopyRangeEffectiveRelation.name] =
      whetherString.no;

    return initialValues;
  };

  establishCardCollectionConfig = () => {
    const { externalData } = this.props;

    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.name,
              value: getValueByKey({
                data: externalData,
                key: fieldData.name.name,
                convert: convertCollection.string,
              }),
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.duplicateName,
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.whetherRadio,
              fieldData: fieldDataExtra.whetherCopyApprovalUser,
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.whetherRadio,
              fieldData: fieldDataExtra.whetherCopyRangeEffectiveRelation,
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
          text: '输入合适的副本流程名称来创建副本, 名称应尽可能与原流程做出区分.',
        },
      ],
    };
  };
}

export { CreateDuplicateModal };
