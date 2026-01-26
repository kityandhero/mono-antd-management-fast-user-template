import {
  accessWayTypeCollection,
  buildModel as buildAccessWayModel,
} from './accessWay';
import {
  applicationUserFeedbackTypeCollection,
  buildModel as buildApplicationUserFeedbackModel,
} from './applicationUserFeedback';
import {
  buildModel as buildCloudStorageModel,
  cloudStorageTypeCollection,
} from './cloudStorage';
import {
  buildModel as buildDepartmentModel,
  departmentTypeCollection,
} from './department';
import { buildModel as buildEditorModel, editorTypeCollection } from './editor';
import {
  buildModel as buildGeneralDiscourseModel,
  generalDiscourseTypeCollection,
} from './generalDiscourse';
import { buildModel as buildNoticeModel, noticeTypeCollection } from './notice';
import {
  buildModel as buildNoticeAttachmentModel,
  noticeAttachmentTypeCollection,
} from './noticeAttachment';
import {
  buildModel as buildNoticeTagRelationModel,
  noticeTagRelationTypeCollection,
} from './noticeTagRelation';
import {
  buildModel as buildNoticeUserRelationModel,
  noticeUserRelationTypeCollection,
} from './noticeUserRelation';
import {
  buildModel as buildOperationLogModel,
  operationLogTypeCollection,
} from './operationLog';
import {
  buildModel as buildOrganizationModel,
  organizationTypeCollection,
} from './organization';
import {
  buildModel as buildPresetRoleModel,
  presetRoleTypeCollection,
} from './presetRole';
import {
  buildModel as buildSubsidiaryComplaintMessageModel,
  subsidiaryComplaintMessageTypeCollection,
} from './subsidiaryComplaintMessage';
import {
  buildModel as buildSubsidiaryFeedbackMessageModel,
  subsidiaryFeedbackMessageTypeCollection,
} from './subsidiaryFeedbackMessage';
import {
  buildModel as buildSubsidiaryReportMessageModel,
  subsidiaryReportMessageTypeCollection,
} from './subsidiaryReportMessage';
import { buildModel as buildTagModel, tagTypeCollection } from './tag';
import {
  buildModel as buildUploadHistoryModel,
  uploadHistoryTypeCollection,
} from './uploadHistory';
import { buildModel as buildUserModel, userTypeCollection } from './user';
import {
  buildModel as buildUserDepartmentInfoModel,
  userDepartmentInfoTypeCollection,
} from './userDepartmentInfo';
import {
  buildModel as buildUserGeneralDiscourseModel,
  userGeneralDiscourseTypeCollection,
} from './userGeneralDiscourse';
import {
  buildModel as buildUserWorkflowConfigureModel,
  userWorkflowConfigureTypeCollection,
} from './userWorkflowConfigure';
import {
  buildModel as buildWorkflowModel,
  workflowTypeCollection,
} from './workflow';
import {
  buildModel as buildWorkflowBranchConditionModel,
  workflowBranchConditionTypeCollection,
} from './workflowBranchCondition';
import {
  buildModel as buildWorkflowBranchConditionItemModel,
  workflowBranchConditionItemTypeCollection,
} from './workflowBranchConditionItem';
import {
  buildModel as buildWorkflowCaseModel,
  workflowCaseTypeCollection,
} from './workflowCase';
import {
  buildModel as buildWorkflowCaseCarbonCopyNotificationModel,
  workflowCaseCarbonCopyNotificationTypeCollection,
} from './workflowCaseCarbonCopyNotification';
import {
  buildModel as buildWorkflowCaseFormAttachmentModel,
  workflowCaseFormAttachmentTypeCollection,
} from './workflowCaseFormAttachment';
import {
  buildModel as buildWorkflowCaseNextProcessApproveModel,
  workflowCaseNextProcessApproveTypeCollection,
} from './workflowCaseNextProcessApprove';
import {
  buildModel as buildWorkflowCaseNextProcessNotificationModel,
  workflowCaseNextProcessNotificationTypeCollection,
} from './workflowCaseNextProcessNotification';
import {
  buildModel as buildWorkflowCaseNextProcessProgressModel,
  workflowCaseNextProcessProgressTypeCollection,
} from './workflowCaseNextProcessProgress';
import {
  buildModel as buildWorkflowCaseProcessHistoryModel,
  workflowCaseProcessHistoryTypeCollection,
} from './workflowCaseProcessHistory';
import {
  buildModel as buildWorkflowDebugCaseModel,
  workflowDebugCaseTypeCollection,
} from './workflowDebugCase';
import {
  buildModel as buildWorkflowDebugCaseFormAttachmentModel,
  workflowDebugCaseFormAttachmentTypeCollection,
} from './workflowDebugCaseFormAttachment';
import {
  buildModel as buildWorkflowDebugCaseFormStorageModel,
  workflowDebugCaseFormStorageTypeCollection,
} from './workflowDebugCaseFormStorage';
import {
  buildModel as buildWorkflowDebugCaseNextProcessApproveModel,
  workflowDebugCaseNextProcessApproveTypeCollection,
} from './workflowDebugCaseNextProcessApprove';
import {
  buildModel as buildWorkflowDebugCaseNextProcessNotificationModel,
  workflowDebugCaseNextProcessNotificationTypeCollection,
} from './workflowDebugCaseNextProcessNotification';
import {
  buildModel as buildWorkflowDebugCaseNextProcessProgressModel,
  workflowDebugCaseNextProcessProgressTypeCollection,
} from './workflowDebugCaseNextProcessProgress';
import {
  buildModel as buildWorkflowDebugCaseProcessHistoryModel,
  workflowDebugCaseProcessHistoryTypeCollection,
} from './workflowDebugCaseProcessHistory';
import {
  buildModel as buildWorkflowFormDesignModel,
  workflowFormDesignTypeCollection,
} from './workflowFormDesign';
import {
  buildModel as buildWorkflowLineModel,
  workflowLineTypeCollection,
} from './workflowLine';
import {
  buildModel as buildWorkflowNodeModel,
  workflowNodeTypeCollection,
} from './workflowNode';
import {
  buildModel as buildWorkflowNodeApproverModel,
  workflowNodeApproverTypeCollection,
} from './workflowNodeApprover';
import {
  buildModel as buildWorkflowStatisticModel,
  workflowStatisticTypeCollection,
} from './workflowStatistic';

