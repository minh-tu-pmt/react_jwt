import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 获取消课列表
 * @returns {Promise<void>}
 */
export async function queryAttendList(params) {
  return request('/api/1.0.0/oauthinlet/pthola.base.member.attend.course.query', {
    method: 'POST',
    body: params,
  });
}

/**
 * 获取单个会员消课列表
 * @param params
 * @returns {Promise<void>}
 */
export async function getAttendInfo(params) {
  return request('/api/1.0.0/oauthinlet/pthola.base.member.attend.course.get.query', {
    method: 'POST',
    body: params,
  });
}
