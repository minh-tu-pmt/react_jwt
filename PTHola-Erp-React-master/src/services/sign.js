import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 会员签到列表
 * @param params
 * @returns {Promise<void>}
 */
export async function querySignList(params) {
  return request('/api/1.0.0/oauthinlet/pthola.base.member.sign.query', {
    method: 'POST',
    body: params,
  });
}

/**
 * 获取单个会员签到列表
 * @param params
 * @returns {Promise<void>}
 */
export async function getSignInfo(params) {
  return request('/api/1.0.0/oauthinlet/pthola.base.member.sign.get', {
    method: 'POST',
    body: params,
  });
}
