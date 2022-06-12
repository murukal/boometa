// third
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
// project
import { fetcher } from '..'
import type { User } from '~/typings/boomemory/auth'
import type { PaginateOutput, QueryParams } from '~/typings/api'

/**
 * 获取用户信息
 */
const WHO_AM_I: TypedDocumentNode<{
  whoAmI: User
}> = gql`
  query {
    whoAmI {
      id
      username
      email
      avatar
    }
  }
`

// 强制不适用缓存
export const whoAmI = async () =>
  await fetcher.query({
    query: WHO_AM_I,
    fetchPolicy: 'no-cache'
  })

/**
 * 查询多个用户
 */
export const GET_USERS: TypedDocumentNode<
  {
    users: PaginateOutput<User>
  },
  QueryParams
> = gql`
  query Users($paginateInput: PaginateInput, $filterInput: FilterUserInput) {
    users(paginateInput: $paginateInput, filterInput: $filterInput) {
      totalCount
      page
      limit
      items {
        id
        createdAt
        updatedAt
        username
        email
        avatar
      }
    }
  }
`
