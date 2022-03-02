import {
  queryGuestList,
  createGuestInfo,
  getGuestInfo,
  editGuestInfo,
  deleteGuestInfo,
  guestToMember,
  addFollowRecord,
} from '@/services/potential';

export default {
  namespace: 'potential',

  state: {
    response: {
      guests: [],
      paginator: {},
    },
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryGuestList, payload);
      yield put({
        type: 'queryGuestList',
        payload: response,
      });
    },

    * add({ payload }, { call, put }) {
      const response = yield call(createGuestInfo, payload);
      yield put({
        type: 'createGuestInfo',
        payload: response,
      });
    },

    * addFollow({ payload, callback }, { call, put }) {
      const response = yield call(addFollowRecord, payload);
      yield put({
        type: 'addFollowRecord',
        payload: response,
      });
      if (callback) callback(response);
    },
  },

  reducers: {
    queryGuestList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    }
  },
};
