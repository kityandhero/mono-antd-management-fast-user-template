import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { statisticCaseNotificationWaitReadCountAction } from '../Assist/action';
import { BaseStatisticItem } from '../BaseStatisticItem';

@connect(({ workflowStatistic, schedulingControl }) => ({
  workflowStatistic,
  schedulingControl,
}))
class NotificationWaitReadCount extends BaseStatisticItem {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      value: '',
      title: '未读通知',
      icon: null,
      backgroundColor: '#ef7332',
    };
  }

  getFlag = () => 'eb6dd06197c4459d870c9bc5b017ea0c';

  getIcon = () =>
    'http://file.oa.32306.net/general/image/1820417098451652608.png';

  /**
   * 挂载完成后触发执行。
   * @function
   */
  doOtherWorkAfterDidMount = () => {
    const that = this;

    statisticCaseNotificationWaitReadCountAction({
      target: that,
      handleData: {},
      successCallback: ({ target, remoteData }) => {
        const count = getValueByKey({
          data: remoteData,
          key: 'count',
        });

        target.setState({
          value: count,
        });
      },
    });
  };
}

export { NotificationWaitReadCount };
