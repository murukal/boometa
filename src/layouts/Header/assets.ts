import { CSSProperties } from 'react'

export interface Props {
  isFolded: boolean
  onToggle: Function
}

export const foldStyle: CSSProperties = {
  color: 'white'
}
