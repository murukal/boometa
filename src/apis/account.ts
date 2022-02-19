// project
import type { PaginateResult, QueryOptions } from '../typings/api'
import type { Authentication, Login, PhoneLogin, Register, User } from '../typings/user'
import { gql } from '@apollo/client'

/**
 * 注册
 */
export const REGISTER = gql`
  mutation Register($register: RegisterInput!) {
    register(register: $register) {
      _id
    }
  }
`

/**
 * 登陆
 */
export const LOGIN = gql`
  mutation Login($login: LoginInput!) {
    login(login: $login) {
      _id
    }
  }
`
