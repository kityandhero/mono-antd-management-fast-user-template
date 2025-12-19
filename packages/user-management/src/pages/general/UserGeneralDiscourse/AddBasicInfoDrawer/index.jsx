import { connect } from 'easy-soft-dva';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import {
  buildNowTimeFieldItem,
  renderFormGeneralDiscourseTypeSelect,
} from '../../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;

const visibleFlag = 'c70e6fce6c5d49faa7a2381b93b3c558';

@connect(({ userGeneralDiscourse, schedulingControl }) => ({
  userGeneralDiscourse,
  schedulingControl,
}))
class AddBasicInfoDrawer extends BaseAddDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增常用语',
      submitApiPath: 'userGeneralDiscourse/addBasicInfo',
    };
  }

  establishCardCollectionConfig = () => {
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
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.content,
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: renderFormGeneralDiscourseTypeSelect({
                helper: fieldData.type.helper,
              }),
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.sort,
              require: false,
            },
          ],
        },
        buildNowTimeFieldItem({}),
      ],
    };
  };
}

export default AddBasicInfoDrawer;
