import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  isArray,
  isEmptyArray,
  showSimpleErrorMessage,
  showSimpleInfoMessage,
  toNumber,
  toString,
  zeroInt,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  getDerivedStateFromPropertiesForUrlParameters,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  buildButton,
  buildFlexSelect,
  CenterBox,
  convertOptionOrRadioData,
  iconBuilder,
} from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../../../customConfig';
import { refitNoticeTargetModeList } from '../../../../../../customSpecialComponents';
import {
  addBatchAction,
  refreshCacheAction,
  removeAction,
} from '../../../../NoticeUserRelation/Assist/action';
import { fieldData } from '../../../../NoticeUserRelation/Common/data';
import { fieldData as fieldDataUser } from '../../../../User/Common/data';
import { SelectDrawerButton as UserSelectDrawerButton } from '../../../../User/SelectDrawerButton';
import { getAction, setTargetModeAction } from '../../../Assist/action';
import { parseUrlParametersForSetState } from '../../../Assist/config';
import {
  fieldData as fieldDataNotice,
  targetModeCollection,
} from '../../../Common/data';

const { InnerMultiPage } = DataMultiPageView;

@connect(({ noticeUserRelation, schedulingControl }) => ({
  noticeUserRelation,
  schedulingControl,
}))
class PageList extends InnerMultiPage {
  componentAuthority =
    accessWayCollection.noticeUserRelation.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      showOverlay: false,
      loadApiPath: 'noticeUserRelation/pageList',
      noticeId: null,
      currentRecord: null,
      targetMode: '',
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

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { noticeId } = this.state;

    d.noticeId = noticeId;

    return d;
  };

  doOtherRemoteRequest = () => {
    const { noticeId } = this.state;

    getAction({
      target: this,
      handleData: { noticeId },
      successCallback: ({ target, remoteData }) => {
        const targetMode = getValueByKey({
          data: remoteData,
          key: fieldDataNotice.targetMode.name,
          convert: convertCollection.number,
        });

        this.showSearchForm =
          toNumber(targetMode) === targetModeCollection.user;

        target.setState({
          targetMode: targetMode === zeroInt ? '' : toString(targetMode),
          showOverlay: toNumber(targetMode) !== targetModeCollection.user,
        });

        if (checkStringIsNullOrWhiteSpace(targetMode)) {
          showSimpleInfoMessage('当前通告尚未选择对象模式, 请选择并保存');
        }
      },
    });
  };

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const { other } = { other: {}, ...metaExtra };

    const { noticeId, targetMode } = {
      noticeId: '',
      targetMode: 0,
      targetModeNote: '',
      ...other,
    };

    this.setState({
      showTargetModeToolbar: !checkStringIsNullOrWhiteSpace(noticeId),
      targetMode,
    });
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'remove': {
        this.remove(handleData);
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

  setTargetMode = () => {
    const { noticeId, targetMode } = this.state;

    const that = this;

    setTargetModeAction({
      target: that,
      handleData: {
        noticeId,
        targetMode,
      },
      successCallback: ({ target }) => {
        this.showSearchForm =
          toNumber(targetMode) === targetModeCollection.user;

        target.refreshDataWithReloadAnimalPrompt({
          otherState: {
            showOverlay: toNumber(targetMode) !== targetModeCollection.user,
          },
          beforeRequest: () => {
            that.pageValues.pageNo = 1;
            that.pageValues.frontendPageNo = 1;
          },
        });
      },
    });
  };

  addBatch = (listUser) => {
    const { noticeId } = this.state;

    if (!isArray(listUser)) {
      showSimpleErrorMessage('用户标识集合无效');
    }

    if (isEmptyArray(listUser)) {
      showSimpleErrorMessage('用户标识集合数据无效');
    }

    const userIdCollection = listUser
      .map((o) => {
        const userId = getValueByKey({
          data: o,
          key: fieldDataUser.userId.name,
          defaultValue: '',
        });

        return userId;
      })
      .join(',');

    const that = this;

    addBatchAction({
      target: that,
      handleData: {
        noticeId,
        userIdCollection,
      },
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({
          beforeRequest: () => {
            that.pageValues.pageNo = 1;
            that.pageValues.frontendPageNo = 1;
          },
        });
      },
    });
  };

  remove = (record) => {
    const noticeId = getValueByKey({
      data: record,
      key: fieldData.noticeId.name,
      defaultValue: '',
    });

    const userId = getValueByKey({
      data: record,
      key: fieldData.userId.name,
      defaultValue: '',
    });

    removeAction({
      target: this,
      handleData: {
        noticeId,
        userId,
      },
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
  };

  refreshCache = (record) => {
    refreshCacheAction({
      target: this,
      handleData: record,
    });
  };

  establishToolBarConfig = () => {
    const { targetMode } = this.state;

    const list = refitNoticeTargetModeList({ withUnlimited: false });

    return {
      stick: false,
      title: '调整可浏览对象',
      tools: [
        {
          hidden: false,
          component: buildFlexSelect({
            style: { minWidth: '300px' },
            label: '当前模式',
            innerProps: {
              value: toString(targetMode),
              placeholder: '请选择对象模式',
            },
            list: list,
            dataConvert: convertOptionOrRadioData,
            onChange: (v) => {
              this.setState({ targetMode: v });
            },
          }),
        },
        {
          title: '保存',
          component: buildButton({
            text: '保存',
            type: 'primary',
            handleClick: () => {
              this.setTargetMode();
            },
            disabled: false,
          }),
        },
      ],
    };
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.realName,
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
        buildType: listViewConfig.dataContainerExtraActionBuildType.component,
        component: (
          <UserSelectDrawerButton
            label="选择用户"
            text="选择用户"
            icon={iconBuilder.select()}
            afterSelectSuccess={(o) => {
              this.addBatch(o);
            }}
          />
        ),
      },
    ];
  };

  establishListItemDropdownConfig = (item) => {
    return {
      size: 'small',
      text: '详情',
      icon: iconBuilder.read(),
      disabled: !checkHasAuthority(
        accessWayCollection.noticeUserRelation.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.showPreviewDrawer(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'remove',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.delete(),
          text: '移除信息',
          hidden: !checkHasAuthority(
            accessWayCollection.noticeUserRelation.remove.permission,
          ),
          confirm: {
            title: '将要移除信息，确定吗？',
          },
        },
        {
          key: 'refreshCache',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.noticeUserRelation.refreshCache.permission,
          ),
          confirm: {
            title: '即将刷新缓存，确定吗？',
          },
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldDataUser.avatar,
      width: 60,
      showRichFacade: true,
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.realName,
      width: 200,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.subsidiaryShortName,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.userId,
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

  renderPresetListMainViewOverlayContent = () => {
    return (
      <CenterBox>
        <div
          style={{
            borderRadius: '6px',
            width: '200px',
            height: '50px',
            backgroundColor: 'rgba(200,200,200,0.5)',
            border: '2px solid #a0c8f3',
          }}
        >
          <CenterBox>仅限 ”特定用户“ 模式下可用</CenterBox>
        </div>
      </CenterBox>
    );
  };
}

export default PageList;
