import { convertCollection, getValueByKey, toString } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataDrawer } from 'antd-management-fast-framework';

import {
  flowNodeApproveModeCollection,
  flowNodeApproverModeCollection,
} from '../../../../customConfig';
import { buildNowTimeFieldItem } from '../../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;

class BaseAddPointDrawer extends BaseAddDrawer {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
    };
  }

  adjustApproverModeListData = (list) => list;

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;
    const { workflowId } = externalData;

    d[fieldData.workflowId.name] = workflowId;

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

  establishCustomExtraViewConfig = () => [];

  establishCardCollectionConfig = () => {
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
            ...this.establishCustomExtraViewConfig(),
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
        buildNowTimeFieldItem({}),
      ],
    };
  };
}

export { BaseAddPointDrawer };
