// react
import { Dispatch, SetStateAction } from 'react'
// antd
import { TablePaginationConfig } from 'antd'
import { FilterValue, SorterResult } from 'antd/lib/table/interface'
// project
import { FetchAPI, PaginateOptions, QueryParams } from '../typings/api'

export interface fetchCallbacks<T> {
  setResults?: Dispatch<SetStateAction<T[]>>
  setPagination?: Dispatch<SetStateAction<TablePaginationConfig>>
}

export const getInitialPagination = (): TablePaginationConfig => ({
  current: 1,
  pageSize: 2,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '30']
})

export type FetchHandler<T> = (queryParams?: QueryParams<T>) => Promise<void>

/**
 * 获取页面的fetch事件
 * @param fetchAPI
 * @param callbacks
 * @returns
 */
export const getFetchHandler =
  <T>(fetchAPI: FetchAPI<T>, callbacks?: fetchCallbacks<T>): FetchHandler<T> =>
  async (
    queryParams = {
      pagination: getInitialPagination()
    }
  ) => {
    // 分页参数重构
    // 分页参数由前端统一转换为后端要求的字段
    const pagination: PaginateOptions = {
      page: queryParams.pagination.current,
      limit: queryParams.pagination.pageSize
    }

    const res = await fetchAPI({
      ...queryParams,
      pagination
    })

    if (!res.data) return

    callbacks?.setResults && callbacks.setResults(res.data.docs)
    callbacks?.setPagination &&
      callbacks.setPagination({
        ...queryParams.pagination,
        total: res.data.totalDocs
      })
  }

/**
 * 获取页面的表格变更事件
 * @param onFetch
 * @returns
 */
export const getTableChangeHandler =
  <T>(fetchHandler: FetchHandler<T>) =>
  (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<T> | SorterResult<T>[]) => {
    fetchHandler({
      // 分页参数
      pagination,
      // 筛选条件
      ...filters,
      // 排序
      sorter
    })
  }
