// third
import { stringify } from 'qs'
// project
import type { PaginateResult, QueryOptions } from '../typings/api'
import type { CreateTodo, Todo, UpdateTodo } from '../typings/todo'
import arq from '.'

/**
 * 获取全部的待办事项
 */
export const getTodos = (query: QueryOptions) => arq.get<PaginateResult<Todo>>(`/api/todo?${stringify(query)}`)

/**
 * 创建待办事项
 */
export const create = (todo: CreateTodo) => arq.post<Todo>(`/api/todo`, todo)

/**
 * 删除待办事项
 */
export const remove = (id: string) => arq.delete<Todo>(`/api/todo/${id}`)

/**
 * 更新待办
 */
export const update = (id: string, todo: UpdateTodo) => arq.patch<Todo>(`/api/todo/${id}`, todo)
