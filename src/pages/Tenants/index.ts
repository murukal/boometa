// antd
import { Switch } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { createElement } from 'react'
// project
import { Tenant } from '~/typings/tenant'

export { default } from './Tenants'

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
  {
    title: '是否鉴权',
    dataIndex: 'isAuthorizate',
    width: 100,
    render: (value: boolean) =>
      createElement(Switch, {
        disabled: true,
        checked: value
      })
  },
  ...(columns || [])
]
