import { ColumnsType } from 'antd/lib/table'
import { Navigation } from '~/typings/boomart/navigation'

export { default } from './Navigations'

type NavigationColumns = ColumnsType<Navigation>

export const useColumns = (columns?: NavigationColumns): NavigationColumns => [
  {
    title: '名称',
    dataIndex: 'title',
    width: 100
  },
  ...(columns || [])
]
