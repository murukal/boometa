// third
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
// project
import { fetcher } from '.'
import type { Tenant } from '../typings/tenant'
import { PaginateOutput } from '../typings/api'

/**
 * 查询单个租户
 */
const TENANT: TypedDocumentNode<
  Tenant,
  {
    keyword: string
  }
> = gql`
  query Tenant($keyword: ID!) {
    tenant(keyword: $keyword) {
      id
      createdAt
      updatedAt
      code
      name
      isAuthorizate
    }
  }
`
export const getTenant = async (keyword: string) =>
  await fetcher.query({
    query: TENANT,
    variables: {
      keyword
    }
  })

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

/**
 * 删除租户
 */
const REMOVE: TypedDocumentNode<
  boolean,
  {
    id: number
  }
> = gql`
  mutation UpdateTenant($id: Int!) {
    removeTenant(id: $id)
  }
`

export const remove = (id: number) =>
  fetcher.mutate({
    mutation: REMOVE,
    variables: {
      id
    }
  })

/**
 * 查询多个租户
 */
export const TENANTS: TypedDocumentNode<{
  tenants: PaginateOutput<Tenant>
}> = gql`
  query {
    tenants {
      id
      code
      name
      isAuthorizate
    }
  }
`

/**
 * 查询多个租户（关联菜单）
 */
export const TENANTS_WITH_MENUS: TypedDocumentNode<{
  tenants: PaginateOutput<Tenant>
}> = gql`
  query {
    tenants {
      items {
        id
        code
        name
        menus {
          id
          createdAt
          updatedAt
          name
          sortBy
          icon
          tenantId
          parentId
        }
      }
    }
  }
`
