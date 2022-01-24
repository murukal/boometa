// project
import type { PaginateResult, QueryOptions } from '../typings/api'
import type { Authentication, Login, PhoneLogin, Register, User } from '../typings/user'
import { get, post } from '.'

const url = '/api/auth'

/**
 * 换取用户信息
 */
export const getUser = () => get<User>(url)

/**
 * 常规登录
 */
export const login = (data: Login | PhoneLogin) => post<Authentication>(`${url}/login`, data)

/**
 * 注册
 */
export const register = (data: Register) => post<Authentication>(`${url}/register`, data)

/**
 * 获取用户清单
 */
export const getUsers = (params: QueryOptions) =>
  get<PaginateResult<User>>(`${url}/user`, {
    params
  })
