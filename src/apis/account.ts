// third
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
// project
import { fetcher } from '.'
import type { LoginInput, RegisterInput, User } from '../typings/user'

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
    registerInput: RegisterInput
  }
> = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput)
  }
`

/**
 * 获取用户信息
 */
const WHO_AM_I: TypedDocumentNode<User> = gql`
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
const GET_USERS = gql`
  query {
    getUsers {
      id
      username
      email
      avatar
    }
  }
`

export const getUsers = () =>
  fetcher.query({
    query: GET_USERS
  })
