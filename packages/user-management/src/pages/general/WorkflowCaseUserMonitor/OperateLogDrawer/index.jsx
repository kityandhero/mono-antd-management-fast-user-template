import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { BasePageListDrawer } from '../../OperationLog/BasePageListDrawer';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'daf088a716dc4ee3b32d3642c95f1ded';

@connect(({ workflowCase, schedulingControl }) => ({
  workflowCase,
  schedulingControl,
}))
class OperateLogDrawer extends BasePageListDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.workflowCaseTypeCollection.pageListOperateLog,
      subsidiaryReportMessageId: null,
    };
  }

  supplementLoadRequestParams = (o) => {
    const { externalData } = this.props;

    const d = o;

    d[fieldData.subsidiaryReportMessageId.name] = getValueByKey({
      data: externalData,
      key: fieldData.subsidiaryReportMessageId.name,
      defaultValue: '',
    });

    return d;
  };
}

export { OperateLogDrawer };
