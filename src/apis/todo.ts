// npm
import { stringify } from 'qs'
// project
import { request } from '.'
import { PaginateResult, QueryOptions } from '../typings/api'
import { CreateTodo, Todo, UpdateTodo } from '../typings/todo'

/**
 * 获取全部的待办事项
 */
export const getTodos = (query: QueryOptions) =>
  request<PaginateResult<Todo>>({
    method: 'GET',
    url: `/api/todo?${stringify(query)}`
  })

/**
 * 创建待办事项
 */
export const create = (todo: CreateTodo) =>
  request<Todo>({
    method: 'POST',
    url: `/api/todo`,
    data: todo
  })

/**
 * 删除待办事项
 */
export const remove = (id: string) =>
  request<Todo>({
    method: 'DELETE',
    url: `/api/todo/${id}`
  })

/**
 * 更新待办
 */
export const update = (id: string, todo: UpdateTodo) =>
  request<Todo>({
    method: 'PATCH',
    url: `/api/todo/${id}`,
    data: todo
  })
