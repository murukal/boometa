// third
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
// project
import { fetcher } from '.'
import type { PaginateOutput, QueryParams } from '../typings/api'
import type { Role, UpdateRoleInput } from '../typings/role'

/**
 * 查询多个角色
 */
export const ROLES: TypedDocumentNode<
  {
    roles: PaginateOutput<Role>
  },
  QueryParams
> = gql`
  query ($paginateInput: PaginateInput) {
    roles(paginateInput: $paginateInput) {
      items {
        id
        name
      }
      page
      limit
      total
      pageCount
    }
  }
`

/**
 * 删除角色
 */
const REMOVE: TypedDocumentNode<
  {
    removeRole: boolean
  },
  {
    id: number
  }
> = gql`
  mutation RemoveRole($id: Int!) {
    removeRole(id: $id)
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
 * 查询单个角色
 */
export const ROLE: TypedDocumentNode<
  {
    role: Role
  },
  {
    id: number
  }
> = gql`
  query Role($id: Int!) {
    role(id: $id) {
      id
      name
    }
  }
`

/**
 * 更新角色
 */
const UPDATE: TypedDocumentNode<
  {
    updateRole: boolean
  },
  {
    id: number
    updateRoleInput: UpdateRoleInput
  }
> = gql`
  mutation UpdateRole($id: Int!, $updateRoleInput: UpdateRoleInput!) {
    updateRole(id: $id, updateRoleInput: $updateRoleInput)
  }
`

export const update = (id: number, updateRoleInput: UpdateRoleInput) =>
  fetcher.mutate({
    mutation: UPDATE,
    variables: {
      id,
      updateRoleInput
    }
  })
