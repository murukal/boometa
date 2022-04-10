import { ActionCode, ResourceCode } from '~/pages/Authorizations'
import { Core } from '.'

export interface User extends Core {
  username: string
  email: string
  avatar: string
}

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
  key?: string
  title?: string
  checkable?: false
  code?: string
  children: ResourceNode[]
}

interface ResourceNode {
  key: string
  title: string
  checkable: false
  code: ResourceCode
  children: Action[]
}

interface ActionNode {
  key: string
  title: string
  code: Action
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
