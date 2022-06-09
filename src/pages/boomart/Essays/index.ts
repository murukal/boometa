// antd
import { ColumnsType } from 'antd/lib/table'
// project
import { Essay } from '~/typings/boomart/essay'

export { default } from './Essays'

/**
 * 获取字典表格列
 * @param columns
 * @returns
 */
export const useColumns = <T = Essay>(columns?: ColumnsType<T>): ColumnsType<T> => [
  {
    title: '文章标题',
    dataIndex: 'title',
    width: 100
  },
  ...(columns || [])
]
