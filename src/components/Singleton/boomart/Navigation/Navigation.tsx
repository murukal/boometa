import { FormInstance } from 'antd'
import { forwardRef } from 'react'
import { SingletonProps } from '../..'
import { Navigation as NavigationType } from '~/typings/boomart/navigation'

const Navigation = forwardRef<FormInstance, SingletonProps<NavigationType>>((props, ref) => {
  return <></>
})

export default Navigation
