// react
import type { CSSProperties } from 'react'
// project
import type { Blog } from '../../../../typings/blog'

export interface Model {
  content: string
}

export interface Props {
  blog: Blog
  style?: CSSProperties | undefined
}
