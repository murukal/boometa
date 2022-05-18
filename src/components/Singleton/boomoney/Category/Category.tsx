import { FormInstance } from 'antd'
import { forwardRef } from 'react'
import { Category as CategoryType } from '~/typings/boomoney/category'
import { SingletonProps } from '../..'

const Category = forwardRef<FormInstance, SingletonProps<CategoryType>>(() => {
  return <></>
})

export default Category
