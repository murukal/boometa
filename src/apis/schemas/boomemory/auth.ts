// third
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
// project
import { fetcher } from '../..'
import type {
  Action,
  AuthorizationNode,
  LoginInput,
  RegisterInput,
  Resource,
  SendCaptchaArgs
} from '~/typings/boomemory/auth'
import type { Authorized } from '~/components/Singleton/Authorization'

/**
 * 登陆
 */
export const LOGIN: TypedDocumentNode<
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

/**
 * 注册
 */
export const REGISTER: TypedDocumentNode<
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

/**
 * 查询权限树
 */
export const AUTHORIZATION_TREE: TypedDocumentNode<{
  authorizationTree: AuthorizationNode[]
}> = gql`
  query {
    authorizationTree {
      key
      title
      code
      children {
        key
        title
        code
        children {
          key
          title
          code
        }
      }
    }
  }
`

/**
 * 查询权限资源
 */
export const AUTHORIZATION_RESOURCES: TypedDocumentNode<{
  authorizationResources: Resource[]
}> = gql`
  query {
    authorizationResources {
      code
      name
    }
  }
`

/**
 * 查询权限操作
 */
export const AUTHORIZATION_ACTIONS: TypedDocumentNode<{
  authorizationActions: Action[]
}> = gql`
  query {
    authorizationActions {
      code
      name
    }
  }
`

/**
 * 分配权限树
 */
const SET_AUTHORIZATIONS: TypedDocumentNode<
  {
    setAuthorizations: boolean
  },
  {
    tenantCode: string
    authorizations: Authorized[]
  }
> = gql`
  mutation SetAuthorizations($tenantCode: String!, $authorizations: [AuthorizationInput!]!) {
    setAuthorizations(tenantCode: $tenantCode, authorizations: $authorizations)
  }
`

export const setAuthorizations = (tenantCode: string, authorizations: Authorized[]) =>
  fetcher.mutate({
    mutation: SET_AUTHORIZATIONS,
    variables: {
      tenantCode,
      authorizations
    }
  })

/**
 * 发送验证码
 */
export const SEND_CAPTCHA: TypedDocumentNode<
  {
    sendCaptcha: Date
  },
  SendCaptchaArgs
> = gql`
  mutation SendCaptcha($emailAddress: String!) {
    sendCaptcha(emailAddress: $emailAddress)
  }
`
