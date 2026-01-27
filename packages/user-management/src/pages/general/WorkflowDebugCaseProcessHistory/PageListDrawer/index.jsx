import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
} from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { BaseFlowCaseProcessHistoryPageListDrawer } from '../../../../pageBases';
import { refreshCacheAction } from '../Assist/action';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'c3e53fb8af82487a93ad23a1f430cdd6';

@connect(({ workflowDebugCaseProcessHistory, schedulingControl }) => ({
  workflowDebugCaseProcessHistory,
  schedulingControl,
}))
class WorkflowDebugCaseProcessHistoryPageListDrawer extends BaseFlowCaseProcessHistoryPageListDrawer {
  reloadWhenShow = true;

  componentAuthority =
    accessWayCollection.workflowDebugCaseProcessHistory.pageList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '测试流程审批记录列表',
      loadApiPath:
        modelTypeCollection.workflowDebugCaseProcessHistoryTypeCollection
          .pageList,
    };
  }

  getFlowCaseProcessHistoryId = (o) => {
    return getValueByKey({
      data: o,
      key: fieldData.workflowDebugCaseProcessHistoryId.name,
      convert: convertCollection.string,
    });
  };

  getFlowCaseProcessHistoryIdDataTarget = () => {
    return fieldData.workflowDebugCaseProcessHistoryId;
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  checkHasRefreshCacheAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowDebugCaseProcessHistory.refreshCache
        .permission,
    );
  };
}

export { WorkflowDebugCaseProcessHistoryPageListDrawer };
