import { ColorPicker } from 'antd';
import React from 'react';

import { connect } from 'easy-soft-dva';
import { getValueByKey, throttle } from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import {
  FlexBox,
  iconBuilder,
  VerticalBox,
} from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../../customConfig';
import { buildUpdateTimeAndOperatorFieldItem } from '../../../../../customSpecialComponents';
import { updateTitleColorAction } from '../../Assist/action';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ notice, schedulingControl }) => ({
  notice,
  schedulingControl,
}))
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.notice.get.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'notice/get',
      submitApiPath: 'notice/updateBasicInfo',
      noticeId: null,
      image: '',
      titleColor: '',
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
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const image = getValueByKey({
      data: metaData,
      key: fieldData.image.name,
    });

    const titleColor = getValueByKey({
      data: metaData,
      key: fieldData.titleColor.name,
    });

    this.setState({ image, titleColor });
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { noticeId, image, titleColor } = this.state;

    d[fieldData.noticeId.name] = noticeId;
    d[fieldData.image.name] = image;
    d[fieldData.titleColor.name] = titleColor;

    return d;
  };

  updateTitleColor = throttle(() => {
    const { noticeId, titleColor } = this.state;

    updateTitleColorAction({
      target: this,
      handleData: { noticeId, titleColor },
    });
  }, 800);

  afterImageUploadSuccess = (image) => {
    this.setState({ image: image });
  };

  changeColor = (color) => {
    this.setState({ titleColor: color || '' }, () => {
      this.updateTitleColor();
    });
  };

  fillInitialValuesAfterLoad = ({
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

      values[fieldData.subtitle.name] = getValueByKey({
        data: metaData,
        key: fieldData.subtitle.name,
      });

      values[fieldData.author.name] = getValueByKey({
        data: metaData,
        key: fieldData.author.name,
      });

      values[fieldData.sort.name] = getValueByKey({
        data: metaData,
        key: fieldData.sort.name,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { firstLoadSuccess, metaData, titleColor } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          hasExtra: true,
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.component,
                component: (
                  <FlexBox
                    flexAuto="right"
                    left={<VerticalBox>标题颜色：</VerticalBox>}
                    right={
                      <div
                        style={{
                          minWidth: '104px',
                        }}
                      >
                        <VerticalBox>
                          <ColorPicker
                            value={titleColor}
                            showText
                            disabled={!firstLoadSuccess}
                            presets={[
                              {
                                label: '常用',
                                colors: [
                                  '#000000',
                                  '#000000E0',
                                  '#000000A6',
                                  '#00000073',
                                  '#00000040',
                                  '#00000026',
                                  '#0000001A',
                                  '#00000012',
                                  '#0000000A',
                                  '#00000005',
                                  '#F5222D',
                                  '#FA8C16',
                                  '#FADB14',
                                  '#8BBB11',
                                  '#52C41A',
                                  '#13A8A8',
                                  '#1677FF',
                                  '#2F54EB',
                                  '#722ED1',
                                  '#EB2F96',
                                  '#F5222D4D',
                                  '#FA8C164D',
                                  '#FADB144D',
                                  '#8BBB114D',
                                  '#52C41A4D',
                                  '#13A8A84D',
                                  '#1677FF4D',
                                  '#2F54EB4D',
                                  '#722ED14D',
                                  '#EB2F964D',
                                ],
                              },
                            ]}
                            onChange={(_, hex) => {
                              this.changeColor(hex);
                            }}
                          />
                        </VerticalBox>
                      </div>
                    }
                  />
                ),
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
              {
                buildType: cardConfig.extraBuildType.save,
              },
            ],
          },
          items: [
            {
              lg: 18,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.title,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.sort,
              require: false,
            },
            {
              lg: 18,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.subtitle,
              require: false,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.author,
              require: false,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '简介 - 描述 - 备注',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
              require: false,
            },
          ],
        },
        buildUpdateTimeAndOperatorFieldItem({ data: metaData, line: 1 }),
      ],
    };
  };
}

export default BasicInfo;
