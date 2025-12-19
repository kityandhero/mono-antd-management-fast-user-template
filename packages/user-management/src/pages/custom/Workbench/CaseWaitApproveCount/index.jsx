import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { statisticCaseWaitApproveCountAction } from '../Assist/action';
import { BaseStatisticItem } from '../BaseStatisticItem';

@connect(({ workflowStatistic, schedulingControl }) => ({
  workflowStatistic,
  schedulingControl,
}))
class CaseWaitApproveCount extends BaseStatisticItem {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      value: '',
      title: '总待办量',
      icon: null,
      backgroundColor: '#3bbf54',
    };
  }

  getFlag = () => 'eb6dd06197c4459d870c9bc5b017ea0c';

  getIcon = () =>
    'http://file.oa.32306.net/general/image/1820417353352089600.png';

  /**
   * 挂载完成后触发执行。
   * @function
   */
  doOtherWorkAfterDidMount = () => {
    const that = this;

    statisticCaseWaitApproveCountAction({
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

export { CaseWaitApproveCount };
