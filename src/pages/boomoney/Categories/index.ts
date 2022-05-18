import { ColumnsType } from 'antd/lib/table'
import { Category } from '~/typings/boomoney/category'

export { default } from './Categories'

type CategoryColumns = ColumnsType<Category>

export const useColumns = (columns?: CategoryColumns): CategoryColumns => [
  {
    title: '名称',
    dataIndex: 'name',
    width: 100
  },
  {
    title: 'icon',
    dataIndex: 'icon',
    width: 100
  },
  ...(columns || [])
]
