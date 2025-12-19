import { Space } from 'antd';
import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  handleItem,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  CenterBox,
  FlexBox,
  iconBuilder,
  VerticalBox,
} from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import {
  getNoticeStatusName,
  renderSearchNoticeStatusSelect,
} from '../../../../customSpecialComponents';
import { fieldData as fieldDataNoticeTagRelation } from '../../NoticeTagRelation/Common/data';
import { AddModal } from '../AddModal';
import {
  refreshCacheAction,
  setOfflineAction,
  setOnlineAction,
} from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { ChangeSortModal } from '../ChangeSortModal';
import { fieldData, statusCollection } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ notice, schedulingControl }) => ({
  notice,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.notice.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '通知公告列表',
      paramsKey: accessWayCollection.notice.pageList.paramsKey,
      loadApiPath: 'notice/pageList',
      dateRangeFieldName: '创建时间',
      currentRecord: null,
    };
  }

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const noticeId = getValueByKey({
      data: handleData,
      key: fieldData.noticeId.name,
    });

    handleItem({
      target,
      value: noticeId,
      compareValueHandler: (o) => {
        const { noticeId: v } = o;

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
      case 'updateBasicInfo': {
        this.goToEdit(handleData);
        break;
      }

      case 'updateSort': {
        this.showChangeSortModal(handleData);
        break;
      }

      case 'setOnline': {
        this.setOnline(handleData);
        break;
      }

      case 'setOffline': {
        this.setOffline(handleData);
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

  setOnline = (r) => {
    setOnlineAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  setOffline = (r) => {
    setOfflineAction({
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

  afterAddModalOk = ({
    singleData = null,
    // eslint-disable-next-line no-unused-vars
    listData = [],
    // eslint-disable-next-line no-unused-vars
    extraData = null,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData = null,
    // eslint-disable-next-line no-unused-vars
    submitData = null,
  }) => {
    const noticeId = getValueByKey({
      data: singleData,
      key: fieldData.noticeId.name,
      defaultValue: '',
    });

    this.goToPath(`/notice/edit/load/${noticeId}/key/basicInfo`);
  };

  showChangeSortModal = (r) => {
    this.setState(
      {
        currentRecord: r,
      },
      () => {
        ChangeSortModal.open();
      },
    );
  };

  afterChangeSortModalOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  goToAdd = () => {
    AddModal.open();
  };

  goToEdit = (record) => {
    const { noticeId } = record;

    this.goToPath(`/notice/edit/load/${noticeId}/key/basicInfo`);
  };

  goToRead = (record) => {
    const { noticeId } = record;

    this.goToPath(`/notice/detail/${noticeId}`);
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.title,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.customSelect,
          hidden: true,
          component: renderSearchNoticeStatusSelect({}),
        },
        {
          lg: 4,
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
        text: '增加通知公告',
        handleClick: this.goToAdd,
      },
    ];
  };

  establishListItemDropdownConfig = (record) => {
    const status = getValueByKey({
      data: record,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '查阅',
      icon: iconBuilder.read(),
      disabled: !checkHasAuthority(accessWayCollection.notice.get.permission),
      handleButtonClick: ({ handleData }) => {
        this.goToRead(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'updateBasicInfo',
          icon: iconBuilder.edit(),
          text: '编辑',
          hidden: !checkHasAuthority(
            accessWayCollection.notice.updateBasicInfo.permission,
          ),
        },
        {
          key: 'updateSort',
          icon: iconBuilder.edit(),
          text: '设置排序值',
          hidden: !checkHasAuthority(
            accessWayCollection.notice.updateSort.permission,
          ),
        },
        {
          withDivider: true,
          uponDivider: true,
          key: 'setOnline',
          icon: iconBuilder.playCircle(),
          text: '设为上线',
          confirm: true,
          title: '将要设为启用，确定吗？',
          disabled: status === statusCollection.normal,
          hidden: !checkHasAuthority(
            accessWayCollection.notice.setOnline.permission,
          ),
        },
        {
          key: 'setOffline',
          icon: iconBuilder.pauseCircle(),
          text: '设为下线',
          confirm: true,
          title: '将要设为禁用，确定吗？',
          disabled: status === statusCollection.invalid,
          hidden: !checkHasAuthority(
            accessWayCollection.notice.setOffline.permission,
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
            accessWayCollection.notice.refreshCache.permission,
          ),
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.title,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
      render: (value, record, index) => {
        const titleColor = getValueByKey({
          data: record,
          key: fieldData.titleColor.name,
          defaultValue: '',
        });

        const listTag = getValueByKey({
          data: record,
          key: fieldData.listTag.name,
          convert: convertCollection.array,
        });

        return (
          <div>
            <FlexBox
              flexAuto="right"
              left={
                <VerticalBox>
                  <Space>
                    {listTag.map((o, n) => {
                      const color = getValueByKey({
                        data: o,
                        key: fieldDataNoticeTagRelation.color.name,
                        defaultValue: '',
                      });

                      const tagDisplayName = getValueByKey({
                        data: o,
                        key: fieldDataNoticeTagRelation.tagDisplayName.name,
                        defaultValue: '',
                      });

                      return (
                        <div
                          key={`line_${index}_${n}`}
                          style={{
                            border: `1px solid ${color || '#333'}`,
                            borderRadius: '4px',
                            overflow: 'hidden',
                            padding: '0px 6px',
                            color: color || '#333',
                          }}
                        >
                          {tagDisplayName}
                        </div>
                      );
                    })}
                  </Space>
                </VerticalBox>
              }
              right={
                <VerticalBox>
                  <div style={{ color: titleColor, paddingLeft: '10px' }}>
                    {value}
                  </div>
                </VerticalBox>
              }
            />
          </div>
        );
      },
      // facadeConfigBuilder: (value, record) => {
      //   const titleColor = getValueByKey({
      //     data: record,
      //     key: fieldData.titleColor.name,
      //     defaultValue: '',
      //   });

      //   return {
      //     color: titleColor,
      //     addonBefore: '1212',
      //   };
      // },
    },
    {
      dataTarget: fieldData.titleColor,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      hidden: !checkHasAuthority(
        accessWayCollection.notice.updateTitleColor.permission,
      ),
      render: (value) => {
        return (
          <div>
            <FlexBox
              flexAuto="right"
              style={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                overflow: 'hidden',
                padding: '2px',
              }}
              left={
                <CenterBox>
                  <div
                    style={{
                      backgroundColor: value,
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      width: '20px',
                      height: '20px',
                      overflow: 'hidden',
                    }}
                  />
                </CenterBox>
              }
              right={<CenterBox>{value || '无色值'}</CenterBox>}
            />
          </div>
        );
      },
    },
    {
      dataTarget: fieldData.author,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.sort,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
      hidden: !checkHasAuthority(
        accessWayCollection.notice.updateSort.permission,
      ),
    },
    {
      dataTarget: fieldData.status,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      hidden:
        !checkHasAuthority(accessWayCollection.notice.setOffline.permission) &&
        !checkHasAuthority(accessWayCollection.notice.setOnline.permission),
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getNoticeStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.noticeId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
      hidden: !checkHasAuthority(
        accessWayCollection.notice.updateBasicInfo.permission,
      ),
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
        <AddModal afterOK={this.afterAddModalOk} />

        <ChangeSortModal
          externalData={currentRecord}
          afterOK={this.afterChangeSortModalOk}
        />
      </>
    );
  };
}

export default PageList;
