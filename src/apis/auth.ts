// third
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
// project
import { fetcher } from '.'
import type { LoginInput, RegisterInput, User } from '../typings/auth'
import type { PaginateOutput, QueryParams } from '../typings/api'

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
      total
      pageCount
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
  authorizationTree: {
    key: string
    title: string
    checkable: false
    children: {
      key: string
      title: string
      checkable: false
      children: {
        key: number
        title: string
      }[]
    }[]
  }[]
}> = gql`
  query {
    authorizationTree {
      key
      title
      checkable
      children {
        key
        title
        checkable
        children {
          key
          title
        }
      }
    }
  }
`
