// project
import type { Tag } from './tag'
import type { User } from './user'

export interface Essay {
  _id: string
  title: string
  content: string
  createdBy: string | User
  createdAt?: string
  tags: Array<Tag | string>
  cover?: string
}

export interface CreateEssay extends Omit<Essay, '_id' | 'createdBy' | 'createdAt'> {}

export interface UpdateEssay extends CreateEssay {}

export interface PublishRecord {
  _id: number
  count: number
}

export type CreativeTop5 = {
  _id: string
  count: number
  users: User[]
}[]
