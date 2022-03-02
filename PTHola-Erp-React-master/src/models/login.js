import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { userLogin, userLogout } from '@/services/user';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import Cookies from 'js-cookie'

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(userLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (!response.error_response) {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *logout({ payload }, { call, put }){
      const response = yield call(userLogout, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          roles:['guest'],
          ...response
        },
      });
      reloadAuthorized();
      Cookies.remove('token')
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      )
    }
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      const result  = payload.response
      if(result){
        Cookies.set('token',`${result.token_type} ${result.access_token}`,{expires:2})
        setAuthority(result.roles ? result.roles : payload.roles);
      }

      return {
        ...payload,
      };
    }
  },
};
