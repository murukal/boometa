import { TenantCode } from './tenant'

export interface User {
  _id: string
  username: string
  email: string
  password?: string
  avatar: string
}

export interface LoginInput {
  keyword: string
  password: string
}

export interface Register {
  tenantCode: TenantCode
  username: string
  email: string
  password: string
}

export interface Authentication {
  token: string
}
