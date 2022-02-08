// project
import type { Tag } from './tag'
import type { User } from './user'

export interface Blog {
  _id: string
  title: string
  content: string
  createdBy: string | User
  createdAt: string
  tags: Array<Tag | string>
  cover?: string
}

export interface CreateBlog extends Omit<Blog, '_id' | 'createdBy'> {}

export interface UpdateBlog extends CreateBlog {}

export interface PublishRecord {
  _id: number
  count: number
}

export type CreativeTop5 = {
  _id: string
  count: number
  users: User[]
}[]
