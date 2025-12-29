import { Divider, Empty, Space, Watermark } from 'antd';
import React from 'react';

import {
  checkHasAuthority,
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  isArray,
  isEmptyArray,
  isEmptyObject,
  logException,
  whetherNumber,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import {
  buildButton,
  CenterBox,
  ColorText,
  iconBuilder,
  PageExtra,
  ScrollFacadeBox,
} from 'antd-management-fast-component';
import {
  DocumentPrintDesigner,
  FileViewer,
  nodeApply,
  nodeAttention,
  SchemaDisplayer,
} from 'antd-management-fast-design-playground';
import { FlowProcessHistory } from 'antd-management-fast-flow';

import {
  accessWayCollection,
  emptySignet,
  fieldDataFlowCaseFormAttachment,
  fieldDataFlowFormDesign,
  flowApproveActionModeCollection,
  flowCaseStatusCollection,
  flowNodeTypeCollection,
  signetStyle,
} from '../../../../../customConfig';
import {
  adjustFlowCaseData,
  buildFlowCaseFormInitialValues,
  SealImage,
} from '../../../../../flowAssist';
import { modelTypeCollection } from '../../../../../modelBuilders';
import { FlowDisplayDrawer } from '../../../../../pages/general/Workflow/FlowDisplayDrawer';
import { AddAttachmentModal } from '../../../../../pages/general/WorkflowCaseFormAttachment/AddAttachmentModal';
import { removeAction } from '../../../../../pages/general/WorkflowCaseFormAttachment/Assist/action';
import { fieldData as fieldDataWorkflowCaseFormAttachment } from '../../../../../pages/general/WorkflowCaseFormAttachment/Common/data';
import { PreviewDrawer as WorkflowCaseFormAttachmentPreviewDrawer } from '../../../../../pages/general/WorkflowCaseFormAttachment/PreviewDrawer';
import { SupplementAttachmentModal } from '../../../../../pages/general/WorkflowCaseFormAttachment/SupplementAttachmentModal';
import { cancelApproveAction } from '../../../../../pages/general/WorkflowCaseProcessHistory/Assist/action';
import { fieldData as fieldDataWorkflowCaseProcessHistory } from '../../../../../pages/general/WorkflowCaseProcessHistory/Common/data';
import { PassModal } from '../../../../../pages/general/WorkflowCaseProcessHistory/PassModal';
import { RefuseModal } from '../../../../../pages/general/WorkflowCaseProcessHistory/RefuseModal';
import { fieldData as fieldDataWorkflowFormDesign } from '../../../../../pages/general/WorkflowFormDesign/Common/data';
import { FlowCaseFormDocumentDisplayDrawer } from '../../../../../pages/general/WorkflowFormDesign/FlowCaseFormDocumentDisplayDrawer';
import { fieldData as fieldDataWorkflowNode } from '../../../../../pages/general/WorkflowNode/Common/data';
import { getChainAction } from '../../Assist/action';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { SubmitApprovalModal } from '../../SubmitApprovalModal';
import { TabPageBase } from '../../TabPageBase';

const { HelpContent } = PageExtra;

function processHistoryItemDataConvert(o) {
  const approveWorkflowNodeName = getValueByKey({
    data: o,
    key: fieldDataWorkflowCaseProcessHistory.approveWorkflowNodeName.name,
  });

  const approveWorkflowNodeType = getValueByKey({
    data: o,
    key: fieldDataWorkflowCaseProcessHistory.approveWorkflowNodeType.name,
    convert: convertCollection.number,
  });

  const approveActionNote = getValueByKey({
    data: o,
    key: fieldDataWorkflowCaseProcessHistory.approveActionNote.name,
  });

  const approveActionMode = getValueByKey({
    data: o,
    key: fieldDataWorkflowCaseProcessHistory.approveActionMode.name,
  });

  const note = getValueByKey({
    data: o,
    key: fieldDataWorkflowCaseProcessHistory.note.name,
  });

  const approveUserName = getValueByKey({
    data: o,
    key: fieldDataWorkflowCaseProcessHistory.approveUserName.name,
  });

  const time = getValueByKey({
    data: o,
    key: fieldDataWorkflowCaseProcessHistory.createTime.name,
  });

  if (approveWorkflowNodeType === flowNodeTypeCollection.intermediateNode) {
    return {
      ...o,
      title: approveWorkflowNodeName,
      result: approveActionNote,
      note: note || '未填写',
      operatorName: approveUserName,
      time,
    };
  }

  return {
    ...o,
    title: approveWorkflowNodeName,
    result: '',
    note: '',
    operatorName: '',
    time: '',
    compact: approveActionMode === flowApproveActionModeCollection.autoControl,
  };
}

function processHistoryNextDataConvert(o) {
  if (o == null || isEmptyObject(o)) {
    return null;
  }

  const nextApproveWorkflowNodeName = getValueByKey({
    data: o,
    key: fieldDataWorkflowNode.name.name,
  });

  return {
    ...o,
    titlePrefix: '待审批节点',
    title: nextApproveWorkflowNodeName,
    icon: iconBuilder.clock(),
    color: 'blue',
    result: '',
    note: '',
    operatorName: '',
    time: '',
  };
}

let temporaryFormValues = {};

class FormInfo extends TabPageBase {
  useFormWrapper = false;

  componentAuthority = accessWayCollection.workflowCase.get.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.workflowCaseTypeCollection.get,
      submitApiPath: modelTypeCollection.workflowCaseTypeCollection.submitForm,
      workflowCaseId: null,
      currentAttachment: null,
      workflowFormDesign: null,
      listApprove: [],
      listChainApprove: [],
      listAttachment: [],
      listProcessHistory: [],
      listFormStorage: [],
      useDocumentDisplay: false,
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

  doOtherRemoteRequest = () => {
    this.loadChainApprove();
  };

  loadChainApprove = () => {
    const { workflowCaseId } = this.state;

    getChainAction({
      target: this,
      handleData: {
        workflowCaseId: workflowCaseId ?? '',
      },
      successCallback: ({ target, remoteData }) => {
        const listChainApprove = getValueByKey({
          data: remoteData,
          key: fieldData.listChainApprove.name,
          convert: convertCollection.array,
        });

        target.setState({
          listChainApprove: isArray(listChainApprove)
            ? listChainApprove.map((o) => {
                const { name } = { name: '', ...o };

                return {
                  title: name,
                  ...o,
                };
              })
            : [],
        });
      },
    });
  };

  reloadChainApprove = () => {
    this.loadChainApprove();
  };

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
    // const canEdit = getValueByKey({
    //   data: metaData,
    //   key: fieldData.canEdit.name,
    //   convert: convertCollection.number,
    // });

    const approveBatchNumber = getValueByKey({
      data: metaData,
      key: fieldData.approveBatchNumber.name,
      defaultValue: 0,
      convert: convertCollection.number,
    });

    const flowCaseStatus = getValueByKey({
      data: metaData,
      key: fieldData.status.name,
      defaultValue: {},
    });

    const listAttachment = getValueByKey({
      data: metaData,
      key: fieldData.listAttachment.name,
      convert: convertCollection.array,
    });

    const workflowFormDesign = getValueByKey({
      data: metaData,
      key: fieldData.workflowFormDesign.name,
      defaultValue: null,
    });

    const listFormStorage = getValueByKey({
      data: metaData,
      key: fieldData.listFormStorage.name,
      convert: convertCollection.array,
    });

    const { nodeList, edgeList, listApprove, listProcessHistory } =
      adjustFlowCaseData(metaData, {
        approveBatchNumber,
        whetherFilterBatchNumber: true,
      });

    this.setState({
      nodeList: [...nodeList],
      edgeList: [...edgeList],
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
      listFormStorage: [...listFormStorage],
      listProcessHistory: [...listProcessHistory],
      listAttachment: [...listAttachment],
      listApprove: [...listApprove],
    });
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { workflowCaseId } = this.state;

    d[fieldData.workflowCaseId.name] = workflowCaseId;

    return d;
  };

  removeAttachment = (o) => {
    removeAction({
      target: this,
      handleData: o,
      successCallback: ({ target }) => {
        target.saveForm(temporaryFormValues);
      },
    });
  };

  saveForm = (o) => {
    const that = this;

    that.execSubmitApi({
      values: o,
      successCallback: () => {
        that.reloadChainApprove();
        that.reloadData({});
      },
    });
  };

  submitApproval = (o, formValue) => {
    const that = this;

    that.execSubmitApi({
      values: formValue,
      successCallback: () => {
        that.showSubmitApprovalModal(o);
      },
    });
  };

  cancelApprove = (o) => {
    cancelApproveAction({
      target: this,
      handleData: {
        flowCaseId: getValueByKey({
          data: o,
          key: fieldData.workflowCaseId.name,
        }),
      },
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  getApplicantConfig = () => {
    const { metaData } = this.state;

    const applicantSignSwitch = getValueByKey({
      data: metaData,
      key: fieldData.applicantSignSwitch.name,
      convert: convertCollection.number,
    });

    const applicantStatementTitle = getValueByKey({
      data: metaData,
      key: fieldData.applicantStatementTitle.name,
      convert: convertCollection.string,
    });

    const applicantStatementContent = getValueByKey({
      data: metaData,
      key: fieldData.applicantStatementContent.name,
      convert: convertCollection.string,
    });

    const applicantUserSignet = getValueByKey({
      data: metaData,
      key: fieldData.applicantUserSignet.name,
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
          key: fieldData.applicantTime.name,
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
      key: fieldData.attentionSignSwitch.name,
      convert: convertCollection.number,
    });

    const attentionStatementTitle = getValueByKey({
      data: metaData,
      key: fieldData.attentionStatementTitle.name,
      convert: convertCollection.string,
    });

    const attentionStatementContent = getValueByKey({
      data: metaData,
      key: fieldData.attentionStatementContent.name,
      convert: convertCollection.string,
    });

    const attentionUserSignet = getValueByKey({
      data: metaData,
      key: fieldData.attentionUserSignet.name,
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
          key: fieldData.attentionTime.name,
          convert: convertCollection.string,
        }),
      },
    ];

    return {
      showAttention: attentionSignSwitch === whetherNumber.yes,
      listAttention,
    };
  };

  getItems = () => {
    const { workflowFormDesign } = this.state;

    const documentSchema = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.documentSchema.name,
      defaultValue: {},
    });

    const { items: itemsSource } = {
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

    return { items: itemsSource, formItems: listDataSchema };
  };

  getAllApproveProcessList = () => {
    const { listChainApprove } = this.state;

    const listChainApproveAdjust = isArray(listChainApprove)
      ? listChainApprove.map((o) => {
          const { name } = { name: '', ...o };

          return {
            title: name,
            ...o,
          };
        })
      : [];

    return listChainApproveAdjust;
  };

  showWorkflowCaseFormAttachmentPreviewDrawer = (item) => {
    this.setState(
      {
        currentAttachment: item,
      },
      () => {
        WorkflowCaseFormAttachmentPreviewDrawer.open();
      },
    );
  };

  showSubmitApprovalModal = () => {
    SubmitApprovalModal.open();
  };

  afterSubmitApprovalModalOK = () => {
    this.reloadChainApprove();
    this.reloadData({});
  };

  showPassModal = () => {
    PassModal.open();
  };

  afterPassModalOK = () => {
    this.reloadData({});
  };

  showRefuseModal = () => {
    RefuseModal.open();
  };

  afterRefuseModalOK = () => {
    this.reloadData({});
  };

  showFlowDisplayDrawer = () => {
    FlowDisplayDrawer.open();
  };

  showAddAttachmentModal = () => {
    AddAttachmentModal.open();
  };

  afterAddAttachmentModalClose = () => {
    this.saveForm(temporaryFormValues);
  };

  showSupplementAttachmentModal = () => {
    SupplementAttachmentModal.open();
  };

  afterSupplementAttachmentModalClose = () => {
    this.reloadData({});
  };

  showFlowCaseFormDocumentDisplayDrawer = () => {
    FlowCaseFormDocumentDisplayDrawer.open();
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

    return values;
  };

  establishCardCollectionConfig = () => {
    const {
      firstLoadSuccess,
      useDocumentDisplay,
      metaData,
      listProcessHistory,
    } = this.state;

    const { nextApproveWorkflowNode } = {
      nextApproveWorkflowNode: null,
      ...metaData,
    };

    const status = getValueByKey({
      data: metaData,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          fullLine: false,
          width: 'auto',
          hasExtra: true,
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                icon: iconBuilder.form(),
                text: '编辑表单',
                disabled: !useDocumentDisplay,
                hidden: !checkInCollection(
                  [
                    flowCaseStatusCollection.created,
                    flowCaseStatusCollection.refuse,
                  ],
                  status,
                ),
                handleClick: () => {
                  this.setState({
                    useDocumentDisplay: false,
                  });
                },
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                icon: iconBuilder.read(),
                text: '文档预览',
                disabled: useDocumentDisplay,
                hidden: !checkInCollection(
                  [
                    flowCaseStatusCollection.created,
                    flowCaseStatusCollection.refuse,
                  ],
                  status,
                ),
                handleClick: () => {
                  this.setState({
                    useDocumentDisplay: true,
                  });
                },
              },
              {
                buildType: cardConfig.extraBuildType.divider,
                hidden: status != flowCaseStatusCollection.created,
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'dashed',
                icon: iconBuilder.fork(),
                text: '流程图例',
                hidden:
                  !firstLoadSuccess ||
                  !checkHasAuthority(
                    accessWayCollection.workflow.get.permission,
                  ),
                handleClick: () => {
                  this.showFlowDisplayDrawer();
                },
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'default',
                icon: iconBuilder.read(),
                text: '表单打印',
                disabled:
                  !firstLoadSuccess ||
                  !checkHasAuthority(
                    accessWayCollection.workflowCase.get.permission,
                  ),
                handleClick: () => {
                  this.showFlowCaseFormDocumentDisplayDrawer();
                },
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: useDocumentDisplay
                ? this.renderFlowCaseFormDocumentDisplay()
                : this.renderFlowCaseFormFieldDisplay(),
            },
          ],
        },
        {
          title: {
            text: '审批进度',
          },
          fullLine: false,
          width: '320px',
          // 内置 card 变更为 flex 布局，即 card body 占满剩余宽度, 仅在 fullLine 为 false 下生效
          flexVertical: true,
          otherComponent: (
            <ScrollFacadeBox
              style={{
                height: '100%',
                overflowY: 'auto',
              }}
            >
              <FlowProcessHistory
                list={[
                  ...(isArray(listProcessHistory) ? listProcessHistory : []),
                ]}
                listItemConvert={processHistoryItemDataConvert}
                nextData={nextApproveWorkflowNode}
                nextDataConvert={processHistoryNextDataConvert}
              />
            </ScrollFacadeBox>
          ),
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '保存表单仅仅保存表单数据，可以反复保存。',
        },
        {
          text: '提交审批后表单不可编辑。',
        },
        {
          text: '提交审批时会优先保存一次表单数据以避免误操作。',
        },
      ],
    };
  };

  renderFlowCaseFormFieldDisplay = () => {
    const {
      firstLoadSuccess,
      metaData,
      listApprove,
      listAttachment,
      listFormStorage,
    } = this.state;

    const workflowCaseId = getValueByKey({
      data: metaData,
      key: fieldData.workflowCaseId.name,
      convert: convertCollection.string,
    });

    const qRCodeImage = getValueByKey({
      data: metaData,
      key: fieldData.qRCodeImage.name,
      convert: convertCollection.string,
    });

    const { latestApproveWorkflowNodeType, workflowFormDesign } = {
      latestApproveWorkflowNodeType: 0,
      workflowFormDesign: {},
      nextApproveWorkflowNode: null,
      ...metaData,
    };

    const status = getValueByKey({
      data: metaData,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    const canEdit = getValueByKey({
      data: metaData,
      key: fieldData.canEdit.name,
      convert: convertCollection.number,
    });

    const canApprove = getValueByKey({
      data: metaData,
      key: fieldData.canApprove.name,
      convert: convertCollection.number,
    });

    const designJson = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataWorkflowFormDesign.designSchema.name,
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
      key: fieldDataWorkflowFormDesign.dataSchemaList.name,
      convert: convertCollection.array,
    });

    const hasDataSchema = dataSchemaList.length > 0;

    const initialValues = buildFlowCaseFormInitialValues(
      listFormStorage,
      dataSchemaList,
    );

    const remarkSchemaList = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataWorkflowFormDesign.remarkSchemaList.name,
      convert: convertCollection.array,
    });

    const remarkColor = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataWorkflowFormDesign.remarkColor.name,
      defaultValue: '',
    });

    const { showApply, listApply } = this.getApplicantConfig();

    const { showAttention, listAttention } = this.getAttentionConfig();

    return (
      <div
        style={{
          paddingTop: '20px',
        }}
      >
        <SchemaDisplayer
          {...designData}
          initialValues={initialValues}
          showSubmit={canEdit === whetherNumber.yes}
          showSubmitDivider={
            canEdit === whetherNumber.yes || canApprove === whetherNumber.yes
          }
          submitButtonText="保存表单"
          buttonAfterSubmitBuilder={({ getFormValue }) => {
            if (!firstLoadSuccess) {
              return null;
            }

            if (
              checkHasAuthority(
                accessWayCollection.workflowCase.submitApproval.permission,
              ) &&
              checkInCollection(
                [
                  flowCaseStatusCollection.created,
                  flowCaseStatusCollection.refuse,
                ],
                status,
              )
            ) {
              return (
                <>
                  {buildButton({
                    // type: 'primary',
                    style: { background: '#2da44e', color: '#fff' },
                    icon: iconBuilder.clock(),
                    text: '提交审批',
                    title:
                      '即将提交审批, 提交前请确保表单已经保存，提交后资料不可更改，确定提交吗?',
                    confirm: true,
                    handleData: metaData,
                    handleClick: ({ handleData }) => {
                      this.submitApproval(handleData, getFormValue());
                    },
                  })}
                </>
              );
            }

            if (canApprove !== whetherNumber.yes) {
              return null;
            }

            return (
              <>
                {buildButton({
                  type: 'primary',
                  icon: iconBuilder.checkCircle(),
                  text: '同意审批',
                  hidden:
                    !firstLoadSuccess ||
                    !checkHasAuthority(
                      accessWayCollection.workflowCaseProcessHistory.pass
                        .permission,
                    ) ||
                    !checkInCollection(
                      [
                        flowCaseStatusCollection.submitApproval,
                        flowCaseStatusCollection.inApprovalProcess,
                      ],
                      status,
                    ) ||
                    latestApproveWorkflowNodeType ===
                      flowNodeTypeCollection.endNode,
                  handleData: metaData,
                  handleClick: () => {
                    this.showPassModal();
                  },
                })}

                {buildButton({
                  type: 'primary',
                  danger: true,
                  icon: iconBuilder.closeCircle(),
                  text: '拒绝审批',
                  hidden:
                    !firstLoadSuccess ||
                    !checkHasAuthority(
                      accessWayCollection.workflowCaseProcessHistory.pass
                        .permission,
                    ) ||
                    !checkInCollection(
                      [
                        flowCaseStatusCollection.submitApproval,
                        flowCaseStatusCollection.inApprovalProcess,
                      ],
                      status,
                    ) ||
                    latestApproveWorkflowNodeType ===
                      flowNodeTypeCollection.endNode,
                  handleData: metaData,
                  handleClick: () => {
                    this.showRefuseModal();
                  },
                })}

                {buildButton({
                  type: 'default',
                  icon: iconBuilder.rollback(),
                  text: '返回列表',
                  style: {
                    background: '#FFB800',
                    color: '#fff',
                  },
                  handleData: metaData,
                  handleClick: () => {
                    this.backToList();
                  },
                })}
              </>
            );
          }}
          descriptionTitleColor={remarkColor}
          descriptionLabelColor={remarkColor}
          descriptionTextColor={remarkColor}
          descriptions={remarkSchemaList}
          descriptionUpperLabel="附件列表"
          descriptionUpperComponentBuilder={({ getFormValue }) => {
            return (
              <FileViewer
                canUpload={canEdit === whetherNumber.yes}
                canRemove={canEdit === whetherNumber.yes}
                list={listAttachment}
                dataTransfer={(o) => {
                  return {
                    ...o,
                    name: getValueByKey({
                      data: o,
                      key: fieldDataWorkflowCaseFormAttachment.alias.name,
                    }),
                    url: getValueByKey({
                      data: o,
                      key: fieldDataWorkflowCaseFormAttachment.url.name,
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
                  temporaryFormValues = getFormValue();

                  this.showAddAttachmentModal();
                }}
                onItemClick={(o) => {
                  this.showWorkflowCaseFormAttachmentPreviewDrawer(o);
                }}
                onRemove={(o) => {
                  temporaryFormValues = getFormValue();

                  this.removeAttachment(o);
                }}
              />
            );
          }}
          onSubmit={(o) => {
            this.saveForm(o);
          }}
        >
          {hasDataSchema ? null : (
            <Empty description="暂无表单设计，请首先进行设计" />
          )}
        </SchemaDisplayer>

        {!checkInCollection(
          [
            flowCaseStatusCollection.submitApproval,
            flowCaseStatusCollection.inApprovalProcess,
            flowCaseStatusCollection.success,
          ],
          status,
        ) ||
        !isArray(listApprove) ||
        isEmptyArray(listApprove) ? null : (
          <Divider>以下为环节审批信息</Divider>
        )}

        {!checkInCollection(
          [
            flowCaseStatusCollection.submitApproval,
            flowCaseStatusCollection.inApprovalProcess,
            flowCaseStatusCollection.success,
          ],
          status,
        ) ||
        !isArray(listApprove) ||
        isEmptyArray(listApprove) ? null : (
          <DocumentPrintDesigner
            showTitle={false}
            showRemark={false}
            approveList={listApprove}
            signetStyle={signetStyle}
            showApply={showApply}
            applyList={listApply}
            showAttention={showAttention}
            attentionList={listAttention}
            showQRCode
            showSerialNumber
            qRCodeImage={qRCodeImage}
            serialNumberTitle="审批流水号: "
            serialNumberContent={workflowCaseId}
          />
        )}
      </div>
    );
  };

  renderFlowCaseFormDocumentDisplay = () => {
    const {
      firstLoadSuccess,
      metaData,
      listApprove,
      listAttachment,
      listFormStorage,
    } = this.state;

    const workflowCaseId = getValueByKey({
      data: metaData,
      key: fieldData.workflowCaseId.name,
      convert: convertCollection.string,
    });

    const qRCodeImage = getValueByKey({
      data: metaData,
      key: fieldData.qRCodeImage.name,
      convert: convertCollection.string,
    });

    const watermarkVisibility = getValueByKey({
      data: metaData,
      key: fieldData.watermarkVisibility.name,
      convert: convertCollection.number,
      defaultValue: whetherNumber.no,
    });

    const watermarkText =
      watermarkVisibility === whetherNumber.yes
        ? getValueByKey({
            data: metaData,
            key: fieldData.watermarkText.name,
            convert: convertCollection.string,
            defaultValue: '',
          })
        : '';

    const sealRefuseVisibility = getValueByKey({
      data: metaData,
      key: fieldData.sealRefuseVisibility.name,
      convert: convertCollection.number,
      defaultValue: whetherNumber.no,
    });

    const sealRefuseImage =
      sealRefuseVisibility === whetherNumber.yes
        ? getValueByKey({
            data: metaData,
            key: fieldData.sealRefuseImage.name,
            convert: convertCollection.string,
            defaultValue: '',
          })
        : '';

    const sealDisuseVisibility = getValueByKey({
      data: metaData,
      key: fieldData.sealDisuseVisibility.name,
      convert: convertCollection.number,
      defaultValue: whetherNumber.no,
    });

    const sealDisuseImage =
      sealDisuseVisibility === whetherNumber.yes
        ? getValueByKey({
            data: metaData,
            key: fieldData.sealDisuseImage.name,
            convert: convertCollection.string,
            defaultValue: '',
          })
        : '';

    const { latestApproveWorkflowNodeType, workflowFormDesign } = {
      latestApproveWorkflowNodeType: 0,
      workflowFormDesign: {},
      ...metaData,
    };

    const status = getValueByKey({
      data: metaData,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    const canEdit = getValueByKey({
      data: metaData,
      key: fieldData.canEdit.name,
      convert: convertCollection.number,
    });

    const canApprove = getValueByKey({
      data: metaData,
      key: fieldData.canApprove.name,
      convert: convertCollection.number,
    });

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

    const { general, title } = {
      general: {},
      title: {},
      ...documentSchema,
    };

    const { showApply, listApply } = this.getApplicantConfig();

    const { showAttention, listAttention } = this.getAttentionConfig();

    const { items, formItems } = this.getItems();

    const allApproveProcessList = this.getAllApproveProcessList();

    return (
      <>
        <Watermark content={watermarkText} inherit={false}>
          {status === flowCaseStatusCollection.refuse ? (
            <SealImage
              hidden={sealRefuseVisibility !== whetherNumber.yes}
              image={sealRefuseImage}
            />
          ) : null}

          {status === flowCaseStatusCollection.disuse ? (
            <SealImage
              hidden={sealDisuseVisibility !== whetherNumber.yes}
              image={sealDisuseImage}
            />
          ) : null}

          <DocumentPrintDesigner
            canDesign={false}
            showToolbar={false}
            title={getValueByKey({
              data: metaData,
              key: fieldData.workflowTitle.name,
            })}
            values={isArray(listFormStorage) ? listFormStorage : []}
            schema={{
              general: general || {},
              title: title || {},
              items,
            }}
            formItems={formItems}
            approveList={isArray(listApprove) ? listApprove : []}
            allApproveProcessList={allApproveProcessList}
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
            serialNumberContent={workflowCaseId}
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
                canSupplement={
                  checkHasAuthority(
                    accessWayCollection.workflowCaseFormAttachment.supplement
                      .permission,
                  ) &&
                  checkInCollection([flowCaseStatusCollection.success], status)
                }
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
                onSupplementButtonClick={() => {
                  this.showSupplementAttachmentModal();
                }}
                onItemClick={(o) => {
                  this.showWorkflowCaseFormAttachmentPreviewDrawer(o);
                }}
                onRemove={(o) => {
                  this.removeAttachment(o);
                }}
              />
            </div>
          </CenterBox>

          {status === flowCaseStatusCollection.created ? (
            <CenterBox>
              <div
                style={{
                  paddingTop: '10px',
                  paddingLeft: '60px',
                  paddingRight: '60px',
                  width: '920px',
                }}
              >
                <HelpContent
                  border={false}
                  title="说明"
                  list={[
                    {
                      text: '预览模式下信息不可编辑, 如需编辑, 请切换到 “表单编辑” 模式。',
                    },
                  ]}
                />
              </div>
            </CenterBox>
          ) : null}

          {canApprove === whetherNumber.yes ? (
            <CenterBox>
              <div style={{ paddingTop: '18px' }}>
                <Space>
                  {buildButton({
                    type: 'primary',
                    danger: true,
                    icon: iconBuilder.closeCircle(),
                    text: '拒绝审批',
                    hidden:
                      !firstLoadSuccess ||
                      !checkHasAuthority(
                        accessWayCollection.workflowCaseProcessHistory.pass
                          .permission,
                      ) ||
                      !checkInCollection(
                        [
                          flowCaseStatusCollection.submitApproval,
                          flowCaseStatusCollection.inApprovalProcess,
                        ],
                        status,
                      ) ||
                      latestApproveWorkflowNodeType ===
                        flowNodeTypeCollection.endNode,
                    handleData: metaData,
                    handleClick: () => {
                      this.showRefuseModal();
                    },
                  })}

                  {buildButton({
                    type: 'primary',
                    icon: iconBuilder.checkCircle(),
                    text: '同意审批',
                    hidden:
                      !firstLoadSuccess ||
                      !checkHasAuthority(
                        accessWayCollection.workflowCaseProcessHistory.pass
                          .permission,
                      ) ||
                      !checkInCollection(
                        [
                          flowCaseStatusCollection.submitApproval,
                          flowCaseStatusCollection.inApprovalProcess,
                        ],
                        status,
                      ) ||
                      latestApproveWorkflowNodeType ===
                        flowNodeTypeCollection.endNode,
                    handleData: metaData,
                    handleClick: () => {
                      this.showPassModal();
                    },
                  })}

                  {buildButton({
                    type: 'default',
                    icon: iconBuilder.rollback(),
                    text: '返回列表',
                    style: {
                      background: '#FFB800',
                      color: '#fff',
                    },
                    handleData: metaData,
                    handleClick: () => {
                      this.backToList();
                    },
                  })}
                </Space>
              </div>
            </CenterBox>
          ) : null}
        </Watermark>
      </>
    );
  };

  renderPresetOther = () => {
    const { metaData, currentAttachment } = this.state;

    return (
      <>
        <SubmitApprovalModal
          externalData={metaData}
          afterOK={() => {
            this.afterSubmitApprovalModalOK();
          }}
        />

        <PassModal
          externalData={metaData}
          afterOK={() => {
            this.afterPassModalOK();
          }}
        />

        <RefuseModal
          externalData={metaData}
          afterOK={() => {
            this.afterRefuseModalOK();
          }}
        />

        <FlowDisplayDrawer
          maskClosable
          externalData={{
            workflowId: getValueByKey({
              data: metaData,
              key: fieldData.workflowId.name,
              defaultValue: '',
            }),
          }}
        />

        <AddAttachmentModal
          externalData={metaData}
          afterClose={this.afterAddAttachmentModalClose}
        />

        <SupplementAttachmentModal
          externalData={metaData}
          afterClose={this.afterSupplementAttachmentModalClose}
        />

        <WorkflowCaseFormAttachmentPreviewDrawer
          maskClosable
          externalData={currentAttachment}
        />

        <FlowCaseFormDocumentDisplayDrawer
          maskClosable
          externalData={metaData}
        />
      </>
    );
  };
}

export { FormInfo };
