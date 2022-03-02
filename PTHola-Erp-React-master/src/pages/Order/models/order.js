import {
  queryOrderList
} from '@/services/order';

export default {
  namespace: 'order',

  state: {
    response: {
      orders: [],
      paginator: {},
    },
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryOrderList, payload);
      console.log(response)
      yield put({
        type: 'queryOrderList',
        payload: response,
      });
    },
  },

  reducers: {
    queryOrderList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
