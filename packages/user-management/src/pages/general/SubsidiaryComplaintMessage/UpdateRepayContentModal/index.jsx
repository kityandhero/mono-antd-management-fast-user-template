import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'a5e0087ccc0147a3b60c2c1b510df8fd';

@connect(({ subsidiaryReportMessage, schedulingControl }) => ({
  subsidiaryReportMessage,
  schedulingControl,
}))
class UpdateRepayContentModal extends BaseUpdateModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '更新回复内容',
      loadApiPath:
        modelTypeCollection.subsidiaryComplaintMessageTypeCollection.get,
      submitApiPath:
        modelTypeCollection.subsidiaryComplaintMessageTypeCollection.repay,
    };
  }

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
      values[fieldData.replyContent.name] = getValueByKey({
        data: metaData,
        key: fieldData.replyContent.name,
      });
    }

    return values;
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.subsidiaryComplaintMessageId.name] = getValueByKey({
      data: externalData,
      key: fieldData.subsidiaryComplaintMessageId.name,
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.subsidiaryComplaintMessageId.name] = getValueByKey({
      data: externalData,
      key: fieldData.subsidiaryComplaintMessageId.name,
    });

    return d;
  };

  buildNotificationDescription = (
    // eslint-disable-next-line no-unused-vars
    singleData = null,
    // eslint-disable-next-line no-unused-vars
    listData = [],
    // eslint-disable-next-line no-unused-vars
    extraData = null,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData = null,
    // eslint-disable-next-line no-unused-vars
    submitData = null,
  ) => {
    return `回复更新成功。`;
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        flex: '80px',
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
      key: fieldData.title.name,
    });
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.replyContent,
            },
          ],
        },
      ],
    };
  };
}

export { UpdateRepayContentModal };
