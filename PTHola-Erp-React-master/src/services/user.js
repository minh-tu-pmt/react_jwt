import { stringify } from 'qs';
import request from '@/utils/request';


/**
 * 用户登录
 * @param params
 * @returns {Promise<void>}
 * @constructor
 */
export async function userLogin(params) {
  return request('/api/1.0.0/oauthinlet/pthola.base.user.login', {
    method: 'POST',
    body: params,
  });
}

/**
 * 获取用户信息
 * @returns {Promise<void>}
 */
export async function getUserInfo() {
  return request('/api/1.0.0/oauthinlet/pthola.base.user.info',{
    method: 'POST'
  });
}

/**
 * 用户注销
 * @returns {Promise<void>}
 * @constructor
 */
export async function userLogout() {
  return request('/api/1.0.0/oauthinlet/pthola.base.user.logout',{
    method: 'POST'
  })
}

/**
 * 刷新用户token
 * @returns {Promise<void>}
 */
export async function refreshToken() {
  return request('/api/1.0.0/oauthinlet/pthola.base.user.refresh',{
    method: 'POST'
  })
}
