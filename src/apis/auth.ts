// third
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
// project
import { fetcher } from '.'
import type { Action, AuthorizationNode, LoginInput, RegisterInput, Resource, User } from '~/typings/auth'
import type { PaginateOutput, QueryParams } from '~/typings/api'

/**
 * 登陆
 */
const LOGIN: TypedDocumentNode<
  {
    login: string
  },
  {
    loginInput: LoginInput
  }
> = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput)
  }
`

export const login = (loginInput: LoginInput) =>
  fetcher.mutate({
    mutation: LOGIN,
    variables: {
      loginInput
    }
  })

/**
 * 注册
 */
const REGISTER: TypedDocumentNode<
  {
    register: string
  },
  {
    registerInput: RegisterInput
  }
> = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput)
  }
`
export const register = (registerInput: RegisterInput) =>
  fetcher.mutate({
    mutation: REGISTER,
    variables: {
      registerInput
    }
  })

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

export const whoAmI = async () =>
  await fetcher.query({
    query: WHO_AM_I
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

/**
 * 查询权限树
 */
export const AUTHORIZATION_TREE: TypedDocumentNode<{
  authorizationTree: AuthorizationNode[]
}> = gql`
  query {
    authorizationTree {
      key
      title
      checkable
      code
      children {
        key
        title
        checkable
        code
        children {
          key
          title
          code
        }
      }
    }
  }
`

/**
 * 查询权限资源
 */
export const AUTHORIZATION_RESOURCES: TypedDocumentNode<{
  authorizationResources: Resource[]
}> = gql`
  query {
    authorizationResources {
      code
      name
    }
  }
`

/**
 * 查询权限操作
 */
export const AUTHORIZATION_ACTIONS: TypedDocumentNode<{
  authorizationActions: Action[]
}> = gql`
  query {
    authorizationActions {
      code
      name
    }
  }
`
