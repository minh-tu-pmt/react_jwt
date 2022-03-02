import {
  queryMemberList,
  getMemberInfo,
  createMember as addMember,
  editMember,
} from '@/services/member';

export default {
  namespace: 'member',

  state: {
    response: {
      members: [],
      paginator: {},
    },
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryMemberList, payload);
      yield put({
        type: 'queryMemberList',
        payload: response,
      });
    },

    * add({ payload }, { call, put }) {
      const response = yield call(addMember, payload);
      yield put({
        type:'addMember',
        payload: response
      })
    },
  },

  reducers: {
    queryMemberList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
