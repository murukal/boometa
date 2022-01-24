// npm
import { stringify } from 'qs'
// project
import type { PaginateResult, QueryOptions } from '../typings/api'
import type { CreateTodo, Todo, UpdateTodo } from '../typings/todo'
import { get, post, shift, patch } from '.'

/**
 * 获取全部的待办事项
 */
export const getTodos = (query: QueryOptions) => get<PaginateResult<Todo>>(`/api/todo?${stringify(query)}`)

/**
 * 创建待办事项
 */
export const create = (todo: CreateTodo) => post<Todo>(`/api/todo`, todo)

/**
 * 删除待办事项
 */
export const remove = (id: string) => shift<Todo>(`/api/todo/${id}`)

/**
 * 更新待办
 */
export const update = (id: string, todo: UpdateTodo) => patch<Todo>(`/api/todo/${id}`, todo)
