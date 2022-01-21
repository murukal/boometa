// antd
import type { TablePaginationConfig } from 'antd'
// npm
export type { PaginateOptions, PaginateResult } from 'mongoose'

export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T | null
}

/**
 * QueryParams 在前端项目过程中传递的请求参数
 */
export interface QueryParams<RecordType = any> {
  pagination?: TablePaginationConfig
  sorter?: SorterResult<RecordType> | SorterResult<RecordType>[]
  filters?: Record<string, FilterValue>
}

/**
 * QueryOptions 在发起API请求时，转换给后端的请求参数
 */
export interface QueryOptions<RecordType = any> {
  pagination?: PaginateOptions
  sorter?: SorterResult<RecordType> | SorterResult<RecordType>[]
  [key: string]: any
}

/**
 * GET的请求函数
 */
export type FetchAPI<T> = (queryOptions: QueryOptions) => Promise<ApiResponse<PaginateResult<T> | T[] | null>>
