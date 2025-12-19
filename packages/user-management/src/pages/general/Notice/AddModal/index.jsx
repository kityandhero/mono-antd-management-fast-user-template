import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  getValueByKey,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

const { BaseAddModal } = DataModal;

const visibleFlag = 'e931932d209a46d4b432a42389d4223a';

@connect(({ notice, schedulingControl }) => ({
  notice,
  schedulingControl,
}))
class AddModal extends BaseAddModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增通知公告',
      submitApiPath: 'notice/addBasicInfo',
    };
  }

  checkSubmitRequestParams = (o) => {
    const title = getValueByKey({
      data: o,
      key: fieldData.title.name,
      defaultValue: '',
    });

    if (checkStringIsNullOrWhiteSpace(title)) {
      const text = '请输入标题!';

      showSimpleErrorMessage(text);

      return false;
    }

    return true;
  };

  buildNotificationDescription = ({
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
  }) => {
    return `操作成功：已成功添加通知公告 ，请继续编辑 `;
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        flex: '60px',
      },
      wrapperCol: {
        flex: 'auto',
      },
    };
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.title,
              require: true,
            },
          ],
        },
      ],
    };
  };
}

export { AddModal };
