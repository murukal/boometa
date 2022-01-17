// project
import { User } from './user'

export interface Blog {
  _id: string
  title: string
  content: string
  createdBy: string | User
}

export interface CreateBlog extends Omit<Blog, '_id' | 'createdBy'> {}

export interface UpdateBlog extends CreateBlog {}
