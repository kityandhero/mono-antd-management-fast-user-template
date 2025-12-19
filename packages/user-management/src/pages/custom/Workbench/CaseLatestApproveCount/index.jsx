import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { statisticCaseLatestApproveCountAction } from '../Assist/action';
import { BaseStatisticItem } from '../BaseStatisticItem';

@connect(({ workflowStatistic, schedulingControl }) => ({
  workflowStatistic,
  schedulingControl,
}))
class CaseLatestApproveCount extends BaseStatisticItem {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      value: '',
      title: '已办结',
      icon: null,
      backgroundColor: '#4398f0',
    };
  }

  getFlag = () => 'eb6dd06197c4459d870c9bc5b017ea0c';

  getIcon = () =>
    'http://file.oa.32306.net/general/image/1820416988909015040.png';

  /**
   * 挂载完成后触发执行。
   * @function
   */
  doOtherWorkAfterDidMount = () => {
    const that = this;

    statisticCaseLatestApproveCountAction({
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

export { CaseLatestApproveCount };
