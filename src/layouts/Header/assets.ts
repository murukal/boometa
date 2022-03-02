import { CSSProperties } from 'react'

export interface Props {
  isFolded: boolean
  onFold: Function
}

export const foldStyle: CSSProperties = {
  color: 'white'
}
