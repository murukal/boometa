// antd
import { ColumnsType } from 'antd/lib/table'
// project
import { Blog } from '../../typings/blog'

/**
 * 获取字典表格列
 * @param columns
 * @returns
 */
export const getColumns = <T = Blog>(columns?: ColumnsType<T>): ColumnsType<T> => [
  {
    title: '博客标题',
    dataIndex: 'title',
    width: 100
  },
  ...(columns || [])
]
