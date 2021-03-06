// react
import { createElement } from 'react'
// antd
import type { ColumnsType } from 'antd/lib/table'
import { Image } from 'antd'
// project
import type { Tag } from '~/typings/boomart/tag'

export { default } from './Tags'

/**
 * 获取菜单表格列
 * @param columns
 * @returns
 */
export const useColumns = <T = Tag>(columns?: ColumnsType<T>): ColumnsType<T> => [
  {
    title: '标签名称',
    dataIndex: 'name',
    width: 100
  },
  {
    title: '默认图片',
    dataIndex: 'image',
    width: 100,
    render: (value) =>
      createElement(Image, {
        src: value
      })
  },
  ...(columns || [])
]
