// react
import type { Dispatch, SetStateAction, MouseEventHandler, ReactNode } from 'react'
import { createElement, useCallback, useState } from 'react'
// antd
import type { TablePaginationConfig, PopconfirmProps } from 'antd'
import type { FilterValue, SorterResult } from 'antd/lib/table/interface'
import { Button, Divider, Popconfirm, Space } from 'antd'
// project
import type { FetchAPI, PaginateOptions, QueryParams } from '../typings/api'

export interface FetchCallbacks<T> {
  setResults?: Dispatch<SetStateAction<T[]>>
  setPagination?: Dispatch<SetStateAction<TablePaginationConfig>>
  setSorter?: Dispatch<SetStateAction<any>>
  setFilters?: Dispatch<SetStateAction<any>>
}

export interface TableRowHandler {
  label: string
  onClick?: MouseEventHandler<HTMLElement>
  danger?: boolean
  popconfirmProps?: PopconfirmProps
}

export const getInitialPagination = (): TablePaginationConfig => ({
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '30']
})

export type FetchHandler<T> = (queryParams?: QueryParams<T>) => Promise<void> | void

/**
 * 获取页面的fetch事件
 * @param fetchAPI
 * @param callbacks
 * @returns
 */
const getFetchHandler =
  <T>(fetchAPI: FetchAPI<T>, callbacks?: FetchCallbacks<T>): FetchHandler<T> =>
  async (queryParams) => {
    const initialPagination = getInitialPagination()
    // 分页参数重构
    // 分页参数由前端统一转换为后端要求的字段
    const pagination: PaginateOptions = {
      page: queryParams?.pagination?.current || initialPagination.current,
      limit: queryParams?.pagination?.pageSize || initialPagination.pageSize
    }

    const res = await fetchAPI({
      ...queryParams,
      pagination
    })

    // 分页查询的结果放在docs中
    // 非分页查询的结果直接放在data中
    callbacks?.setResults && callbacks.setResults(res.data?.docs || res.data || [])

    // 设置分页state
    callbacks?.setPagination &&
      callbacks.setPagination({
        ...queryParams?.pagination,
        total: res.data?.totalDocs || 0
      })

    // 设置排序state
    callbacks?.setSorter && callbacks?.setSorter(queryParams?.sorter)

    // 设置筛选state
    callbacks?.setFilters && callbacks?.setFilters(queryParams?.filters)
  }

/**
 * 获取页面的表格变更事件
 * @param onFetch
 * @returns
 */
const getTableChangeHandler =
  <T>(fetchHandler: FetchHandler<T>) =>
  (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<T> | SorterResult<T>[]) => {
    fetchHandler({
      // 分页参数
      pagination,
      // 筛选条件
      filters,
      // 排序
      sorter
    })
  }

/**
 * 动态生成表格的操作按钮
 * @param handlers
 * @returns
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
 * 创建一个自定义的hooks，该hooks能被表格实例使用
 */
export const useTable = <T>(fetchAPI: FetchAPI<T>) => {
  const [results, setResults] = useState<T[]>([])
  const [pagination, setPagination] = useState(getInitialPagination())
  const [filters, setFilters] = useState<Record<string, FilterValue>>()
  const [sorter, setSorter] = useState<SorterResult<T> | SorterResult<T>[]>()
  const [isLoading, setIsLoading] = useState(false)

  const onFetch = useCallback(
    async (
      queryParams: QueryParams<T> = {
        pagination,
        filters,
        sorter
      }
    ) => {
      // 表格的加载状态 --开始加载
      setIsLoading(true)

      const handler = getFetchHandler<T>(fetchAPI, {
        setResults,
        setPagination,
        setFilters,
        setSorter
      })

      await handler({
        pagination: queryParams.pagination,
        filters: queryParams.filters,
        sorter: queryParams.sorter
      })

      // 表格的加载状态 --结束加载
      setIsLoading(false)
    },
    [pagination]
  )

  const onTableChange = getTableChangeHandler<T>(onFetch)

  return {
    handlers: {
      onFetch,
      onTableChange
    },
    props: {
      results,
      pagination,
      filters,
      sorter,
      isLoading
    }
  }
}
