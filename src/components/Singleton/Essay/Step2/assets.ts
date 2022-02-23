// react
import type { CSSProperties } from 'react'
// project
import type { Essay } from '../../../../typings/essay'

export interface Model {
  content: string
}

export interface Props {
  essay: Essay
  style?: CSSProperties | undefined
}
