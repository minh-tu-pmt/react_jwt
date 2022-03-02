import { stringify } from 'qs';
import request from '@/utils/request';


/**
 * 获取会员列表
 * @returns {Promise<void>}
 */
export async function queryMemberList(params) {
  return request('/api/1.0.0/oauthinlet/pthola.base.member.query', {
    method: 'POST',
    body: params,
  });
}

/**
 * 获取单个会员信息
 * @param params
 * @returns {Promise<void>}
 */
export async function getMemberInfo(params) {
  return request('/api/1.0.0/oauthinlet/pthola.base.member.get', {
    method: 'POST',
    body: params,
  });
}

/**
 * 创建会员
 * @param params
 * @returns {Promise<void>}
 */
export async function createMember(params) {
  return request('/api/1.0.0/oauthinlet/pthola.base.member.create', {
    method: 'POST',
    body: params,
  });
}

/**
 * 编辑会员
 * @param params
 * @returns {Promise<void>}
 */
export async function editMember(params) {
  return request('/api/1.0.0/oauthinlet/pthola.base.member.edit', {
    method: 'POST',
    body: params,
  });
}
