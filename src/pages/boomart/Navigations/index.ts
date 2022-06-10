// react
import { createElement } from 'react'
// antd
import { Typography, Image } from 'antd'
import { ColumnsType } from 'antd/lib/table'
// project
import type { Navigation } from '~/typings/boomart/navigation'
import type { Tag } from '~/typings/boomart/tag'

const { Link } = Typography

export { default } from './Navigations'

type NavigationColumns = ColumnsType<Navigation>

export const useColumns = (columns?: NavigationColumns): NavigationColumns => [
  {
    title: '名称',
    dataIndex: 'title',
    width: 100,
    render: (value, navigation) =>
      createElement(Link, {
        href: navigation.link,
        children: value,
        target: '_blank'
      })
  },
  {
    title: '关联标签',
    dataIndex: 'tags',
    width: 100,
    render: (value: Tag[]) => {
      return value.map(({ name }) => name).join(',')
    }
  },
  {
    title: '封面地址',
    dataIndex: 'cover',
    width: 100,
    render: (value) =>
      createElement(Image, {
        src: value
      })
  },
  ...(columns || [])
]
