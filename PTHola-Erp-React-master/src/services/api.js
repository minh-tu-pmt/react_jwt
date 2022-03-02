import { stringify } from 'qs';
import request from '@/utils/request';


export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

/**
 * 获取角色列表
 * @param params
 * @returns {Promise<void>}
 */
export async function queryRolesList(params) {
  return request('/api/1.0.0/oauthinlet/pthola.base.roles.query',{
    method: 'POST',
    body: params
  })
}
