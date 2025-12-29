import { Badge, Tooltip } from 'antd';
import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkInCollection,
  convertCollection,
  getValueByKey,
  whetherNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  listViewConfig,
} from 'antd-management-fast-common';
import { ColorText, iconBuilder } from 'antd-management-fast-component';

import {
  accessWayCollection,
  flowCaseStatusCollection,
} from '../../../../customConfig';
import { getFlowCaseStatusName } from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import {
  getFlowCaseStatusBadge,
  WorkflowCase,
} from '../../../../pageBases/general';
import { fieldData } from '../../../../pageBases/general/WorkflowCase/Common/data';
// import { PageListCreateCaseDrawer as WorkflowSelfBuildPageListCreateCaseDrawer } from '../../WorkflowSelfBuild/PageListCreateCaseDrawer';
import { PageListCreateCaseDrawer as WorkflowUsablePageListCreateCaseDrawer } from '../../WorkflowUsable/PageListCreateCaseDrawer';

const { PageList: PageListWorkflowCase, FormDocumentPreviewDrawer } =
  WorkflowCase;

@connect(({ workflowCase, schedulingControl }) => ({
  workflowCase,
  schedulingControl,
}))
class PageList extends PageListWorkflowCase {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '我发起的审批实例列表',
      paramsKey: accessWayCollection.workflowCase.pageList.paramsKey,
      loadApiPath: modelTypeCollection.workflowCaseTypeCollection.pageList,
    };
  }

  // showWorkflowSelfBuildPageListCreateCaseDrawer = () => {
  //   WorkflowSelfBuildPageListCreateCaseDrawer.open();
  // };

  // afterWorkflowSelfBuildPageListCreateCaseDrawerOk = () => {
  //   this.refreshDataWithReloadAnimalPrompt({});
  // };

  showWorkflowUsablePageListCreateCaseDrawer = () => {
    WorkflowUsablePageListCreateCaseDrawer.open();
  };

  afterWorkflowUsablePageListCreateCaseDrawerOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showFormDrawer = (item) => {
    const workflowCaseId = getValueByKey({
      data: item,
      key: fieldData.workflowCaseId.name,
    });

    this.goToPath(
      `/flowCase/workflowCaseMadeByMe/edit/load/${workflowCaseId}/key/formInfo`,
    );
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      // {
      //   buildType:
      //     listViewConfig.dataContainerExtraActionBuildType.generalButton,
      //   type: 'primary',
      //   icon: iconBuilder.plus(),
      //   text: '发起内部流程审批',
      //   handleClick: this.showWorkflowSelfBuildPageListCreateCaseDrawer,
      // },
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        // type: 'primary',
        // danger: true,
        icon: iconBuilder.plus(),
        text: '发起流程审批',
        style: {
          backgroundColor: '#52C41A',
          color: '#fff',
        },
        handleClick: this.showWorkflowUsablePageListCreateCaseDrawer,
      },
    ];
  };

  establishListItemDropdownConfig = (record) => {
    const canHide = getValueByKey({
      data: record,
      key: fieldData.canHide.name,
      convert: convertCollection.number,
    });

    const status = getValueByKey({
      data: record,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '编辑',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(
        accessWayCollection.workflowCase.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.showFormDrawer(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'showFormDocumentPreviewDrawer',
          icon: iconBuilder.read(),
          hidden: !checkHasAuthority(
            accessWayCollection.workflowCase.get.permission,
          ),
          text: '查看表单文档',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'toggleEmergency',
          icon: iconBuilder.swap(),
          text: '切换紧急',
          hidden: !checkHasAuthority(
            accessWayCollection.workflowCase.toggleEmergency.permission,
          ),
          disabled: !checkInCollection(
            [flowCaseStatusCollection.created],
            status,
          ),
          confirm: true,
          title:
            '将要切换紧急状态（位于紧急状态下的审批，会向审批人发送审批通知），确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'hide',
          icon: iconBuilder.delete(),
          text: '移除',
          disabled: !checkHasAuthority(
            accessWayCollection.workflowCase.hide.permission,
          ),
          hidden: canHide !== whetherNumber.yes,
          confirm: true,
          title: '将要移除此项，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          disabled: !checkHasAuthority(
            accessWayCollection.workflowCase.refreshCache.permission,
          ),
          confirm: true,
          title: '将要刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => {
    return [
      {
        dataTarget: { ...fieldData.workflowCaseId, label: '项目流水号' },
        width: 120,
        showRichFacade: true,
        canCopy: true,
      },
      {
        dataTarget: fieldData.title,
        align: 'left',
        showRichFacade: true,
        emptyValue: '--',
        render: (value, record) => {
          const whetherEmergency = getValueByKey({
            data: record,
            key: fieldData.whetherEmergency.name,
            convert: convertCollection.number,
          });

          const status = getValueByKey({
            data: record,
            key: fieldData.status.name,
            convert: convertCollection.number,
          });

          const valuePart =
            whetherEmergency === whetherNumber.yes ? (
              <ColorText
                textPrefix="[紧急]"
                textPrefixStyle={{
                  color: 'red',
                  paddingRight: '6px',
                }}
                separator=""
                text={value}
                multiLine
              />
            ) : (
              <ColorText text={value} multiLine />
            );

          return (
            <Tooltip placement="topLeft" title={value}>
              <div>
                <Badge
                  status={getFlowCaseStatusBadge(status)}
                  style={{ marginRight: '6px' }}
                />

                {valuePart}
              </div>
            </Tooltip>
          );
        },
      },
      {
        dataTarget: fieldData.userRealName,
        width: 140,
        showRichFacade: true,
        emptyValue: '--',
      },
      ...this.getAdditionalColumnWrapper(),
      {
        dataTarget: fieldData.workflowName,
        width: 220,
        showRichFacade: true,
        emptyValue: '--',
      },
      // {
      //   dataTarget: fieldData.workflowChannel,
      //   width: 120,
      //   showRichFacade: true,
      //   emptyValue: '--',
      //   facadeConfigBuilder: (value) => {
      //     return {
      //       color: buildRandomHexColor({
      //         seed: toNumber(value) + 47,
      //       }),
      //     };
      //   },
      //   formatValue: (value) => {
      //     return getChannelName({
      //       value: value,
      //     });
      //   },
      // },
      {
        dataTarget: fieldData.status,
        width: 120,
        showRichFacade: true,
        emptyValue: '--',
        facadeMode: columnFacadeMode.badge,
        facadeConfigBuilder: (value) => {
          return {
            status: getFlowCaseStatusBadge(value),
            text: getFlowCaseStatusName({
              value: value,
            }),
          };
        },
      },
      {
        dataTarget: this.columnDataTargetTime,
        width: 160,
        showRichFacade: true,
        facadeMode: columnFacadeMode.datetime,
      },
    ];
  };

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        {/* <WorkflowSelfBuildPageListCreateCaseDrawer
          maskClosable
          afterClose={this.afterWorkflowSelfBuildPageListCreateCaseDrawerOk}
        /> */}

        <WorkflowUsablePageListCreateCaseDrawer
          maskClosable
          afterClose={this.afterWorkflowUsablePageListCreateCaseDrawerOk}
        />

        <FormDocumentPreviewDrawer maskClosable externalData={currentRecord} />
      </>
    );
  };
}

export default PageList;
