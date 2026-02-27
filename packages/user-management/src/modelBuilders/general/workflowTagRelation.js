import {
  getTacitlyState,
  pretreatmentRemotePageListData,
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import {
  addBatchData,
  addData,
  getData,
  pageListData,
  pageListOperateLogData,
  refreshCacheData,
  removeData,
} from '../../services/workflowTagRelation';

export const workflowTagRelationTypeCollection = {
  pageList: 'workflowTagRelation/pageList',
  get: 'workflowTagRelation/get',
  add: 'workflowTagRelation/add',
  addBatch: 'workflowTagRelation/addBatch',
  remove: 'workflowTagRelation/remove',
  refreshCache: 'workflowTagRelation/refreshCache',
  pageListOperateLog: 'workflowTagRelation/pageListOperateLog',
};

export function buildModel() {
  return {
    namespace: 'workflowTagRelation',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *pageList(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(pageListData, payload);

        const dataAdjust = pretreatmentRemotePageListData({
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
      *get(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(getData, payload);

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
      *add(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(addData, payload);

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
      *addBatch(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(addBatchData, payload);

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
      *remove(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(removeData, payload);

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
      *refreshCache(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(refreshCacheData, payload);

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
      *pageListOperateLog(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(pageListOperateLogData, payload);

        const dataAdjust = pretreatmentRemotePageListData({
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
