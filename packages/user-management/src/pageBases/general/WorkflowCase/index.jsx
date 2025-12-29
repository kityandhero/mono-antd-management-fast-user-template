import { addBasicInfoAction } from './Assist/action';
import { fieldData } from './Common/data';
import { BasicInfo } from './Edit/BasicInfo';
import { FormInfo } from './Edit/FormInfo';
import { PageList as PageListOperateLog } from './Edit/OperateLog/PageList';
import { Edit } from './Edit';
import { FormDocumentPreviewDrawer } from './FormDocumentPreviewDrawer';
import { PageList } from './PageList';

export const WorkflowCase = {
  addBasicInfoAction,
  fieldData: fieldData,
  PageList,
  Edit,
  BasicInfo,
  FormInfo,
  OperateLog: {
    PageList: PageListOperateLog,
  },
  FormDocumentPreviewDrawer,
};
