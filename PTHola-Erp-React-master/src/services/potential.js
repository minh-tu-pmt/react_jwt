import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 获取潜客列表
 * @param params
 * @returns {Promise<void>}
 */
export async function queryGuestList(params) {
  return request('/api/1.0.0/oauthinlet/pthola.base.guest.query', {
    method: 'POST',
    body: params,
  });
}

/**
 * 添加潜客
 * @param params
 * @returns {Promise<void>}
 */
export async function createGuestInfo(params) {
  return request('/api/1.0.0/oauthinlet/pthola.base.guest.create', {
    method: 'POST',
    body: params,
  });
}

/**
 * 获取单条潜客
 * @param params
 * @returns {Promise<void>}
 */
export async function getGuestInfo(params) {
  return request('/api/1.0.0/oauthinlet/pthola.base.guest.get', {
    method: 'POST',
    body: params,
  });
}

/**
 * 编辑潜客
 * @param params
 * @returns {Promise<void>}
 */
export async function editGuestInfo(params) {
  return request('/api/1.0.0/oauthinlet/pthola.base.guest.edit', {
    method: 'POST',
    body: params,
  });
}

/**
 * 删除潜客
 * @param params
 * @returns {Promise<void>}
 */
export async function deleteGuestInfo(params) {
  return request('/api/1.0.0/oauthinlet/pthola.base.guest.delete',{
    method: 'POST',
    body: params
  })
}

/**
 * 潜客转成会员
 * @param params
 * @returns {Promise<void>}
 */
export async function guestToMember(params) {
  return request('/api/1.0.0/oauthinlet/pthola.base.guest.to.member',{
    method: 'POST',
    body: params
  })
}

/**
 * 潜客添加跟进记录
 * @param params
 * @returns {Promise<void>}
 */
export async function addFollowRecord(params) {
  return request('/api/1.0.0/oauthinlet/pthola.base.guest.add.follow.record',{
    method: 'POST',
    body: params
  })
}
