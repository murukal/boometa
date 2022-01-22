// npm
import { stringify } from 'qs'
// project
import type { PaginateResult, QueryOptions } from '../typings/api'
import type { Authentication, Login, PhoneLogin, Register, User } from '../typings/user'
import { request } from '.'

/**
 * 换取用户信息
 */
export const getUser = () =>
  request<User>({
    method: 'GET',
    url: '/api/auth'
  })

/**
 * 常规登录
 */
export const login = (data: Login) =>
  request<Authentication>({
    method: 'POST',
    url: '/api/auth/login',
    data
  })

/**
 * 手机号登录
 */
export const loginByPhone = (data: PhoneLogin) =>
  request<Authentication>({
    method: 'POST',
    url: '/api/auth/login',
    data
  })

/**
 * 注册
 */
export const register = (data: Register) =>
  request<Authentication>({
    method: 'POST',
    url: '/api/auth/register',
    data
  })

/**
 * 获取用户清单
 */
export const getUsers = (query: QueryOptions) => {
  return request<PaginateResult<User>>({
    method: 'GET',
    url: `/api/auth/user?${stringify(query)}`
  })
}
