// react
import { ReactNode, useState, createElement } from 'react'
import type { MouseEventHandler } from 'react'
// antd
import { Button, Divider, Popconfirm, Space } from 'antd'
import type { PopconfirmProps, TablePaginationConfig } from 'antd'
// third
import { useQuery } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
import type { QueryParams } from '../typings/api'

export interface TableRowHandler {
  label: string
  onClick?: MouseEventHandler<HTMLElement>
  danger?: boolean
  popconfirmProps?: Omit<PopconfirmProps, 'onConfirm'>
}

/**
 * 动态生成表格的操作按钮
 */
export const getTableRowHandler = (handlers: TableRowHandler[]) => {
  const nodes: ReactNode[] = []

  handlers.forEach((handler, index) => {
    // 生成按钮的dom元素
    const button = createElement(
      Button,
      {
        type: 'link',
        size: 'small',
        onClick: handler.popconfirmProps ? undefined : handler.onClick,
        key: `${handler.label}-button`,
        danger: handler.danger
      },
      handler.label
    )

    // 生成确认框的dom元素
    handler.popconfirmProps
      ? nodes.push(
          createElement(
            Popconfirm,
            {
              ...handler.popconfirmProps,
              onConfirm: (e) => {
                e && handler.onClick && handler.onClick(e)
              },
              key: `${handler.label}-confirm`
            },
            // 按钮作为子元素
            button
          )
        )
      : nodes.push(button)

    // 每个元素后面添加一个分割线
    if (index < handlers.length - 1) {
      nodes.push(
        createElement(Divider, {
          type: 'vertical',
          key: `${handler.label}-divider`
        })
      )
    }
  })

  return createElement(Space, null, nodes)
}

/**
 * 自定义table hooks
 * 1. 集成 apollo client hook 请求后端数据
 */
export const useTableQuery = <T>(query: TypedDocumentNode<T, QueryParams>) => {
  // 初始化表格的分页参数
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '30'],
    total: 0
  })

  // 执行请求
  const {
    data,
    loading: isLoading,
    refetch
  } = useQuery(query, {
    variables: {
      paginateInput: {
        page: pagination.current,
        limit: pagination.pageSize || 10
      }
    }
  })

  // hooks返回
  return {
    // 数据集
    data,
    isLoading,
    pagination,

    // 事件
    refetch,
    setPagination
  }
}

/**
 * 表格变更的回调事件
 */
export const onTableChange = () => {}
