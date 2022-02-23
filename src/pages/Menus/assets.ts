// antd
import { ColumnsType } from 'antd/lib/table'
// project
import { MenuTreeNode } from '../../typings/menu'

/**
 * 获取菜单表格列
 * @param columns
 * @returns
 */
export const getColumns = <T = MenuTreeNode>(columns?: ColumnsType<T>): ColumnsType<T> => [
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
