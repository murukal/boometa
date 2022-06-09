// antd
import { ColumnsType } from 'antd/lib/table'
// project
import { Dictionary } from '~/typings/boomemory/dictionary'

export { default } from './Dictionaries'

/**
 * 获取字典表格列
 */
export const useColumns = <T = Dictionary>(columns?: ColumnsType<T>): ColumnsType<T> => [
  {
    title: '字典Code',
    dataIndex: 'code',
    width: 100
  },
  {
    title: '字典描述',
    dataIndex: 'description',
    width: 100
  },
  {
    title: '排序码',
    dataIndex: 'sortBy',
    width: 100
  },
  ...(columns || [])
]
