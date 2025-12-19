import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  formatCollection,
  getValueByKey,
} from 'easy-soft-utility';

import {
  buildCustomGrid,
  ScrollFacadeBox,
} from 'antd-management-fast-component';
import { switchControlAssist } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { BaseFlowCaseNextProcessNotificationPreviewDrawer } from '../../../../pageBases';
import { fieldData } from '../Common/data';

const visibleFlag = '6aae5f3c691942bb8f366610aa04d66f';

@connect(({ workflowCaseNextProcessNotification, schedulingControl }) => ({
  workflowCaseNextProcessNotification,
  schedulingControl,
}))
class WorkflowCaseNextProcessNotificationPreviewDrawer extends BaseFlowCaseNextProcessNotificationPreviewDrawer {
  componentAuthority =
    accessWayCollection.workflowCaseNextProcessNotification.pageList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  static close() {
    switchControlAssist.close(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '审批通知',
      loadApiPath:
        modelTypeCollection.workflowCaseNextProcessNotificationTypeCollection
          .get,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.state;

    d[fieldData.workflowCaseNextProcessNotificationId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowCaseNextProcessNotificationId.name,
    });

    return d;
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '此处显示的是审批通知详情。',
        },
      ],
    };
  };

  renderPresetContentContainorInnerTop = () => {
    const { metaData } = this.state;

    return (
      <ScrollFacadeBox
        style={{
          height: '100%',
          width: '100%',
          overflowY: 'auto',
          backgroundColor: '#fff',
        }}
      >
        <div
          style={{
            paddingTop: '16px',
            paddingBottom: '16px',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          {buildCustomGrid({
            list: [
              {
                span: 2,
                label: fieldData.flowCaseTitle.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.flowCaseTitle.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 2,
                label: fieldData.content.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.content.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 2,
                label: fieldData.createTime.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.createTime.name,
                  format: formatCollection.datetime,
                }),
              },
            ],
            props: {
              bordered: true,
              size: 'small',
              column: 2,
              labelStyle: {
                width: '160px',
              },
              emptyValue: '暂无',
              emptyStyle: {
                color: '#ccc',
              },
              ellipsis: false,
            },
          })}
        </div>
      </ScrollFacadeBox>
    );
  };
}

export { WorkflowCaseNextProcessNotificationPreviewDrawer };
