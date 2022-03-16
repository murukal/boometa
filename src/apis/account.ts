// third
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
// project
import arq from '.'
import type { PaginateResult, QueryOptions } from '../typings/api'
import type { LoginInput, RegisterInput, User } from '../typings/user'

const url = '/api/authentication'

export const getUsers = (params: QueryOptions) =>
  arq.get<PaginateResult<User>>(`${url}/users`, {
    params
  })

/**
 * 登陆
 */
export const LOGIN: TypedDocumentNode<
  string,
  {
    loginInput: LoginInput
  }
> = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput)
  }
`

/**
 * 注册
 */
export const REGISTER: TypedDocumentNode<
  string,
  {
    loginInput: RegisterInput
  }
> = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput)
  }
`

/**
 * 获取用户信息
 */
export const WHO_AM_I: TypedDocumentNode<User> = gql`
  query {
    whoAmI {
      id
      username
      email
      avatar
    }
  }
`

/**
 * 查询多个用户
 */
export const GET_USERS = gql`
  query {
    getUsers {
      id
      username
      email
      avatar
    }
  }
`
