import { Tag } from './tag'

export interface Navigation {
  id: number
  title: string
  cover?: string
  // 关联的标签
  tags?: Tag[]
}
