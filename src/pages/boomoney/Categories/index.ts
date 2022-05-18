import { ColumnsType } from 'antd/lib/table'
import { Category } from '~/typings/boomoney/category'
import * as Icons from 'react-icons/md'
import { createElement } from 'react'

export { default } from './Categories'

type CategoryColumns = ColumnsType<Category>

export const useColumns = (columns?: CategoryColumns): CategoryColumns => [
  {
    title: '名称',
    dataIndex: 'name',
    width: 100
  },
  {
    title: 'icon',
    dataIndex: 'icon',
    width: 100,
    render: (value) => {
      const Icon = Icons[value as keyof typeof Icons]

      if (!Icon) return value

      return createElement(Icon, {
        style: {
          fontSize: 24
        }
      })
    }
  },
  ...(columns || [])
]
