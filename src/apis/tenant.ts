// third
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
// project
import arq from '.'
import type { PaginateResult, QueryOptions } from '../typings/api'
import type { Tenant, CreateTenant, UpdateTenant } from '../typings/tenant'

const url = `/api/tenant`

/** 获取租户清单 */
export const getTenants = (params?: QueryOptions) =>
  arq.get<PaginateResult<Tenant>>(url, {
    params
  })

/** 获取租户信息 */
export const getTenant = (code: string) => arq.get<Tenant>(`${url}/${code}`)

/** 租户入驻 */
export const create = (tenant: CreateTenant) => arq.post<Tenant>(url, tenant)

/** 更新租户信息 */
export const update = (id: string, tenant: UpdateTenant) => arq.patch<Tenant>(`${url}/${id}`, tenant)

/** 删除租户 */
export const remove = (id: number) => arq.delete(`${url}/${id}`)

/**
 * 查询单个租户
 */
export const TENANT: TypedDocumentNode<
  Tenant,
  {
    tenantCode: string
  }
> = gql`
  query Tenant($tenantCode: ID!) {
    tenant(keyword: $tenantCode) {
      id
      code
      name
      isAuthorizate
    }
  }
`

/**
 * 创建租户
 */
export const CREATE = gql`
  mutation CreateTenant($tenant: CreateTenantInput!) {
    createTenant(createTenantInput: $tenant) {
      id
      name
      code
      isAuthorizate
    }
  }
`

/**
 * 更新租户
 */
export const UPDATE = gql`
  mutation UpdateTenant($id: Int!, $tenant: UpdateTenantInput!) {
    updateTenant(id: $id, updateTenantInput: $tenant)
  }
`
