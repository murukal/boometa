import { TenantCode } from './tenant'

export interface User {
  _id: string
  username: string
  phone: string
  email: string
  password?: string
  avatar: string
}

export type Users = User[]

export type LoginType = 'phone' | 'account'

export interface Login {
  tenantCode: TenantCode
  keyword: string
  password: string
}

export interface PhoneLogin {
  phone: string
  captcha: string
}

export interface Register {
  tenantCode: TenantCode
  username: string
  phone: string
  password: string
}

export interface Authentication {
  token: string
}
