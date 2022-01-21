// react
import { createElement } from 'react'
// antd
import { Avatar } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
// project
import type { User } from '../../typings/user'

export interface Props {
  ids?: string[]
  isSetting?: boolean
}

/**
 * 获取的用户清单的列
 * @param columns
 * @returns
 */
export const getColumns = <T = User>(columns?: ColumnsType<T>): ColumnsType<T> => [
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
    dataIndex: 'email',
    width: 100
  },

  {
    title: '手机号',
    dataIndex: 'phone',
    width: 100
  },

  ...(columns || [])
]
