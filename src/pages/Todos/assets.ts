// react
import { createElement } from 'react'
// antd
import { ColumnsType } from 'antd/lib/table'
import { CheckCircleTwoTone, ExclamationCircleTwoTone } from '@ant-design/icons'
// project
import { Todo } from '../../typings/todo'

/**
 * 获取客户端表格列
 * @param columns
 * @returns
 */
export const getColumns = <T = Todo>(columns?: ColumnsType<T>): ColumnsType<T> => [
  {
    title: '待办描述',
    dataIndex: 'description',
    width: 300
  },
  {
    title: '待办状态',
    dataIndex: 'status',
    width: 100,
    render(value) {
      return value === 'closed'
        ? createElement(CheckCircleTwoTone, {
            style: {
              fontSize: '28px'
            },
            twoToneColor: '#52c41a'
          })
        : createElement(ExclamationCircleTwoTone, {
            style: {
              fontSize: '28px'
            },
            twoToneColor: '#eb2f96'
          })
    }
  },
  ...(columns || [])
]
