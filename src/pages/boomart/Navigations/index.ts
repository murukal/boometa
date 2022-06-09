import { ColumnsType } from 'antd/lib/table'
import { Navigation } from '~/typings/boomart/navigation'
import { Tag } from '~/typings/boomart/tag'

export { default } from './Navigations'

type NavigationColumns = ColumnsType<Navigation>

export const useColumns = (columns?: NavigationColumns): NavigationColumns => [
  {
    title: '名称',
    dataIndex: 'title',
    width: 100
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
    width: 100
  },
  ...(columns || [])
]