export const modelTypeCollection = {
  accessWayTypeCollection,
  applicationUserFeedbackTypeCollection,
  cloudStorageTypeCollection,
  departmentTypeCollection,
  editorTypeCollection,
  generalDiscourseTypeCollection,
  noticeTypeCollection,
  noticeAttachmentTypeCollection,
  noticeTagRelationTypeCollection,
  noticeUserRelationTypeCollection,
  operationLogTypeCollection,
  organizationTypeCollection,
  presetRoleTypeCollection,
  subsidiaryComplaintMessageTypeCollection,
  subsidiaryFeedbackMessageTypeCollection,
  subsidiaryReportMessageTypeCollection,
  tagTypeCollection,
  uploadHistoryTypeCollection,
  userTypeCollection,
  userDepartmentInfoTypeCollection,
  userGeneralDiscourseTypeCollection,
  userWorkflowConfigureTypeCollection,
  workflowTypeCollection,
  workflowBranchConditionTypeCollection,
  workflowBranchConditionItemTypeCollection,
  workflowCaseTypeCollection,
  workflowCaseCarbonCopyNotificationTypeCollection,
  workflowCaseFormAttachmentTypeCollection,
  workflowCaseNextProcessApproveTypeCollection,
  workflowCaseNextProcessNotificationTypeCollection,
  workflowCaseNextProcessProgressTypeCollection,
  workflowCaseProcessHistoryTypeCollection,
  workflowDebugCaseTypeCollection,
  workflowDebugCaseFormAttachmentTypeCollection,
  workflowDebugCaseFormStorageTypeCollection,
  workflowDebugCaseNextProcessApproveTypeCollection,
  workflowDebugCaseNextProcessNotificationTypeCollection,
  workflowDebugCaseNextProcessProgressTypeCollection,
  workflowDebugCaseProcessHistoryTypeCollection,
  workflowFormDesignTypeCollection,
  workflowLineTypeCollection,
  workflowNodeTypeCollection,
  workflowNodeApproverTypeCollection,
  workflowStatisticTypeCollection,
};

export function listModelBuilder() {
  const list = [];

  list.push(
    buildAccessWayModel,
    buildApplicationUserFeedbackModel,
    buildCloudStorageModel,
    buildDepartmentModel,
    buildEditorModel,
    buildGeneralDiscourseModel,
    buildNoticeModel,
    buildNoticeAttachmentModel,
    buildNoticeTagRelationModel,
    buildNoticeUserRelationModel,
    buildOperationLogModel,
    buildOrganizationModel,
    buildPresetRoleModel,
    buildSubsidiaryComplaintMessageModel,
    buildSubsidiaryFeedbackMessageModel,
    buildSubsidiaryReportMessageModel,
    buildTagModel,
    buildUploadHistoryModel,
    buildUserModel,
    buildUserDepartmentInfoModel,
    buildUserGeneralDiscourseModel,
    buildUserWorkflowConfigureModel,
    buildWorkflowModel,
    buildWorkflowBranchConditionModel,
    buildWorkflowBranchConditionItemModel,
    buildWorkflowCaseModel,
    buildWorkflowCaseCarbonCopyNotificationModel,
    buildWorkflowCaseFormAttachmentModel,
    buildWorkflowCaseNextProcessApproveModel,
    buildWorkflowCaseNextProcessNotificationModel,
    buildWorkflowCaseNextProcessProgressModel,
    buildWorkflowCaseProcessHistoryModel,
    buildWorkflowDebugCaseModel,
    buildWorkflowDebugCaseFormAttachmentModel,
    buildWorkflowDebugCaseFormStorageModel,
    buildWorkflowDebugCaseNextProcessApproveModel,
    buildWorkflowDebugCaseNextProcessNotificationModel,
    buildWorkflowDebugCaseNextProcessProgressModel,
    buildWorkflowDebugCaseProcessHistoryModel,
    buildWorkflowFormDesignModel,
    buildWorkflowLineModel,
    buildWorkflowNodeModel,
    buildWorkflowNodeApproverModel,
    buildWorkflowStatisticModel,
  );

  return list;
}
