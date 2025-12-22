import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  datetimeFormat,
  formatDatetime,
  getValueByKey,
} from 'easy-soft-utility';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';
import {
  CenterBox,
  ColorText,
  FlexBox,
  HtmlBox,
} from 'antd-management-fast-component';
import { DataSingleView } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { parseUrlParametersForSetState } from '../Assist/config';
import { fieldData } from '../Common/data';

const { DataLoad } = DataSingleView;

@connect(({ notice, schedulingControl }) => ({
  notice,
  schedulingControl,
}))
class Detail extends DataLoad {
  resetDataAfterLoad = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '通告详情',
      loadApiPath: modelTypeCollection.noticeTypeCollection.get,
      parentId: '',
      parentName: '',
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

  renderPresetContentArea = () => {
    const { metaData } = this.state;

    const title = getValueByKey({
      data: metaData,
      key: fieldData.title.name,
      defaultValue: '',
    });

    const subtitle = getValueByKey({
      data: metaData,
      key: fieldData.subtitle.name,
      defaultValue: '',
    });

    const author = getValueByKey({
      data: metaData,
      key: fieldData.author.name,
      defaultValue: '',
    });

    let createTime = getValueByKey({
      data: metaData,
      key: fieldData.createTime.name,
      defaultValue: '',
    });

    createTime = formatDatetime({
      data: createTime,
      format: datetimeFormat.yearMonthDay,
    });

    const contentData = getValueByKey({
      data: metaData,
      key: fieldData.contentData.name,
      defaultValue: '',
    });

    return (
      <div>
        <CenterBox>
          <div
            style={{
              width: '1000px',
              backgroundColor: '#fff',
              padding: '20px',
              minHeight: '760px',
            }}
          >
            <div>
              <CenterBox>
                <div
                  style={{
                    fontSize: '25px',
                    fontFamily: '黑体',
                    fontWeight: 'bold',
                    lineHeight: '36px',
                  }}
                >
                  {title}
                </div>
              </CenterBox>
            </div>

            {checkStringIsNullOrWhiteSpace(subtitle) ? null : (
              <div>
                <CenterBox>
                  <div
                    style={{
                      fontSize: '18px',
                      lineHeight: '24px',
                      fontWeight: 'bold',
                      color: '#6b6b6b',
                    }}
                  >
                    {subtitle}
                  </div>
                </CenterBox>
              </div>
            )}

            <div
              style={{
                borderBottom: '1px solid #ccc',
                paddingTop: '10px',
                paddingBottom: '6px',
              }}
            >
              <CenterBox>
                {checkStringIsNullOrWhiteSpace(author) ? (
                  <ColorText
                    textPrefix="发布时间"
                    separator=": "
                    text={createTime || '暂无'}
                    color={
                      checkStringIsNullOrWhiteSpace(createTime) ? '#bbb' : ''
                    }
                  />
                ) : (
                  <div style={{ width: '240px' }}>
                    <FlexBox
                      flexAuto="left"
                      left={
                        <ColorText
                          textPrefix={fieldData.author.label}
                          separator=": "
                          text={author || '暂无'}
                          color={
                            checkStringIsNullOrWhiteSpace(author) ? '#bbb' : ''
                          }
                        />
                      }
                      right={
                        <ColorText
                          textPrefix="时间"
                          separator=": "
                          text={createTime || '暂无'}
                          color={
                            checkStringIsNullOrWhiteSpace(createTime)
                              ? '#bbb'
                              : ''
                          }
                        />
                      }
                    />
                  </div>
                )}
              </CenterBox>
            </div>

            <div
              style={{
                paddingTop: '10px',
                fontSize: '16px',
                lineHeight: '30px',
              }}
            >
              <HtmlBox html={contentData} />
            </div>
          </div>
        </CenterBox>
      </div>
    );
  };
}

export default Detail;
