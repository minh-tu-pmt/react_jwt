import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 获取订单列表
 * @param params
 * @returns {Promise<void>}
 */
export async function queryOrderList(params) {
  return request('/api/1.0.0/oauthinlet/pthola.base.member.consume.course.query', {
    method: 'POST',
    body: params,
  });
}


