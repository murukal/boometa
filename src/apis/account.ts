// project
import arq from '.'
import type { PaginateResult, QueryOptions } from '../typings/api'
import type { Login, Register, User } from '../typings/user'

const url = '/api/authentication'

/**
 * 注册
 */
export const register = (data: Register) => arq.post<string>(`${url}/register`, data)

/**
 * 登陆
 */
export const login = (data: Login) => arq.post<string>(`${url}/login`, data)

/**
 * 获取用户信息
 */
export const getUserProfile = () => arq.get<User>(url)

/**
 * 查询多个用户
 */
export const getUsers = (params: QueryOptions) =>
  arq.get<PaginateResult<User>>(`${url}/users`, {
    params
  })
