// third
import { gql, TypedDocumentNode } from '@apollo/client'
// project
import { fetcher } from '../..'
import type { PaginateInput, PaginateOutput } from '~/typings/api'
import type { Category, CreateCategoryInput, UpdateCategoryInput } from '~/typings/boomoney/category'

/**
 * 分页查询分类
 */
export const CATEGORIES: TypedDocumentNode<
  {
    categories: PaginateOutput<Category>
  },
  {
    paginateInput?: PaginateInput
  }
> = gql`
  query ($paginateInput: PaginateInput) {
    categories(paginateInput: $paginateInput) {
      items {
        id
        name
        icon
      }
      page
      limit
      totalCount
    }
  }
`

/**
 * 删除分类
 */
const REMOVE: TypedDocumentNode<
  {
    removeCategory: boolean
  },
  {
    id: number
  }
> = gql`
  mutation ($id: Int!) {
    removeCategory(id: $id)
  }
`

export const remove = (id: number) =>
  fetcher.mutate({
    mutation: REMOVE,
    variables: {
      id
    }
  })

/**
 * 创建分类
 */
const CREATE: TypedDocumentNode<
  {
    createCategory: Category
  },
  {
    createCategoryInput: CreateCategoryInput
  }
> = gql`
  mutation ($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      id
    }
  }
`

export const create = (createCategoryInput: CreateCategoryInput) =>
  fetcher.mutate({
    mutation: CREATE,
    variables: {
      createCategoryInput
    }
  })

/**
 * 更新分类
 */
const UPDATE: TypedDocumentNode<
  { updateCategory: boolean },
  {
    id: number
    updateCategoryInput: UpdateCategoryInput
  }
> = gql`
  mutation ($id: Int!, $updateCategoryInput: UpdateCategoryInput!) {
    updateCategory(id: $id, updateCategoryInput: $updateCategoryInput)
  }
`

export const update = (id: number, updateCategoryInput: UpdateCategoryInput) =>
  fetcher.mutate({
    mutation: UPDATE,
    variables: {
      id,
      updateCategoryInput
    }
  })
