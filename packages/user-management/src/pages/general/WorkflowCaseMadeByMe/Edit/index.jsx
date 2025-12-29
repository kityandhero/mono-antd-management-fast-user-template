import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkInCollection,
  convertCollection,
  getValueByKey,
} from 'easy-soft-utility';

import { iconBuilder } from 'antd-management-fast-component';

import {
  accessWayCollection,
  flowCaseStatusCollection,
} from '../../../../customConfig';
import { WorkflowCase } from '../../../../pageBases';
import { toggleEmergencyAction } from '../../../../pageBases/general/WorkflowCase/Assist/action';
import { fieldData } from '../Common/data';

const { Edit: EditWorkflowCase } = WorkflowCase;

@connect(({ workflowCase, schedulingControl }) => ({
  workflowCase,
  schedulingControl,
}))
class Edit extends EditWorkflowCase {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      backPath: `/flowCase/workflowCaseMadeByMe/pageList/key`,
    };
  }

  toggleEmergency = (r) => {
    toggleEmergencyAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  establishExtraActionGroupConfig = () => {
    const { metaData } = this.state;

    if (metaData == null) {
      return null;
    }

    const status = getValueByKey({
      data: metaData,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    const that = this;

    return {
      buttons: [
        {
          key: 'toggleEmergency',
          icon: iconBuilder.swap(),
          text: '切换紧急',
          handleButtonClick: ({ handleData }) => {
            that.toggleEmergency(handleData);
          },
          hidden: !checkHasAuthority(
            accessWayCollection.workflowCase.toggleEmergency.permission,
          ),
          disabled: !checkInCollection(
            [flowCaseStatusCollection.created],
            status,
          ),
          confirm: true,
          title:
            '将要切换紧急状态（位于紧急状态下的审批，会向审批人发送审批通知），确定吗？',
          handleData: metaData,
        },
      ],
    };
  };
}

export default Edit;
