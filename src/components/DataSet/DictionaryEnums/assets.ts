// antd
import { ColumnsType } from 'antd/lib/table'
// project
import { DictionaryEnum } from '../../../typings/dictionaryEnum'

export interface Props {
  dictionaryId: string
}

/**
 * 获取字典枚举表格列
 * @param columns
 * @returns
 */
export const getColumns = <T = DictionaryEnum>(columns?: ColumnsType<T>): ColumnsType<T> => [
  {
    title: '枚举描述',
    dataIndex: 'description',
    width: 100
  },
  {
    title: '枚举代码',
    dataIndex: 'code',
    width: 100
  },
  {
    title: '排序码',
    dataIndex: 'sort',
    width: 100
  },
  ...(columns || [])
]