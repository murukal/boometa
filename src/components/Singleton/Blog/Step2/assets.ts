// react
import type { CSSProperties } from 'react'
// antd
import type { Callbacks } from 'rc-field-form/lib/interface'
// project
import type { Blog } from '../../../../typings/blog'

export interface Model {
  content: string
}

export interface Props {
  blog: Blog
  model?: Model
  onFormChange?: Callbacks<any>['onValuesChange']
  style?: CSSProperties | undefined
}
