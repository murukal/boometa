import { Tag } from './tag'

export interface Navigation {
  id: number
  title: string
  subtitle: string
  cover?: string
  link: string
  // 关联的标签
  tags?: Tag[]
}

/**
 * 创建导航
 */
export interface CreateNavigationInput {
  title: string
  subtitle: string
  cover?: string
  link: string
  tagIds: number[]
}

/**
 * 更新导航
 */
export interface UpdateNavigationInput extends Partial<CreateNavigationInput> {}
