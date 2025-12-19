import { Tooltip } from 'antd';

import {
  convertCollection,
  // buildRandomHexColor,
  getValueByKey,
  handleItem,
  whetherNumber,
  // toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  searchCardConfig,
} from 'antd-management-fast-common';
import { ColorText } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  // getChannelName,
  getFlowCaseStatusName,
  renderSearchFlowCaseStatusSelect,
} from '../../../customSpecialComponents';
import { getFlowCaseStatusBadge } from '../../FlowCase';
import {
  hideAction,
  refreshCacheAction,
  toggleEmergencyAction,
} from '../Assist/action';
import { fieldData } from '../Common/data';
import { FormDocumentPreviewDrawer } from '../FormDocumentPreviewDrawer';

const { MultiPage } = DataMultiPageView;

class PageList extends MultiPage {
  componentAuthority = accessWayCollection.workflowCase.pageList.permission;

  columnDataTargetTime = fieldData.createTime;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      dateRangeFieldName: '创建时间',
      currentRecord: null,
    };
  }

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const id = getValueByKey({
      data: handleData,
      key: fieldData.workflowCaseId.name,
    });

    handleItem({
      target,
      value: id,
      compareValueHandler: (o) => {
        return getValueByKey({
          data: o,
          key: fieldData.workflowCaseId.name,
        });
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
      case 'showFormDocumentPreviewDrawer': {
        this.showFormDocumentPreviewDrawer(handleData);

        break;
      }

      case 'toggleEmergency': {
        this.toggleEmergency(handleData);

        break;
      }

      case 'forceEnd': {
        this.forceEnd(handleData);

        break;
      }

      case 'disuse': {
        this.disuse(handleData);

        break;
      }

      case 'hide': {
        this.hide(handleData);

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

  toggleEmergency = (r) => {
    toggleEmergencyAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  // eslint-disable-next-line no-unused-vars
  forceEnd = (o) => {
    throw new Error('forceEnd need overrode to implement');
  };

  // eslint-disable-next-line no-unused-vars
  disuse = (o) => {
    throw new Error('disuse need overrode to implement');
  };

  hide = (r) => {
    hideAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  showFormDrawer = (item) => {
    const workflowCaseId = getValueByKey({
      data: item,
      key: fieldData.workflowCaseId.name,
    });

    this.goToPath(
      `/flow/workflowCase/edit/load/${workflowCaseId}/key/basicInfo`,
    );
  };

  showFormDocumentPreviewDrawer = (o) => {
    this.setState({ currentRecord: o }, () => {
      FormDocumentPreviewDrawer.open();
    });
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 10,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.title,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.whetherSelect,
          fieldData: fieldData.whetherEmergency,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchFlowCaseStatusSelect({}),
        },
        {
          lg: 4,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  getAdditionalColumnWrapper = () => [];

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
              <div>{valuePart}</div>
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
        <FormDocumentPreviewDrawer maskClosable externalData={currentRecord} />
      </>
    );
  };
}

export { PageList };
