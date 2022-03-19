// third
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
// project
import { fetcher } from '.'
import type { CreateTenantInput, Tenant, UpdateTenantInput } from '../typings/tenant'
import type { PaginateOutput, QueryParams } from '../typings/api'

/**
 * 查询单个租户
 */
const TENANT: TypedDocumentNode<
  {
    tenant: Tenant
  },
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
const CREATE: TypedDocumentNode<
  {
    createTenant: Tenant
  },
  {
    createTenantInput: CreateTenantInput
  }
> = gql`
  mutation CreateTenant($createTenantInput: CreateTenantInput!) {
    createTenant(createTenantInput: $createTenantInput) {
      id
      name
      code
      isAuthorizate
    }
  }
`

export const create = (createTenantInput: CreateTenantInput) =>
  fetcher.mutate({
    mutation: CREATE,
    variables: {
      createTenantInput
    }
  })

/**
 * 更新租户
 */
const UPDATE: TypedDocumentNode<
  {
    updateTenant: boolean
  },
  {
    id: number
    updateTenantInput: UpdateTenantInput
  }
> = gql`
  mutation UpdateTenant($id: Int!, $updateTenantInput: UpdateTenantInput!) {
    updateTenant(id: $id, updateTenantInput: $updateTenantInput)
  }
`

export const update = (id: number, updateTenantInput: UpdateTenantInput) =>
  fetcher.mutate({
    mutation: UPDATE,
    variables: {
      id,
      updateTenantInput
    }
  })

/**
 * 删除租户
 */
const REMOVE: TypedDocumentNode<
  {
    removeTenant: boolean
  },
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
export const TENANTS: TypedDocumentNode<
  {
    tenants: PaginateOutput<Tenant>
  },
  QueryParams
> = gql`
  query ($paginateInput: PaginateInput) {
    tenants(paginateInput: $paginateInput) {
      page
      limit
      total
      pageCount
      items {
        id
        code
        name
        isAuthorizate
      }
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
        isAuthorizate
        menus {
          id
          createdAt
          updatedAt
          name
          sortBy
          icon
          to
          component
          tenantId
          parentId
        }
      }
    }
  }
`
