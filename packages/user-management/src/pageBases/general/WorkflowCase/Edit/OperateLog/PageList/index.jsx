import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../../../modelBuilders';
import { BaseInnerPageList } from '../../../../../../pages/general/OperationLog/BaseInnerPageList';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../../../Assist/config';

class PageList extends BaseInnerPageList {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.workflowCaseTypeCollection.pageListOperateLog,
      dateRangeFieldName: '操作时间',
      workflowCaseId: null,
      currentRecord: null,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
    );
  }

  checkNeedUpdate = (preProperties, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProperties, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { workflowCaseId } = this.state;

    d.workflowCaseId = workflowCaseId;

    return d;
  };
}

export { PageList };
