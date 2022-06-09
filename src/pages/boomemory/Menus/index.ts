// antd
import { ColumnsType } from 'antd/lib/table'
// project
import { Menu } from '~/typings/boomemory/menu'

export { default } from './Menus'

/**
 * 获取菜单表格列
 */
export const useColumns = <T = Menu>(columns?: ColumnsType<T>): ColumnsType<T> => [
  {
    title: '菜单描述',
    dataIndex: 'name',
    width: 100
  },
  {
    title: '排序码',
    dataIndex: 'sortBy',
    width: 100
  },
  ...(columns || [])
]
