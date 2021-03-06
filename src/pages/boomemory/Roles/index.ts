// antd
import { ColumnsType } from 'antd/lib/table'
// project
import { Role } from '~/typings/boomemory/role'

export { default } from './Roles'

/**
 * 获取菜单表格列
 * @param columns
 * @returns
 */
export const useColumns = <T = Role>(columns?: ColumnsType<T>): ColumnsType<T> => [
  {
    title: '角色名称',
    dataIndex: 'name',
    width: 100
  },
  ...(columns || [])
]
