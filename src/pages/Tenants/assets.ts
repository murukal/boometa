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
    title: '客户端代号',
    dataIndex: 'code',
    width: 100
  },
  {
    title: '客户端描述',
    dataIndex: 'description',
    width: 100
  },
  ...(columns || [])
]
