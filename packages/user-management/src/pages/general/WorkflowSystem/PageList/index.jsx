import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  getValueByKey,
  toNumber,
  whetherNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import {
  getBusinessModeName,
  getChannelName,
  getFlowEffectiveRangeName,
  getFlowScopeName,
  getFlowStatusName,
  renderSearchBusinessModeSelect,
  renderSearchFlowScopeSelect,
} from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { getFlowStatusBadge } from '../../../../utils';
import { singleTreeListWithWorkflowAction } from '../../Tag/Assist/action';
import { ChangeSortModal } from '../../Workflow/ChangeSortModal';
import { singleTreeListAction } from '../../WorkflowCategory/Assist/action';
import { FlowCaseFormExampleDocumentDisplayDrawer } from '../../WorkflowFormDesign/FlowCaseFormExampleDocumentDisplayDrawer';
import { refreshCacheAction } from '../Assist/action';
import { fieldData } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ workflow, schedulingControl }) => ({
  workflow,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.workflow.pageListUsable.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      tableScrollX: 1680,
      pageTitle: '系统流程列表',
      paramsKey: accessWayCollection.workflow.pageListUsable.paramsKey,
      loadApiPath: modelTypeCollection.workflowTypeCollection.pageListSystem,
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
    return {
      ...this.supplementRequestParams(o),
    };
  };

  supplementRequestParams = (o) => {
    const d = { ...o };

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

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'showFlowCaseFormExampleDocumentDisplayDrawer': {
        this.showFlowCaseFormExampleDocumentDisplayDrawer(handleData);
        break;
      }

      case 'updateSort': {
        this.showChangeSortModal(handleData);
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

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
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

  showChangeSortModal = (o) => {
    this.setState({ currentRecord: o }, () => {
      ChangeSortModal.open();
    });
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

  goToEdit = (item) => {
    const workflowId = getValueByKey({
      data: item,
      key: fieldData.workflowId.name,
    });

    this.goToPath(`/flow/workflowSystem/edit/load/${workflowId}/key/basicInfo`);
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
      disabled: !checkHasAuthority(accessWayCollection.workflow.get.permission),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'updateSort',
          icon: iconBuilder.edit(),
          text: '设置排序值',
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
          withDivider: true,
          uponDivider: true,
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          confirm: true,
          title: '将要刷新缓存，确定吗？',
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
    {
      dataTarget: fieldData.channel,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      hidden: true,
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 47,
          }),
        };
      },
      formatValue: (value) => {
        return getChannelName({
          value: value,
        });
      },
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

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '系统流程仅可查看，不可编辑。',
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
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
