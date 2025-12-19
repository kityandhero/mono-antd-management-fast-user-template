import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { buildCustomGrid, iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import { buildUpdateTimeAndOperatorFieldItem } from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';
import { UpdateRepayContentModal } from '../UpdateRepayContentModal';

const { BaseLoadDrawer } = DataDrawer;
const visibleFlag = '48b734c65f4441b5814930b607a0ba97';
@connect(({ subsidiaryComplaintMessage, schedulingControl }) => ({
  subsidiaryComplaintMessage,
  schedulingControl,
}))
class PreviewDrawer extends BaseLoadDrawer {
  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '举报信息',
      loadApiPath:
        modelTypeCollection.subsidiaryComplaintMessageTypeCollection.get,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.subsidiaryComplaintMessageId.name] = getValueByKey({
      data: externalData,
      key: fieldData.subsidiaryComplaintMessageId.name,
    });

    return d;
  };

  showUpdateRepayContentModal = () => {
    UpdateRepayContentModal.open();
  };

  afterUpdateRepayContentModalOK = () => {
    this.reloadData({});
  };

  establishCardCollectionConfig = () => {
    const { firstLoadSuccess, metaData } = this.state;

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

    const that = this;

    return {
      list: [
        {
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
                icon: iconBuilder.edit(),
                text: '更新回复',
                disabled: !firstLoadSuccess,
                hidden: !checkHasAuthority(
                  accessWayCollection.subsidiaryReportMessage.repay.permission,
                ),
                handleClick: () => {
                  that.showUpdateRepayContentModal();
                },
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
                    label: fieldData.replyContent.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.replyContent.name,
                    }),
                  },
                  {
                    span: 2,
                    label: fieldData.replyTime.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.replyTime.name,
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
        buildUpdateTimeAndOperatorFieldItem({
          data: metaData,
          line: 2,
          additionalDataConfig: [
            {
              span: 1,
              fieldData: fieldData.subsidiaryComplaintMessageId,
            },
            {
              span: 1,
              fieldData: fieldData.subsidiaryShortName,
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
              fieldData: fieldData.channelNote,
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

  renderPresetOther = () => {
    const { metaData } = this.state;

    return (
      <>
        <UpdateRepayContentModal
          externalData={metaData}
          afterOK={() => {
            this.afterUpdateRepayContentModalOK();
          }}
        />
      </>
    );
  };
}

export { PreviewDrawer };
