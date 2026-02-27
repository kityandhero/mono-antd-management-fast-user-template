import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  handleItem,
  toNumber,
  whetherNumber,
  zeroString,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  listViewConfig,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import {
  accessWayCollection,
  flowStatusCollection,
} from '../../../../customConfig';
import {
  getBusinessModeName,
  getFlowEffectiveRangeName,
  getFlowScopeName,
  getFlowStatusName,
  renderSearchBusinessModeSelect,
  renderSearchFlowScopeSelect,
  renderSearchFlowStatusSelect,
} from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { getFlowStatusBadge } from '../../../../utils';
import { singleTreeListWithWorkflowAction } from '../../Tag/Assist/action';
import { ChangeSortModal } from '../../Workflow/ChangeSortModal';
import { singleTreeListAction } from '../../WorkflowCategory/Assist/action';
import { PageListWorkflowCategorySelectActionDrawer } from '../../WorkflowCategory/PageListSelectActionDrawer';
import { FlowCaseFormExampleDocumentDisplayDrawer } from '../../WorkflowFormDesign/FlowCaseFormExampleDocumentDisplayDrawer';
import { AddOfficeAutomationProcessApprovalDrawer } from '../AddOfficeAutomationProcessApprovalDrawer';
import {
  clearWorkflowCategoryIdAction,
  refreshCacheAction,
  removeAction,
  setDisableAction,
  setEnableAction,
  setWorkflowCategoryIdAction,
} from '../Assist/action';
import { fieldData } from '../Common/data';
import { OperateLogDrawer } from '../OperateLogDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ workflow, schedulingControl }) => ({
  workflow,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority =
    accessWayCollection.workflow.pageListSelfBuild.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      tableScrollX: 1680,
      pageTitle: '自制流程列表',
      paramsKey: accessWayCollection.workflow.pageListSelfBuild.paramsKey,
      loadApiPath: modelTypeCollection.workflowTypeCollection.pageListSelfBuild,
      dateRangeFieldName: '创建时间',
      currentRecord: null,
      workflowCategoryId: '',
      workflowCategoryName: '',
      workflowCategoryTreeData: [],
      tagIdCollection: [],
      tagName: '',
      tagTreeData: [],
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = { ...o };
    const { workflowCategoryId, tagIdCollection } = this.state;

    d[fieldData.workflowCategoryId.name] = workflowCategoryId;
    d[fieldData.tagIdCollection.name] = tagIdCollection.join(',');

    return d;
  };

  doOtherRemoteRequest = () => {
    this.loadWorkflowCategoryTreeList({ refresh: whetherNumber.no });
    this.loadTagTreeList();
  };

  loadWorkflowCategoryTreeList = ({ refresh = whetherNumber.no }) => {
    singleTreeListAction({
      target: this,
      handleData: { refresh },
      successCallback: ({ target, remoteListData }) => {
        target.setState({
          workflowCategoryTreeData: remoteListData,
        });
      },
    });
  };

  reloadWorkflowCategoryTreeList = () => {
    this.loadWorkflowCategoryTreeList({ refresh: whetherNumber.yes });
  };

  loadTagTreeList = () => {
    singleTreeListWithWorkflowAction({
      target: this,
      handleData: {},
      successCallback: ({ target, remoteListData }) => {
        target.setState({
          tagTreeData: remoteListData,
        });
      },
    });
  };

  reloadTagTreeList = () => {
    this.loadTagTreeList();
  };

  handleSearchResetState = () => {
    return {
      tagIdCollection: [],
      tagName: '',
      workflowCategoryId: '',
      workflowCategoryName: '',
    };
  };

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const workflowId = getValueByKey({
      data: handleData,
      key: fieldData.workflowId.name,
    });

    handleItem({
      target,
      value: workflowId,
      compareValueHandler: (o) => {
        const { workflowId: v } = o;

        return v;
      },
      handler: (d) => {
        const o = d;

        o[fieldData.status.name] = getValueByKey({
          data: remoteData,
          key: fieldData.status.name,
        });

        return d;
      },
    });
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'showFlowCaseFormExampleDocumentDisplayDrawer': {
        this.showFlowCaseFormExampleDocumentDisplayDrawer(handleData);
        break;
      }

      case 'setSort': {
        this.showChangeSortModal(handleData);
        break;
      }

      case 'showPageListWorkflowCategorySelectActionDrawer': {
        this.showPageListWorkflowCategorySelectActionDrawer(handleData);
        break;
      }

      case 'clearWorkflowCategoryId': {
        this.clearWorkflowCategoryId(handleData);
        break;
      }

      case 'setEnable': {
        this.setEnable(handleData);
        break;
      }

      case 'setDisable': {
        this.setDisable(handleData);
        break;
      }

      case 'refreshCache': {
        this.refreshCache(handleData);

        break;
      }

      default: {
        break;
      }
    }
  };

  setWorkflowCategoryId = (o) => {
    const { currentRecord } = this.state;

    setWorkflowCategoryIdAction({
      target: this,
      handleData: {
        workflowId: getValueByKey({
          data: currentRecord,
          key: fieldData.workflowId.name,
          convert: convertCollection.string,
        }),
        workflowCategoryId: getValueByKey({
          data: o,
          key: fieldData.workflowCategoryId.name,
          convert: convertCollection.string,
        }),
      },
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
  };

  clearWorkflowCategoryId = (r) => {
    clearWorkflowCategoryIdAction({
      target: this,
      handleData: r,
      successCallback: ({ target, remoteData }) => {
        const id = getValueByKey({
          data: remoteData,
          key: fieldData.workflowId.name,
        });

        handleItem({
          target,
          value: id,
          compareValueHandler: (o) => {
            const v = getValueByKey({
              data: o,
              key: fieldData.workflowId.name,
            });

            return v;
          },
          handler: (d) => {
            const o = d;

            o[fieldData.workflowCategoryId.name] = getValueByKey({
              data: remoteData,
              key: fieldData.workflowCategoryId.name,
            });

            o[fieldData.workflowCategoryName.name] = getValueByKey({
              data: remoteData,
              key: fieldData.workflowCategoryName.name,
            });

            return d;
          },
        });
      },
    });
  };

  setEnable = (r) => {
    setEnableAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  setDisable = (r) => {
    setDisableAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  remove = (r) => {
    removeAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  showAddOfficeAutomationProcessApprovalDrawer = () => {
    AddOfficeAutomationProcessApprovalDrawer.open();
  };

  afterAddOfficeAutomationProcessApprovalDrawerOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showChangeSortModal = (o) => {
    this.setState({ currentRecord: o }, () => {
      ChangeSortModal.open();
    });
  };

  showPageListWorkflowCategorySelectActionDrawer = (r) => {
    this.setState(
      {
        currentRecord: r,
      },
      () => {
        PageListWorkflowCategorySelectActionDrawer.open();
      },
    );
  };

  showOperateLogDrawer = (item) => {
    this.setState(
      {
        currentRecord: item,
      },
      () => {
        OperateLogDrawer.open();
      },
    );
  };

  afterChangeSortModalOk = ({
    // eslint-disable-next-line no-unused-vars
    singleData,
    // eslint-disable-next-line no-unused-vars
    listData,
    // eslint-disable-next-line no-unused-vars
    extraData,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line no-unused-vars
    submitData,
    // eslint-disable-next-line no-unused-vars
    subjoinData,
  }) => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showFlowCaseFormExampleDocumentDisplayDrawer = (o) => {
    this.setState(
      {
        currentRecord: o,
      },
      () => {
        FlowCaseFormExampleDocumentDisplayDrawer.open();
      },
    );
  };

  goToEdit = (item) => {
    const workflowId = getValueByKey({
      data: item,
      key: fieldData.workflowId.name,
    });

    this.goToPath(
      `/flow/workflowSelfBuild/edit/load/${workflowId}/key/basicInfo`,
    );
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.scope.name] = unlimitedWithStringFlag.flag;
    values[fieldData.businessMode.name] = unlimitedWithStringFlag.flag;
    values[fieldData.availableOnMobileSwitch.name] =
      unlimitedWithStringFlag.flag;
    values[fieldData.effectiveRange.name] = unlimitedWithStringFlag.flag;
    values[fieldData.status.name] = unlimitedWithStringFlag.flag;

    return values;
  };

  establishSearchCardConfig = () => {
    const {
      tagTreeData,
      tagIdCollection,
      workflowCategoryTreeData,
      workflowCategoryId,
    } = this.state;

    return {
      list: [
        {
          lg: 10,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.treeSelect,
          fieldData: fieldData.workflowCategoryId,
          value: workflowCategoryId,
          require: false,
          listData: workflowCategoryTreeData,
          addonAfter: buildButton({
            text: '',
            icon: iconBuilder.reload(),
            handleClick: () => {
              this.reloadWorkflowCategoryTreeList();
            },
          }),
          dataConvert: (o) => {
            const { name: title, code: value } = o;

            return {
              title,
              value,
            };
          },
          onChange: ({ value }) => {
            this.setState({
              workflowCategoryId: value,
            });
          },
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.treeSelect,
          fieldData: fieldData.tagIdCollection,
          value: tagIdCollection,
          require: true,
          innerProps: {
            treeCheckable: true,
          },
          listData: tagTreeData,
          addonAfter: buildButton({
            title: '点击刷新标签列表',
            text: '',
            icon: iconBuilder.reload(),
            handleClick: () => {
              this.reloadTagTreeList();
            },
          }),
          dataConvert: (o) => {
            const { name: title, code: value } = o;

            return {
              title,
              value,
            };
          },
          onChange: ({ value }) => {
            this.setState({
              tagIdCollection: value,
            });
          },
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchFlowScopeSelect({}),
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchBusinessModeSelect({}),
        },
        {
          lg: 4,
          type: searchCardConfig.contentItemType.whetherSelect,
          fieldData: fieldData.availableOnMobileSwitch,
        },
        {
          lg: 4,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchFlowStatusSelect({}),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.plus(),
        text: '新增自制审批流程',
        handleClick: this.showAddOfficeAutomationProcessApprovalDrawer,
      },
    ];
  };

  establishListItemDropdownConfig = (item) => {
    const workflowCategoryId = getValueByKey({
      data: item,
      key: fieldData.workflowCategoryId.name,
      convert: convertCollection.string,
    });

    const status = getValueByKey({
      data: item,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '编辑',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(accessWayCollection.workflow.get.permission),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'setSort',
          icon: iconBuilder.edit(),
          text: '设置排序值',
          hidden: !checkHasAuthority(
            accessWayCollection.workflow.setSort.permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showPageListWorkflowCategorySelectActionDrawer',
          icon: iconBuilder.edit(),
          text: `设置类别`,
          hidden: !checkHasAuthority(
            accessWayCollection.workflow.setWorkflowCategoryId.permission,
          ),
        },
        {
          key: 'clearWorkflowCategoryId',
          icon: iconBuilder.clear(),
          text: '清除类别',
          confirm: true,
          title: '将要设清除类别，确定吗？',
          disabled: workflowCategoryId === zeroString,
          hidden: !checkHasAuthority(
            accessWayCollection.workflow.clearWorkflowCategoryId.permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showFlowCaseFormExampleDocumentDisplayDrawer',
          icon: iconBuilder.printer(),
          hidden: !checkHasAuthority(
            accessWayCollection.workflowDebugCase.getByWorkflow.permission,
          ),
          text: '查看打印样例',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'setEnable',
          icon: iconBuilder.playCircle(),
          text: '设为启用',
          confirm: true,
          title: '将要设为启用，确定吗？',
          disabled: status === flowStatusCollection.enable,
          hidden: !checkHasAuthority(
            accessWayCollection.workflow.setEnable.permission,
          ),
        },
        {
          key: 'setDisable',
          icon: iconBuilder.pauseCircle(),
          text: '设为禁用',
          confirm: true,
          title: '将要设为禁用，确定吗？',
          disabled: status === flowStatusCollection.disable,
          hidden: !checkHasAuthority(
            accessWayCollection.workflow.setDisable.permission,
          ),
        },
        {
          withDivider: true,
          uponDivider: true,
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          confirm: true,
          title: '将要刷新缓存，确定吗？',
          hidden: !checkHasAuthority(
            accessWayCollection.workflow.refreshCache.permission,
          ),
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.workflowCategoryName,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.businessMode,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 29,
          }),
        };
      },
      formatValue: (value) => {
        return getBusinessModeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.scope,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 44,
          }),
        };
      },
      formatValue: (value) => {
        return getFlowScopeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.effectiveRange,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 12,
          }),
        };
      },
      formatValue: (value) => {
        return getFlowEffectiveRangeName({
          value: value,
        });
      },
    },
    // {
    //   dataTarget: fieldData.channel,
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
      dataTarget: fieldData.creatorUserRealName,
      width: 120,
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
          status: getFlowStatusBadge(value),
          text: getFlowStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.availableOnMobileSwitch,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 38,
          }),
        };
      },
      formatValue: (value, record) => {
        return getValueByKey({
          data: record,
          key: fieldData.availableOnMobileSwitchNote.name,
        });
      },
    },
    {
      dataTarget: fieldData.sort,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.workflowId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <AddOfficeAutomationProcessApprovalDrawer
          afterOK={this.afterAddOfficeAutomationProcessApprovalDrawerOk}
        />

        <ChangeSortModal
          externalData={currentRecord}
          afterOK={this.afterChangeSortModalOk}
        />

        <FlowCaseFormExampleDocumentDisplayDrawer
          maskClosable
          externalData={currentRecord}
        />
      </>
    );
  };
}

export default PageList;
