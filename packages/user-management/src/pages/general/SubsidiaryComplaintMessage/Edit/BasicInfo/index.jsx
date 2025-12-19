import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  showSimpleSuccessMessage,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { buildCustomGrid, iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../../customConfig';
import { buildUpdateTimeAndOperatorFieldItem } from '../../../../../customSpecialComponents';
import { replyAction } from '../../Assist/action';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ subsidiaryComplaintMessage, schedulingControl }) => ({
  subsidiaryComplaintMessage,
  schedulingControl,
}))
class Index extends TabPageBase {
  reloadHeaderOnSubmitSuccess = true;

  componentAuthority =
    accessWayCollection.subsidiaryComplaintMessage.get.permission;

  replyContent = '';

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'subsidiaryComplaintMessage/get',
      submitApiPath: 'subsidiaryComplaintMessage/updateBasicInfo',
      subsidiaryComplaintMessageId: null,
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

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    this.replyContent = getValueByKey({
      data: metaData,
      key: fieldData.replyContent.name,
    });
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { subsidiaryComplaintMessageId } = this.state;

    d[fieldData.subsidiaryComplaintMessageId.name] =
      subsidiaryComplaintMessageId;

    return d;
  };

  replyMessage = () => {
    const { subsidiaryComplaintMessageId } = this.state;

    replyAction({
      target: this,
      handleData: {
        subsidiaryComplaintMessageId,
        replyContent: this.replyContent,
      },
      successCallback: () => {
        showSimpleSuccessMessage('回复保存成功');
      },
    });
  };

  onRepayChange = (v) => {
    this.replyContent = v;
  };

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    if (metaData != null) {
      values[fieldData.title.name] = getValueByKey({
        data: metaData,
        key: fieldData.title.name,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });

      values[fieldData.replyContent.name] = getValueByKey({
        data: metaData,
        key: fieldData.replyContent.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { firstLoadSuccess, metaData } = this.state;

    const that = this;

    const listAttachment = getValueByKey({
      data: metaData,
      key: fieldData.listAttachment.name,
      convert: convertCollection.array,
    });

    const imageList = listAttachment.map((item) => {
      const { url } = {
        url: '',
        ...item,
      };
      return url;
    });

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          hasExtra: true,
          extra: {
            list: [
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: buildCustomGrid({
                list: [
                  {
                    span: 2,
                    label: fieldData.subsidiaryComplaintCategoryName.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.subsidiaryComplaintCategoryName.name,
                    }),
                  },
                  {
                    span: 2,
                    label: fieldData.title.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.title.name,
                    }),
                  },
                  {
                    span: 2,
                    label: fieldData.description.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.description.name,
                    }),
                  },
                ],
                props: {
                  bordered: true,
                  column: 2,
                  size: 'small',
                  labelStyle: {
                    width: '100px',
                  },
                  emptyValue: '暂无',
                  emptyStyle: {
                    color: '#ccc',
                  },
                },
              }),
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: '附件列表',
              innerProps: {
                style: {
                  margin: '16px 0 16px 0',
                },
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.imageListShow,
              imageList,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '投诉人信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: buildCustomGrid({
                list: [
                  {
                    span: 2,
                    label: fieldData.customerFriendlyName.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.customerFriendlyName.name,
                    }),
                  },
                  {
                    span: 1,
                    label: fieldData.customerId.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.customerId.name,
                    }),
                  },
                  {
                    span: 1,
                    label: fieldData.customerPhone.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.customerPhone.name,
                    }),
                  },
                ],
                props: {
                  bordered: true,
                  column: 2,
                  size: 'small',
                  labelStyle: {
                    width: '100px',
                  },
                  emptyValue: '暂无',
                  emptyStyle: {
                    color: '#ccc',
                  },
                },
              }),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '回复内容',
          },
          hasExtra: true,
          extra: {
            list: [
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'primary',
                icon: iconBuilder.enable(),
                text: '保存回复',
                disabled: !firstLoadSuccess,
                hidden: !checkHasAuthority(
                  accessWayCollection.subsidiaryComplaintMessage.repay
                    .permission,
                ),
                handleClick: () => {
                  that.replyMessage();
                },
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.replyContent,
              innerProps: {
                onChange: (event) => {
                  const {
                    target: { value: v },
                  } = event;

                  that.onRepayChange(v);
                },
              },
            },
          ],
        },
        buildUpdateTimeAndOperatorFieldItem({
          data: metaData,
          line: 1,
          additionalDataConfig: [
            {
              span: 2,
              fieldData: fieldData.subsidiaryShortName,
            },
            {
              span: 2,
              fieldData: fieldData.channelNote,
            },
            {
              span: 1,
              fieldData: fieldData.subsidiaryComplaintMessageId,
            },
            {
              span: 1,
              fieldData: fieldData.whetherConfirmNote,
            },
            {
              span: 1,
              fieldData: fieldData.whetherReplyNote,
            },

            {
              span: 1,
              fieldData: fieldData.statusNote,
            },
          ],
        }),
      ],
    };
  };
}

export default Index;
