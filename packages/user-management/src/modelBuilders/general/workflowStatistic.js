import {
  getTacitlyState,
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import {
  statisticCaseLatestApproveCountData,
  statisticCaseNotificationWaitReadCountData,
  statisticCaseSubmitCountData,
  statisticCaseWaitApproveCountData,
} from '../../services/workflowStatistic';

export const workflowStatisticTypeCollection = {
  statisticCaseSubmitCount: 'workflowStatistic/statisticCaseSubmitCount',
  statisticCaseLatestApproveCount:
    'workflowStatistic/statisticCaseLatestApproveCount',
  statisticCaseWaitApproveCount:
    'workflowStatistic/statisticCaseWaitApproveCount',
  statisticCaseNotificationWaitReadCount:
    'workflowStatistic/statisticCaseNotificationWaitReadCount',
};

export function buildModel() {
  return {
    namespace: 'workflowStatistic',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *statisticCaseSubmitCount(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(statisticCaseSubmitCountData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({
          source: response,
          successCallback: pretreatmentSuccessCallback || null,
          failCallback: pretreatmentFailCallback || null,
        });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *statisticCaseLatestApproveCount(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(
          statisticCaseLatestApproveCountData,
          payload,
        );

        const dataAdjust = pretreatmentRemoteSingleData({
          source: response,
          successCallback: pretreatmentSuccessCallback || null,
          failCallback: pretreatmentFailCallback || null,
        });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *statisticCaseWaitApproveCount(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(statisticCaseWaitApproveCountData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({
          source: response,
          successCallback: pretreatmentSuccessCallback || null,
          failCallback: pretreatmentFailCallback || null,
        });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *statisticCaseNotificationWaitReadCount(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(
          statisticCaseNotificationWaitReadCountData,
          payload,
        );

        const dataAdjust = pretreatmentRemoteSingleData({
          source: response,
          successCallback: pretreatmentSuccessCallback || null,
          failCallback: pretreatmentFailCallback || null,
        });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
    },

    reducers: {
      ...reducerCollection,
    },
  };
}
