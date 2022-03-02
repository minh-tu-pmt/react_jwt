import {
  queryAttendList,
} from '@/services/eliminate';

export default {
  namespace: 'eliminate',

  state: {
    response: {
      attend_courses: [],
      paginator: {},
    },
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryAttendList, payload);
      console.log(response)
      yield put({
        type: 'queryAttendList',
        payload: response,
      });
    },
  },

  reducers: {
    queryAttendList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
