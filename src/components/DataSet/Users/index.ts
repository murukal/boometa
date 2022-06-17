// react
import { createElement } from 'react'
// antd
import { Avatar } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import type { TableRowSelection } from 'antd/lib/table/interface'
// project
import type { User } from '~/typings/boomemory/user'

export { default } from './Users'

export interface Props {
  ids?: number[]
  excludeUserIds?: number[]
  rowSelection?: TableRowSelection<User>
}

/**
 * 获取的用户清单的列
 */
export const useColumns = <T = User>(columns?: ColumnsType<T>): ColumnsType<T> => [
  {
    title: '用户名',
    dataIndex: 'username',
    width: 100
  },

  {
    title: '头像',
    dataIndex: 'avatar',
    width: 100,
    render: (value) =>
      createElement(Avatar, {
        src: value
      })
  },

  {
    title: '邮箱',
    dataIndex: 'emailAddress',
    width: 100
  },

  ...(columns || [])
]
