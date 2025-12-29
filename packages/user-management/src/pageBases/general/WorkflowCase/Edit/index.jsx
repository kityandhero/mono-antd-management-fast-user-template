import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import {
  DataTabContainerSupplement,
  getFlowCaseStatusName,
} from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { refreshCacheAction } from '../Assist/action';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../Assist/config';
import { fieldData } from '../Common/data';

class Edit extends DataTabContainerSupplement {
  componentAuthority = accessWayCollection.workflowCase.get.permission;

  tabList = [
    {
      key: 'basicInfo',
      hidden: !checkHasAuthority(
        accessWayCollection.workflowCase.get.permission,
      ),
      tab: '基本信息',
    },
    {
      key: 'formInfo',
      hidden: !checkHasAuthority(
        accessWayCollection.workflowCase.get.permission,
      ),
      tab: '表单信息',
    },
    {
      key: 'operateLog/pageList',
      hidden: !checkHasAuthority(
        accessWayCollection.workflowCase.pageListOperateLog.permission,
      ),
      tab: '操作日志',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath: modelTypeCollection.workflowCaseTypeCollection.get,
      workflowCaseId: null,
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

  doOtherAfterLoadSuccess = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    this.setState({
      pageTitle: getValueByKey({
        data: metaData,
        key: fieldData.title.name,
      }),
    });
  };

  handleMenuClick = ({ key, handleData }) => {
    const that = this;

    switch (key) {
      case 'refreshCache': {
        that.refreshCache(handleData);
        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  establishPageHeaderTitlePrefix = () => {
    return '';
  };

  establishExtraActionEllipsisConfig = () => {
    const { metaData } = this.state;

    if ((metaData || null) == null) {
      return null;
    }

    const that = this;

    return {
      disabled: this.checkInProgress(),
      handleMenuClick: ({ key, handleData }) => {
        switch (key) {
          case 'refreshCache': {
            that.refreshCache(handleData);
            break;
          }

          default: {
            showSimpleErrorMessage('can not find matched key');
            break;
          }
        }
      },
      handleData: metaData,
      items: [
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.workflowCase.refreshCache.permission,
          ),
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
      ],
    };
  };

  establishPageHeaderExtraContentConfig = () => {
    const { metaData } = this.state;

    return {
      textLabel: '当前状态',
      text: getFlowCaseStatusName({
        value: getValueByKey({
          data: metaData,
          key: fieldData.status.name,
          convert: convertCollection.number,
        }),
      }),
      timeLabel: fieldData.createTime.label,
      time: getValueByKey({
        data: metaData,
        key: fieldData.createTime.name,
        convert: convertCollection.datetime,
      }),
    };
  };

  establishPageHeaderContentGridConfig = () => {
    const { metaData } = this.state;

    return [
      {
        label: fieldData.workflowCaseId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.workflowCaseId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.workflowName.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.workflowName.name,
        }),
      },
      {
        label: fieldData.userRealName.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.userRealName.name,
        }),
      },
      {
        label: fieldData.whetherEmergencyNote.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.whetherEmergencyNote.name,
        }),
      },
    ];
  };
}

export { Edit };
