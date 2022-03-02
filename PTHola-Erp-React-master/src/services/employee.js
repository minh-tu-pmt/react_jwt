import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 获取员工列表
 * @returns {Promise<void>}
 */
export async function queryEmployeeList(params) {
  return request('/api/1.0.0/oauthinlet/pthola.base.employee.query', {
    method: 'POST',
    body: params,
  });
}

/**
 * 创建员工
 * @param params
 * @returns {Promise<void>}
 */
export async function addEmployeeInfo(params) {
  return request('/api/1.0.0/oauthinlet/pthola.base.employee.create', {
    method: 'POST',
    body: params,
  });
}
