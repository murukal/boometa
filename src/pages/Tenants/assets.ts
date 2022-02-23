// antd
import { ColumnsType } from 'antd/lib/table'
// project
import { Tenant } from '../../typings/tenant'

/**
 * 获取客户端表格列
 * @param columns
 * @returns
 */
export const getColumns = <T = Tenant>(columns?: ColumnsType<T>): ColumnsType<T> => [
  {
    title: '租户代码',
    dataIndex: 'code',
    width: 100
  },
  {
    title: '租户名称',
    dataIndex: 'name',
    width: 100
  },
  ...(columns || [])
]
