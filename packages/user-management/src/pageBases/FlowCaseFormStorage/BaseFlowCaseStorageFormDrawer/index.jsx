import { Empty, Table, Watermark } from 'antd';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  filter,
  getValueByKey,
  isArray,
  isEmptyArray,
  logException,
  whetherNumber,
} from 'easy-soft-utility';

import { extraBuildType } from 'antd-management-fast-common';
import {
  CenterBox,
  ColorText,
  iconBuilder,
} from 'antd-management-fast-component';
import {
  DocumentPrintDesigner,
  FileViewer,
  nodeApply,
  nodeAttention,
  SchemaDisplayer,
} from 'antd-management-fast-design-playground';
import { DataDrawer } from 'antd-management-fast-framework';

import {
  emptySignet,
  fieldDataFlowCase,
  fieldDataFlowCaseFormAttachment,
  fieldDataFlowCaseFormStorage,
  fieldDataFlowFormDesign,
  flowApproveActionModeCollection,
  flowCaseStatusCollection,
  signetStyle,
} from '../../../customConfig';
import { buildFlowCaseFormInitialValues, SealImage } from '../../../flowAssist';

const { BaseVerticalFlexDrawer } = DataDrawer;

class BaseFlowCaseStorageFormDrawer extends BaseVerticalFlexDrawer {
  useFormWrapper = false;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      width: 1024,
      workflowId: null,
      canEdit: whetherNumber.no,
      currentAttachment: null,
      workflowFormDesign: null,
      listChainApprove: [],
      listFormStorage: [],
      listProcessHistory: [],
      listApprove: [],
      listAttachment: [],
      useDocumentDisplay: true,
      overlayButtonOpenText: '查看键值信息',
      overlayButtonCloseText: '关闭键值信息',
    };
  }

  getProperties = () => {
    return {
      showIndependentPrint: false,
      ...this.props,
    };
  };

  getFlowCaseId = () => {
    throw new Error('getFlowCaseId need overrode to implement');
  };

  loadChainApprove = () => {};

  reloadChainApprove = () => {
    this.loadChainApprove();
  };

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.loadChainApprove();
  };

  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.setState({
      workflowId: null,
      metaData: null,
      currentAttachment: null,
      workflowFormDesign: null,
      listChainApprove: [],
      listFormStorage: [],
      listProcessHistory: [],
      listApprove: [],
      listAttachment: [],
      useDocumentDisplay: true,
    });
  };

  supplementLoadRequestParams = (o) => {
    return {
      ...this.supplementRequestParams(o),
    };
  };

  supplementRequestParams = (o) => o;

  supplementSubmitRequestParams = (o) => {
    return {
      ...o,
      ...this.supplementRequestParams(o),
    };
  };

  doOtherAfterLoadSuccess = ({ metaData }) => {
    const canEdit = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.canEdit.name,
      convert: convertCollection.number,
    });

    const listFormStorage = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.listFormStorage.name,
      convert: convertCollection.array,
      defaultValue: [],
    });

    const listProcessHistory = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.listProcessHistory.name,
      convert: convertCollection.array,
      defaultValue: [],
    });

    const listAttachment = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.listAttachment.name,
      convert: convertCollection.array,
      defaultValue: [],
    });

    const workflowFormDesign = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.workflowFormDesign.name,
      defaultValue: null,
    });

    const flowCaseStatus = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.status.name,
      defaultValue: {},
    });

    const listApprove = filter(listProcessHistory, (one) => {
      const { approveActionMode } = {
        approveActionMode: 0,
        ...one,
      };

      return (
        approveActionMode === flowApproveActionModeCollection.manualControl
      );
    }).map((o) => {
      const {
        note,
        approveWorkflowNodeName,
        approveUserName,
        approveUserSignet,
        createTime,
      } = {
        approveWorkflowNodeName: '',
        note: '',
        approveUserName: '张三',
        approveUserSignet: '',
        createTime: '',
        ...o,
      };

      return {
        ...o,
        title: approveWorkflowNodeName,
        note: note || '未填写',
        name: approveUserName,
        signet: approveUserSignet || emptySignet,
        time: createTime,
      };
    });

    this.setState({
      useDocumentDisplay: checkInCollection(
        [
          flowCaseStatusCollection.submitApproval,
          flowCaseStatusCollection.inApprovalProcess,
          flowCaseStatusCollection.success,
          flowCaseStatusCollection.refuse,
          flowCaseStatusCollection.disuse,
        ],
        flowCaseStatus,
      ),
      workflowFormDesign,
      canEdit,
      listFormStorage: [...listFormStorage],
      listProcessHistory: [...listProcessHistory],
      listAttachment: [...listAttachment],
      listApprove: [...listApprove],
    });
  };

  // eslint-disable-next-line no-unused-vars
  removeAttachment = (o) => {
    throw new Error('removeAttachment need overrode to implement');
  };

  saveForm = (o) => {
    const that = this;

    that.execSubmitApi({
      values: o,
      successCallback: () => {
        that.doOtherAfterSaveForm();
      },
    });
  };

  doOtherAfterSaveForm = () => {};

  getApplicantConfig = () => {
    const { metaData } = this.state;

    const applicantSignSwitch = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.applicantSignSwitch.name,
      convert: convertCollection.number,
    });

    const applicantStatementTitle = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.applicantStatementTitle.name,
      convert: convertCollection.string,
    });

    const applicantStatementContent = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.applicantStatementContent.name,
      convert: convertCollection.string,
    });

    const applicantUserSignet = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.applicantUserSignet.name,
      convert: convertCollection.string,
    });

    const listApply = [
      {
        ...nodeApply,
        title: applicantStatementTitle,
        note: applicantStatementContent,
        ...(checkStringIsNullOrWhiteSpace(applicantUserSignet)
          ? {
              signet: emptySignet,
            }
          : {
              signet: applicantUserSignet,
            }),
        time: getValueByKey({
          data: metaData,
          key: fieldDataFlowCase.applicantTime.name,
          convert: convertCollection.string,
        }),
      },
    ];

    return {
      showApply: applicantSignSwitch === whetherNumber.yes,
      listApply,
    };
  };

  getAttentionConfig = () => {
    const { metaData } = this.state;

    const attentionSignSwitch = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.attentionSignSwitch.name,
      convert: convertCollection.number,
    });

    const attentionStatementTitle = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.attentionStatementTitle.name,
      convert: convertCollection.string,
    });

    const attentionStatementContent = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.attentionStatementContent.name,
      convert: convertCollection.string,
    });

    const attentionUserSignet = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.attentionUserSignet.name,
      convert: convertCollection.string,
    });

    const listAttention = [
      {
        ...nodeAttention,
        title: attentionStatementTitle,
        note: attentionStatementContent,
        ...(checkStringIsNullOrWhiteSpace(attentionUserSignet)
          ? {
              signet: emptySignet,
            }
          : {
              signet: attentionUserSignet,
            }),
        time: getValueByKey({
          data: metaData,
          key: fieldDataFlowCase.attentionTime.name,
          convert: convertCollection.string,
        }),
      },
    ];

    return {
      showAttention: attentionSignSwitch === whetherNumber.yes,
      listAttention,
    };
  };

  showAddAttachmentModal = () => {
    throw new Error('showAddAttachmentModal need overrode to implement');
  };

  afterAddAttachmentModalClose = () => {
    this.reloadData({});
  };

  showFlowCaseFormAttachmentPreviewDrawer = (item) => {
    const that = this;

    that.setState(
      {
        currentAttachment: item,
      },
      () => {
        that.openFlowCaseFormAttachmentPreviewDrawer();
      },
    );
  };

  openFlowCaseFormAttachmentPreviewDrawer = () => {
    throw new Error(
      'openFlowCaseFormAttachmentPreviewDrawer need overrode to implement',
    );
  };

  establishExtraActionConfig = () => {
    const { canEdit, useDocumentDisplay } = this.state;

    if (canEdit != whetherNumber.yes) {
      return null;
    }

    const that = this;

    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.read(),
          text: '文档模式',
          disabled: useDocumentDisplay,
          handleClick: () => {
            that.setState({
              useDocumentDisplay: true,
            });
          },
        },
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.form(),
          text: '表单模式',
          disabled: !useDocumentDisplay,

          handleClick: () => {
            that.setState({
              useDocumentDisplay: false,
            });
          },
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '提交表单仅保存填充的信息。',
        },
        {
          text: '附件上传或删除后立即生效, 无需通过提交表单进行保存。',
        },
        {
          text: '处于审批中或审批已完成的流程实例表单不可编辑。',
        },
      ],
    };
  };

  renderFlowCaseFormDocumentDisplay = () => {
    const {
      metaData,
      canEdit,
      workflowFormDesign,
      listFormStorage,
      listApprove,
      listChainApprove,
      listAttachment,
    } = this.state;

    const { showIndependentPrint } = this.getProperties();

    const flowCaseId = this.getFlowCaseId();

    const qRCodeImage = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.qRCodeImage.name,
      convert: convertCollection.string,
    });

    const status = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.status.name,
      convert: convertCollection.number,
    });

    const watermarkVisibility = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.watermarkVisibility.name,
      convert: convertCollection.number,
      defaultValue: whetherNumber.no,
    });

    const watermarkText =
      watermarkVisibility === whetherNumber.yes
        ? getValueByKey({
            data: metaData,
            key: fieldDataFlowCase.watermarkText.name,
            convert: convertCollection.string,
            defaultValue: '',
          })
        : '';

    const sealRefuseVisibility = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.sealRefuseVisibility.name,
      convert: convertCollection.number,
      defaultValue: whetherNumber.no,
    });

    const sealRefuseImage =
      sealRefuseVisibility === whetherNumber.yes
        ? getValueByKey({
            data: metaData,
            key: fieldDataFlowCase.sealRefuseImage.name,
            convert: convertCollection.string,
            defaultValue: '',
          })
        : '';

    const sealDisuseVisibility = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.sealDisuseVisibility.name,
      convert: convertCollection.number,
      defaultValue: whetherNumber.no,
    });

    const sealDisuseImage =
      sealDisuseVisibility === whetherNumber.yes
        ? getValueByKey({
            data: metaData,
            key: fieldDataFlowCase.sealDisuseImage.name,
            convert: convertCollection.string,
            defaultValue: '',
          })
        : '';

    const remarkSchemaList = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.remarkSchemaList.name,
      convert: convertCollection.array,
    });

    const documentSchema = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.documentSchema.name,
      defaultValue: {},
    });

    const { general, items: itemsSource } = {
      general: {},
      items: [],
      ...documentSchema,
    };

    const dataSchema = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.dataSchema.name,
      defaultValue: '[]',
    });

    let listDataSchema = [];

    try {
      listDataSchema = JSON.parse(dataSchema);
    } catch (error) {
      logException(error);
    }

    let items = [];

    if (
      isArray(itemsSource) &&
      !isEmptyArray(itemsSource) &&
      isArray(listDataSchema)
    ) {
      for (const o of listDataSchema) {
        const { name } = { name: '', ...o };

        if (checkStringIsNullOrWhiteSpace(name)) {
          continue;
        }

        let config = {};

        for (const one of itemsSource) {
          const { name: nameOne } = { name: '', ...one };

          if (nameOne === name) {
            config = one;

            break;
          }
        }

        items.push({ ...config, ...o });
      }
    } else {
      items = listDataSchema;
    }

    const listChainApproveAdjust = isArray(listChainApprove)
      ? listChainApprove.map((o) => {
          const { name } = { name: '', ...o };

          return {
            title: name,
            ...o,
          };
        })
      : [];

    const { showApply, listApply } = this.getApplicantConfig();

    const { showAttention, listAttention } = this.getAttentionConfig();

    return (
      <>
        <Watermark content={watermarkText} inherit={false}>
          {status === flowCaseStatusCollection.refuse ? (
            <SealImage
              hidden={sealRefuseVisibility !== whetherNumber.yes}
              right="160px"
              image={sealRefuseImage}
            />
          ) : null}

          {status === flowCaseStatusCollection.disuse ? (
            <SealImage
              hidden={sealDisuseVisibility !== whetherNumber.yes}
              right="160px"
              image={sealDisuseImage}
            />
          ) : null}

          <DocumentPrintDesigner
            canDesign={false}
            showToolbar={false}
            showIndependentPrint={showIndependentPrint || false}
            title={getValueByKey({
              data: metaData,
              key: fieldDataFlowCase.workflowTitle.name,
            })}
            values={isArray(listFormStorage) ? listFormStorage : []}
            schema={{
              general: general || {},
              items,
            }}
            formItems={listDataSchema}
            approveList={isArray(listApprove) ? listApprove : []}
            allApproveProcessList={listChainApproveAdjust}
            signetStyle={signetStyle}
            showApply={showApply}
            applyList={listApply}
            showAttention={showAttention}
            attentionList={listAttention}
            showRemark={
              !(!isArray(remarkSchemaList) || isEmptyArray(remarkSchemaList))
            }
            remarkTitle="备注"
            remarkName="remark"
            remarkList={remarkSchemaList}
            showQRCode
            showSerialNumber
            qRCodeImage={qRCodeImage}
            serialNumberTitle="审批流水号: "
            serialNumberContent={flowCaseId}
          />

          <CenterBox>
            <div
              style={{
                paddingTop: '10px',
                paddingLeft: '60px',
                paddingRight: '60px',
                width: '920px',
              }}
            >
              <FileViewer
                canUpload={canEdit === whetherNumber.yes}
                canRemove={canEdit === whetherNumber.yes}
                list={listAttachment}
                dataTransfer={(o) => {
                  return {
                    ...o,
                    name: getValueByKey({
                      data: o,
                      key: fieldDataFlowCaseFormAttachment.alias.name,
                    }),
                    url: getValueByKey({
                      data: o,
                      key: fieldDataFlowCaseFormAttachment.url.name,
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
                  this.showAddAttachmentModal();
                }}
                onItemClick={(o) => {
                  this.showFlowCaseFormAttachmentPreviewDrawer(o);
                }}
                onRemove={(o) => {
                  this.removeAttachment(o);
                }}
              />
            </div>
          </CenterBox>
        </Watermark>
      </>
    );
  };

  renderFlowCaseFormFieldDisplay = () => {
    const { metaData, workflowFormDesign, listFormStorage, listAttachment } =
      this.state;

    const canEdit = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.canEdit.name,
      convert: convertCollection.number,
    });

    const designJson = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.designSchema.name,
    });

    const designData = {
      form: {},
      schema: {},
      ...(checkStringIsNullOrWhiteSpace(designJson)
        ? {}
        : JSON.parse(designJson)),
    };

    const dataSchemaList = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.dataSchemaList.name,
      convert: convertCollection.array,
    });

    const hasDataSchema = dataSchemaList.length > 0;

    const initialValues = buildFlowCaseFormInitialValues(
      listFormStorage,
      dataSchemaList,
    );

    const remarkSchemaList = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.remarkSchemaList.name,
      convert: convertCollection.array,
    });

    const remarkColor = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.remarkColor.name,
      defaultValue: '',
    });

    return (
      <div style={{ paddingBottom: '14px' }}>
        <SchemaDisplayer
          {...designData}
          initialValues={initialValues}
          showSubmit={canEdit === whetherNumber.yes}
          showSubmitDivider={canEdit === whetherNumber.yes}
          submitButtonText="提交表单"
          descriptionTitleColor={remarkColor}
          descriptionLabelColor={remarkColor}
          descriptionTextColor={remarkColor}
          descriptions={remarkSchemaList}
          descriptionUpperLabel="附件列表"
          descriptionUpperComponent={
            <FileViewer
              canUpload={canEdit === whetherNumber.yes}
              canRemove={canEdit === whetherNumber.yes}
              list={listAttachment}
              dataTransfer={(o) => {
                return {
                  ...o,
                  name: getValueByKey({
                    data: o,
                    key: fieldDataFlowCaseFormAttachment.alias.name,
                  }),
                  url: getValueByKey({
                    data: o,
                    key: fieldDataFlowCaseFormAttachment.url.name,
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
                this.showAddAttachmentModal();
              }}
              onItemClick={(o) => {
                this.showFlowCaseFormAttachmentPreviewDrawer(o);
              }}
              onRemove={(o) => {
                this.removeAttachment(o);
              }}
            />
          }
          onSubmit={(o) => {
            this.saveForm(o);
          }}
        >
          {hasDataSchema ? null : (
            <Empty description="暂无表单设计，请首先进行设计" />
          )}
        </SchemaDisplayer>
      </div>
    );
  };

  renderPresetContentContainorInnerTop = () => {
    const { useDocumentDisplay } = this.state;

    return (
      <div
        style={{
          paddingTop: '20px',
        }}
      >
        {useDocumentDisplay
          ? this.renderFlowCaseFormDocumentDisplay()
          : this.renderFlowCaseFormFieldDisplay()}
      </div>
    );
  };

  renderOverlayContent = () => {
    const { listFormStorage } = this.state;

    const columnsFormStorage = [
      {
        title: fieldDataFlowCaseFormStorage.name.label,
        dataIndex: fieldDataFlowCaseFormStorage.name.name,
        key: fieldDataFlowCaseFormStorage.name.name,
        ellipsis: true,
        align: 'center',
        width: '140px',
      },
      {
        title: fieldDataFlowCaseFormStorage.nameNote.label,
        dataIndex: fieldDataFlowCaseFormStorage.nameNote.name,
        key: fieldDataFlowCaseFormStorage.nameNote.name,
        ellipsis: true,
        align: 'center',
        width: '140px',
      },
      {
        title: fieldDataFlowCaseFormStorage.valueTypeNote.label,
        dataIndex: fieldDataFlowCaseFormStorage.valueTypeNote.name,
        key: fieldDataFlowCaseFormStorage.valueTypeNote.name,
        ellipsis: true,
        align: 'center',
        width: '140px',
      },
      {
        title: fieldDataFlowCaseFormStorage.value.label,
        dataIndex: fieldDataFlowCaseFormStorage.value.name,
        key: fieldDataFlowCaseFormStorage.value.name,
        ellipsis: true,
        align: 'center',
      },
      {
        title: fieldDataFlowCaseFormStorage.calculatedValue.label,
        dataIndex: fieldDataFlowCaseFormStorage.calculatedValue.name,
        key: fieldDataFlowCaseFormStorage.calculatedValue.name,
        ellipsis: true,
        align: 'center',
      },
      {
        title: fieldDataFlowCaseFormStorage.displayValue.label,
        dataIndex: fieldDataFlowCaseFormStorage.displayValue.name,
        key: fieldDataFlowCaseFormStorage.displayValue.name,
        ellipsis: true,
        align: 'center',
      },
    ];

    return (
      <div
        style={{
          width: '90%',
          height: '90%',
          background: '#fff',
          padding: '16px',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <Table
          columns={columnsFormStorage}
          size="small"
          dataSource={listFormStorage}
          pagination={{
            hideOnSinglePage: true,
          }}
        />
      </div>
    );
  };
}

export { BaseFlowCaseStorageFormDrawer };
