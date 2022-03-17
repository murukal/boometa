/**
 * 分页参数
 */
export interface PaginateInput {
  page?: number
  limit: number
}

/**
 * 分页返回
 */
export interface PaginateOutput<T> {
  items?: T[]
  total?: number
  page?: number
  limit?: number
  pageCount?: number
}

/**
 * 查询的通用参数
 */
export interface QueryParams {
  paginateInput?: PaginateInput
}
