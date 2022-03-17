import { gql, TypedDocumentNode } from '@apollo/client'
import { fetcher } from '.'
import { PaginateOutput, QueryParams } from '../typings/api'
import type { Role } from '../typings/role'

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
