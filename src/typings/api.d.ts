// antd
import type { TablePaginationConfig } from 'antd'
import type { SorterResult, FilterValue } from 'antd/lib/table/interface'
// npm
import type { PaginateResult, QueryOptions as DBQueryOptions, FilterQuery } from 'mongoose'

export type { PaginateResult }

export interface PaginateOptions {
  page?: number
  limit?: number
}

export interface ApiResponse<T = any> {
  code: number
  message?: string
  data?: T | null
}

export type Sorter<T> = SorterResult<T> | SorterResult<T>[]

/**
 * QueryParams 在前端项目过程中传递的请求参数
 */
export interface QueryParams<RecordType = any> {
  pagination?: TablePaginationConfig
  sorter?: SorterResult<RecordType> | SorterResult<RecordType>[]
  filters?: Record<string, FilterValue | null>
}

/**
 * QueryOptions 在发起API请求时，转换给后端的请求参数
 */
export interface QueryOptions {
  pagination?: PaginateOptions
  sorter?: DBQueryOptions
  [K: string]: K extends 'pagination' ? PaginateOptions : K extends 'sorter' ? DBQueryOptions : FilterQuery
}

/**
 * GET的请求函数
 */
export type FetchAPI<T> = (queryOptions: QueryOptions) => Promise<ApiResponse<PaginateResult<T> | T[] | null>>
