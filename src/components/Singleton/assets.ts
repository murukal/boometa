// react
import type { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react'
// antd
import type { FormInstance } from 'antd'
// third
import type { FetchResult } from '@apollo/client'

export interface Props<P = any, E = any> {
  title?: string
  isOpened: boolean
  onClose?: () => void
  singleton: P
  singletonComponent: ForwardRefExoticComponent<PropsWithoutRef<SingletonProps<P, E>> & RefAttributes<FormInstance>>
  onSubmitted?: Function
  extraProps?: E
}

export interface SingletonProps<P, E = any> {
  singleton: P
  onSubmitted: (result: FetchResult) => void
  extraProps: E
}
