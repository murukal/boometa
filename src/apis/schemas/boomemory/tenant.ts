// third
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
// project
import { fetcher } from '../..'
import type { CreateTenantInput, Tenant, UpdateTenantInput } from '~/typings/boomemory/tenant'
import type { PaginateOutput, QueryParams } from '~/typings/api'

/**
 * 查询单个租户
 */
const TENANT: TypedDocumentNode<
  {
    tenant: Tenant
  },
  {
    code: string
  }
> = gql`
  query Tenant($code: String!) {
    tenant(code: $code) {
      code
      name
    }
  }
`
export const getTenant = async (code: string) =>
  await fetcher.query({
    query: TENANT,
    variables: {
      code
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
      code
      name
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
    code: string
    updateTenantInput: UpdateTenantInput
  }
> = gql`
  mutation UpdateTenant($code: String!, $updateTenantInput: UpdateTenantInput!) {
    updateTenant(code: $code, updateTenantInput: $updateTenantInput)
  }
`

export const update = (code: string, updateTenantInput: UpdateTenantInput) =>
  fetcher.mutate({
    mutation: UPDATE,
    variables: {
      code,
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
    code: string
  }
> = gql`
  mutation UpdateTenant($code: String!) {
    removeTenant(code: $code)
  }
`

export const remove = (code: string) =>
  fetcher.mutate({
    mutation: REMOVE,
    variables: {
      code
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
      totalCount
      items {
        code
        name
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
        code
        name
        menus {
          id
          createdAt
          updatedAt
          name
          sortBy
          icon
          to
          component
          parentId
          resourceCodes
        }
      }
    }
  }
`
