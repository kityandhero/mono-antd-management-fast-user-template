import React from 'react';

import { connect } from 'easy-soft-dva';
import { checkHasAuthority, getValueByKey } from 'easy-soft-utility';

import {
  columnFacadeMode,
  getDerivedStateFromPropertiesForUrlParameters,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import {
  accessWayCollection,
  fieldDataFlowCaseCarbonCopyNotification,
} from '../../../../customConfig';
import { getFlowCaseCarbonCopyNotificationStatusName } from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { FormDrawer } from '../../WorkflowCaseFormStorage/FormDrawer';
import { parseUrlParametersForSetState } from '../Assist/config';
import { getFlowCaseCarbonCopyNotificationStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ workflowCaseCarbonCopyNotification, schedulingControl }) => ({
  workflowCaseCarbonCopyNotification,
  schedulingControl,
}))
class PageList extends MultiPage {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      paramsKey:
        accessWayCollection.workflowCaseCarbonCopyNotification.pageList
          .paramsKey,
      pageTitle: '流程抄送列表',
      loadApiPath:
        modelTypeCollection.workflowCaseCarbonCopyNotificationTypeCollection
          .pageList,
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

  showFormDrawer = (o) => {
    this.setState(
      {
        currentRecord: o,
      },
      () => {
        FormDrawer.open();
      },
    );
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.status.name] = unlimitedWithStringFlag.key;

    return values;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 12,
          type: searchCardConfig.contentItemType.input,
          fieldData: {
            label: '流程实例标题',
            name: 'flowCaseTitle',
            helper: '',
          },
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '详情',
      icon: iconBuilder.read(),
      disabled: !checkHasAuthority(
        accessWayCollection.workflowCase.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.showFormDrawer(handleData);
      },
      handleData: record,
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.content,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.status,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getFlowCaseCarbonCopyNotificationStatusBadge(value),
          text: getFlowCaseCarbonCopyNotificationStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.workflowCaseCarbonCopyNotificationId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
  ];

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    const flowCaseId = getValueByKey({
      data: currentRecord,
      key: fieldDataFlowCaseCarbonCopyNotification.flowCaseId.name,
    });

    return (
      <>
        <FormDrawer
          maskClosable
          showIndependentPrint
          externalData={{
            workflowCaseId: flowCaseId,
          }}
        />
      </>
    );
  };
}

export default PageList;
