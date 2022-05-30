// project
import { Core } from '..'
import { Tag } from './tag'
import { User } from '../boomemory/auth'

export interface Essay extends Core {
  title: string
  content: string
  cover: string

  createdBy: User

  tags: Tag[]

  tagIds: number[]
}

export interface CreateEssayInput extends Pick<Essay, 'title' | 'content' | 'cover' | 'tagIds'> {}

export interface UpdateEssayInput extends CreateEssayInput {}
