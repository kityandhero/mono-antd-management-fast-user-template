import DocViewer from '@cyntler/react-doc-viewer';

import { connect } from 'easy-soft-dva';
import {
  checkInCollection,
  convertCollection,
  formatCollection,
  getValueByKey,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { buildPlayer, iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { fileTypeCollection } from '../../../../customConfig';
import { getCloudStorageStatusName } from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseLoadDrawer } = DataDrawer;

const visibleFlag = '54cd6a532ee94eefb3c400f65404acd4';

@connect(({ noticeAttachment, schedulingControl }) => ({
  noticeAttachment,
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
      pageTitle: '附件详细',
      loadApiPath: modelTypeCollection.noticeAttachmentTypeCollection.get,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.noticeAttachmentId = getValueByKey({
      data: externalData,
      key: fieldData.noticeAttachmentId.name,
    });

    return d;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: fieldData.alias.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.alias.name,
                  }),
                },
                {
                  label: fieldData.name.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.name.name,
                  }),
                },
                {
                  label: fieldData.size.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.size.name,
                  }),
                },
                {
                  label: fieldData.suffix.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.suffix.name,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.url.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.url.name,
                  }),
                },
              ],
              props: {
                bordered: true,
                size: 'small',
                column: 2,
                labelStyle: {
                  width: '90px',
                },
                emptyValue: '暂无',
                ellipsis: false,
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.read(),
            text: '预览',
          },
          hidden: !checkInCollection(
            [fileTypeCollection.audio, fileTypeCollection.video],
            getValueByKey({
              data: metaData,
              key: fieldData.fileType.name,
              convert: convertCollection.number,
            }),
          ),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: buildPlayer({
                url: getValueByKey({
                  data: metaData,
                  key: fieldData.url.name,
                }),
              }),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.read(),
            text: '预览',
          },
          hidden: checkInCollection(
            [fileTypeCollection.audio, fileTypeCollection.video],
            getValueByKey({
              data: metaData,
              key: fieldData.fileType.name,
              convert: convertCollection.number,
            }),
          ),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <DocViewer
                  config={{
                    header: {
                      disableHeader: true,
                      disableFileName: true,
                      retainURLParams: false,
                    },
                    csvDelimiter: ',', // "," as default,
                    pdfZoom: {
                      defaultZoom: 1.1, // 1 as default,
                      zoomJump: 0.2, // 0.1 as default,
                    },
                    pdfVerticalScrollByDefault: true, // false as default
                  }}
                  style={{ height: 600 }}
                  documents={[
                    {
                      uri: getValueByKey({
                        data: metaData,
                        key: fieldData.url.name,
                      }),
                    },
                  ]}
                  initialActiveDocument={{
                    uri: getValueByKey({
                      data: metaData,
                      key: fieldData.url.name,
                    }),
                  }}
                />
              ),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '其他信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 2,
                  label: fieldData.status.label,
                  value: getCloudStorageStatusName({
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.status.name,
                    }),
                  }),
                },
                {
                  label: fieldData.createOperatorId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.createOperatorId.name,
                  }),
                },
                {
                  label: fieldData.createTime.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.createTime.name,
                    format: formatCollection.datetime,
                  }),
                },
                {
                  label: fieldData.noticeAttachmentId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.noticeAttachmentId.name,
                  }),
                },
                {
                  label: fieldData.updateTime.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.updateTime.name,
                    format: formatCollection.datetime,
                  }),
                },
              ],
              props: {
                bordered: true,
                size: 'small',
                column: 2,
                labelStyle: {
                  width: '90px',
                },
                emptyValue: '暂无',
                ellipsis: false,
              },
            },
          ],
        },
      ],
    };
  };
}

export { PreviewDrawer };
