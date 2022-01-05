// npm
import { PaginateOptions as OriginPaginateOptions, PaginateResult as OriginPaginateResult } from 'mongoose'
// antd
import { TablePaginationConfig } from 'antd'

export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T | null
}

export interface PaginateOptions extends OriginPaginateOptions {}

export interface PaginateResult<T> extends OriginPaginateResult<T> {}

/**
 * QueryParams 在前端项目过程中传递的请求参数
 */
export interface QueryParams<RecordType = any> {
  pagination: TablePaginationConfig
  sorter?: SorterResult<RecordType> | SorterResult<RecordType>[]
  [key: string]: FilterValue | TablePaginationConfig | SorterResult<RecordType> | SorterResult<RecordType>[] | null | undefined
}

/**
 * QueryOptions 在发起API请求时，转换给后端的请求参数
 */
export interface QueryOptions<RecordType = any> {
  pagination: PaginateOptions
  sorter?: SorterResult<RecordType> | SorterResult<RecordType>[]
  [key: string]: FilterValue | TablePaginationConfig | SorterResult<RecordType> | SorterResult<RecordType>[] | null | undefined
}

/**
 * GET的请求函数
 */
export type FetchAPI<T> = (queryOptions: QueryOptions) => Promise<ApiResponse<PaginateResult<T> | null>>
