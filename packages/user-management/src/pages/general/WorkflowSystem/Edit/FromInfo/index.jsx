import { Empty } from 'antd';
import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  showSimpleInfoMessage,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import {
  buildButton,
  ColorText,
  iconBuilder,
} from 'antd-management-fast-component';
import {
  FileViewer,
  SchemaDisplayer,
} from 'antd-management-fast-design-playground';

import { accessWayCollection } from '../../../../../customConfig';
import { fieldData as fieldDataWorkflowFormDesign } from '../../../WorkflowFormDesign/Common/data';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ workflowFormDesign, schedulingControl }) => ({
  workflowFormDesign,
  schedulingControl,
}))
class FromInfo extends TabPageBase {
  componentAuthority =
    accessWayCollection.workflowFormDesign.getByWorkflow.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'workflowFormDesign/getByWorkflow',
      workflowId: null,
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

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { workflowId } = this.state;

    d[fieldData.workflowId.name] = workflowId;

    return d;
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
      values[fieldData.name.name] = getValueByKey({
        data: metaData,
        key: fieldData.name.name,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    const designJson = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowFormDesign.designSchema.name,
    });

    const dataSchemaList = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowFormDesign.dataSchemaList.name,
      convert: convertCollection.array,
    });

    const hasDataSchema = dataSchemaList.length > 0;

    const designData = {
      form: {},
      schema: {},
      ...(checkStringIsNullOrWhiteSpace(designJson)
        ? {}
        : JSON.parse(designJson)),
    };

    const remarkSchemaList = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowFormDesign.remarkSchemaList.name,
      convert: convertCollection.array,
    });

    const remarkColor = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowFormDesign.remarkColor.name,
      defaultValue: '',
    });

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '设计预览',
          },
          hasExtra: true,
          extra: {
            affix: true,
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
              component: (
                <div>
                  <SchemaDisplayer
                    {...designData}
                    helpBoxProps={
                      {
                        // showNumber: false,
                      }
                    }
                    descriptionTitleColor={remarkColor}
                    descriptionLabelColor={remarkColor}
                    descriptionTextColor={remarkColor}
                    descriptions={remarkSchemaList}
                    descriptionUpperLabel="附件列表"
                    descriptionUpperComponent={
                      <FileViewer
                        canUpload
                        canRemove
                        list={[
                          {
                            key: '100',
                            name: '示例文件.doc',
                            link: 'http://file.abc.net/simple.doc',
                          },
                        ]}
                        dataTransfer={(o) => {
                          return {
                            ...o,
                            alias: getValueByKey({
                              data: o,
                              name: '示例文件.doc',
                              key: '',
                            }),
                            url: getValueByKey({
                              data: o,
                              key: 'link',
                            }),
                          };
                        }}
                        nameRender={(v) => {
                          return (
                            <ColorText
                              textPrefix={v}
                              separator=""
                              text={'【已加密】'}
                              color={'green'}
                            />
                          );
                        }}
                        onUploadButtonClick={() => {
                          showSimpleInfoMessage('示例: 点击上传按钮');
                        }}
                        onItemClick={() => {
                          showSimpleInfoMessage('示例: 点击条目按钮');
                        }}
                        onRemove={() => {
                          showSimpleInfoMessage('示例: 点击移除按钮');
                        }}
                      />
                    }
                    showSubmit
                    showSubmitDivider
                    submitButtonText="保存表单"
                    buttonAfterSubmitBuilder={() => {
                      return (
                        <>
                          {buildButton({
                            type: 'primary',
                            icon: iconBuilder.checkCircle(),
                            text: '同意审批',
                            handleData: metaData,
                            handleClick: () => {
                              showSimpleInfoMessage('示例: 点击同意审批');
                            },
                          })}

                          {buildButton({
                            type: 'primary',
                            danger: true,
                            icon: iconBuilder.closeCircle(),
                            text: '拒绝审批',
                            handleData: metaData,
                            handleClick: () => {
                              showSimpleInfoMessage('示例: 点击拒绝审批');
                            },
                          })}
                        </>
                      );
                    }}
                    onSubmit={() => {
                      showSimpleInfoMessage('示例: 点击提交按钮');
                    }}
                  >
                    {hasDataSchema ? null : (
                      <Empty description="暂无表单设计，请点击 “表单设计” 按钮进行设计" />
                    )}
                  </SchemaDisplayer>
                </div>
              ),
            },
          ],
        },
      ],
    };
  };
}

export default FromInfo;
