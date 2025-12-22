import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
} from 'easy-soft-utility';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import {
  DataTabContainerSupplement,
  getNoticeStatusName,
} from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import {
  refreshCacheAction,
  setOfflineAction,
  setOnlineAction,
} from '../Assist/action';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../Assist/config';
import { fieldData, statusCollection } from '../Common/data';

@connect(({ notice, schedulingControl }) => ({
  notice,
  schedulingControl,
}))
class Detail extends DataTabContainerSupplement {
  componentAuthority = accessWayCollection.notice.get.permission;

  tabList = [
    {
      key: 'basicInfo',
      hidden: !checkHasAuthority(accessWayCollection.notice.get.permission),
      tab: '基本信息',
    },
    {
      key: 'contentInfo',
      hidden: !checkHasAuthority(accessWayCollection.notice.get.permission),
      tab: '图文信息',
      label: '图文信息',
    },
    {
      key: 'attachmentInfo/pageList',
      hidden: !checkHasAuthority(
        accessWayCollection.noticeAttachment.pageList.permission,
      ),
      tab: '附件信息',
    },
    {
      key: 'tagInfo/pageList',
      hidden: !checkHasAuthority(
        accessWayCollection.noticeTagRelation.pageList.permission,
      ),
      tab: '标签设置',
    },
    {
      key: 'surveyInfo/pageList',
      hidden: !checkHasAuthority(
        accessWayCollection.noticeUserRelation.pageList.permission,
      ),
      tab: '浏览设置',
    },
    {
      key: 'operateLog/pageList',
      hidden: !checkHasAuthority(
        accessWayCollection.notice.pageListOperateLog.permission,
      ),
      tab: '操作日志',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath: modelTypeCollection.noticeTypeCollection.get,
      backPath: `/notice/pageList/key`,
      noticeId: null,
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
    const { noticeId } = this.state;

    d.noticeId = noticeId;

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
    switch (key) {
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
      // eslint-disable-next-line no-unused-vars
      successCallback: ({ target, handleData, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.status.name] = getValueByKey({
          data: remoteData,
          key: fieldData.status.name,
        });

        target.setState({ metaData });
      },
    });
  };

  setOffline = (r) => {
    setOfflineAction({
      target: this,
      handleData: r,
      // eslint-disable-next-line no-unused-vars
      successCallback: ({ target, handleData, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.status.name] = getValueByKey({
          data: remoteData,
          key: fieldData.status.name,
        });

        target.setState({ metaData });
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  establishPageHeaderTitlePrefix = () => {
    return '通告';
  };

  establishExtraActionGroupConfig = () => {
    const { metaData } = this.state;

    if (metaData == null) {
      return null;
    }

    const status = getValueByKey({
      data: metaData,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    const that = this;

    return {
      buttons: [
        {
          key: 'setOnline',
          text: '设为上线',
          icon: iconBuilder.playCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setOnline(handleData);
          },
          disabled: status === statusCollection.online,
          confirm: true,
          title: '即将设为上线，确定吗？',
          handleData: metaData,
        },
        {
          key: 'setOffline',
          text: '设为下线',
          icon: iconBuilder.pauseCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setOffline(handleData);
          },
          disabled: status === statusCollection.offline,
          confirm: true,
          title: '即将设为下线，确定吗？',
          handleData: metaData,
        },
      ],
    };
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
            accessWayCollection.notice.refreshCache.permission,
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
      text: getNoticeStatusName({
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
        label: fieldData.noticeId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.noticeId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.sort.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.sort.name,
        }),
      },
      {
        label: fieldData.author.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.author.name,
          defaultValue: '暂无',
        }),
      },
      {
        label: fieldData.subsidiaryShortName.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.subsidiaryShortName.name,
          defaultValue: '无',
        }),
      },
    ];
  };
}

export default Detail;
