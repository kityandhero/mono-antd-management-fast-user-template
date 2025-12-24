import {
  getTacitlyState,
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import { toggleAllowScanCodeVerificationData } from '../../services/userWorkflowConfigure';

export const userWorkflowConfigureTypeCollection = {
  toggleAllowScanCodeVerification:
    'userWorkflowConfigure/toggleAllowScanCodeVerification',
};

export function buildModel() {
  return {
    namespace: 'userWorkflowConfigure',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *toggleAllowScanCodeVerification(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(
          toggleAllowScanCodeVerificationData,
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
