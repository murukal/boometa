// antd
import type { TablePaginationConfig } from 'antd'
import type { SorterResult } from 'antd/lib/table/interface'
// third
import type { ApolloQueryResult } from '@apollo/client'

/**
 * 分页参数
 */
export interface PaginateInput {
  page?: number
  limit?: number
}

/**
 * 分页返回
 */
export interface PaginateOutput<T> {
  items: T[]
  total: number
  page: number
  limit: number
  pageCount: number
}

/**
 * QueryParams 在前端项目过程中传递的请求参数
 */
export interface QueryParams<RecordType = any> {
  pagination?: TablePaginationConfig
  sorter?: SorterResult<RecordType> | SorterResult<RecordType>[]
  filters?: Record<string, any>
}

/**
 * QueryOptions 在发起API请求时，转换给后端的请求参数
 */
export interface QueryOptions extends Record<string, any> {
  paginateInput?: PaginateOptions
}

/**
 * GET的请求函数
 */
export type FetchAPI<T> = (queryOptions: QueryOptions) => Promise<ApolloQueryResult<PaginateOutput<T> | T[] | null>>
