// react
import type { ForwardRefExoticComponent, RefAttributes } from 'react'
// antd
import type { FormInstance } from 'antd'
// third
import type { FetchResult } from '@apollo/client'

export { default } from './Singleton'

export interface Props<P, E = undefined> {
  title?: string
  isOpened: boolean
  onClose?: () => void
  singleton: P
  onSubmitted?: Function
  extraProps?: E
  singletonComponent: ForwardRefExoticComponent<SingletonProps<P, E> & RefAttributes<FormInstance>>
}

export interface SingletonProps<P, E = undefined> {
  singleton: P
  onSubmitted: (result?: FetchResult) => void
  extraProps?: E
}
