// project
import { ActionCode, ResourceCode } from '~/pages/boomemory/Authorizations'

export interface LoginInput {
  keyword: string
  password: string
}

export interface RegisterInput {
  username: string
  email: string
  password: string
}

export interface FilterInput {
  ids?: number[]
  excludeIds?: number[]
}

interface AuthorizationNode {
  // 租户层级
  key: string
  title: string
  code: string
  children: ResourceNode[]
  __typename: string

  // 前端适应树组件
  checkable?: boolean
}

interface ResourceNode {
  key: string
  title: string
  code: ResourceCode
  children: ActionNode[]
  __typename: string

  // 前端适应树组件
  checkable?: boolean
}

interface ActionNode {
  key: number
  title: string
  code: ActionCode
  __typename: string

  // 前端适应树组件
  checkable?: boolean
}

export interface Resource {
  code: ResourceCode
  name: string
}

export interface Action {
  code: ActionCode
  name: string
}

export type NodeType = 'AuthorizationNode' | 'ResourceNode' | 'ActionNode'

/**
 * 登录 or 注册后，服务端返回的数据结构
 */
export interface AuthenticatedProfile {
  token?: string
  isVerified: boolean
}
