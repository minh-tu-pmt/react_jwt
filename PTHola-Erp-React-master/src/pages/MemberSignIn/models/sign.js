import {
  querySignList,
  getSignInfo,
} from '@/services/sign';

export default {
  namespace: 'sign',

  state: {
    response: {
      signs: [],
      paginator: {},
    },
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(querySignList, payload);
      yield put({
        type: 'querySignList',
        payload: response,
      });
    },
  },

  reducers: {
    querySignList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
