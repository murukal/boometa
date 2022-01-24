// project
import { get, post, patch, shift } from '.'
import type { Blog, CreateBlog, UpdateBlog } from '../typings/blog'

const url = '/api/blog'

export const getBlogs = () => get(url)

export const create = (data: CreateBlog) => post(url, data)

export const update = (id: string, data: UpdateBlog) => patch(`${url}/${id}`, data)

export const remove = (id: string) => shift(`${url}/${id}`)

export const getBlogById = (id: string) => get<Blog>(`${url}/${id}`)
