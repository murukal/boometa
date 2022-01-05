// project
import { Tenant, Tenants, CreateTenant, UpdateTenant } from '../typings/tenant'
import { request } from '.'

/**
 * 获取租户清单
 */
export const getTenants = () =>
  request<Tenants | null>({
    method: 'GET',
    url: `/api/tenant`
  })

/**
 * 获取租户信息
 */
export const getTenant = (code: string) =>
  request<Tenant | null>({
    method: 'GET',
    url: `/api/tenant/${code}`
  })

/**
 * 租户入驻
 */
export const create = (tenant: CreateTenant) =>
  request<Tenant | null>({
    method: 'POST',
    url: '/api/tenant',
    data: tenant
  })

/**
 * 更新租户信息
 */
export const update = (_id: string, tenant: UpdateTenant) =>
  request<Tenant | null>({
    method: 'PATCH',
    url: `/api/tenant/${_id}`,
    data: tenant
  })

/**
 * 删除租户
 */
export const remove = (_id: string) =>
  request({
    method: 'DELETE',
    url: `/api/tenant/${_id}`
  })
