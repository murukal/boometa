// project
import { gql } from '@apollo/client'
import arq from '.'
import type { PaginateResult, QueryOptions } from '../typings/api'
import type { Register, User } from '../typings/user'

const url = '/api/authentication'

/**
 * 注册
 */
export const register = (data: Register) => arq.post<string>(`${url}/register`, data)

/**
 * 获取用户信息
 */
export const getUserProfile = () => arq.get<User>(url)

export const getUsers = (params: QueryOptions) =>
  arq.get<PaginateResult<User>>(`${url}/users`, {
    params
  })

/**
 * 登陆
 */
export const LOGIN = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput)
  }
`

/**
 * 注册
 */
export const REGISTER = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput)
  }
`

/**
 * 获取用户信息
 */
export const WHO_AM_I = gql`
  query {
    whoAmI {
      id
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
    }
  }
`
