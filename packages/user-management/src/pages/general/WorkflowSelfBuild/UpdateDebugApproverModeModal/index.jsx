import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { renderFormFlowDebugApproverModeSelect } from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

const visibleFlag = 'b2e6ee63cc784d6e9d6e120bc8525574';

@connect(({ workflow, schedulingControl }) => ({
  workflow,
  schedulingControl,
}))
class UpdateDebugApproverModeModal extends BaseUpdateModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '设置流程测试审批人模式',
      loadApiPath: modelTypeCollection.workflowTypeCollection.get,
      submitApiPath:
        modelTypeCollection.workflowTypeCollection.setDebugApproverMode,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.props;

    d[fieldData.workflowId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowId.name,
      defaultValue: '',
    });

    return d;
  };

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
    return `流程测试审批人模式更新成功。`;
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

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.name.name,
    });
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

    if (metaData != null) {
      values[fieldData.debugApproverMode.name] = getValueByKey({
        data: metaData,
        key: fieldData.debugApproverMode.name,
        convert: convertCollection.string,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: renderFormFlowDebugApproverModeSelect({}),
              require: true,
            },
          ],
        },
      ],
    };
  };
}

export { UpdateDebugApproverModeModal };
