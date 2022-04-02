// third
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
// project
import { fetcher } from '.'
import type { PaginateOutput, QueryParams } from '../typings/api'
import type { CreateTagInput, Tag, UpdateTagInput } from '../typings/tag'

/**
 * 查询多个标签
 */
export const TAGS: TypedDocumentNode<
  {
    tags: PaginateOutput<Tag>
  },
  QueryParams
> = gql`
  query Tags($paginateInput: PaginateInput) {
    tags(paginateInput: $paginateInput) {
      items {
        id
        createdAt
        updatedAt
        name
        image
      }
      page
      limit
      totalCount
    }
  }
`

/**
 * 删除标签
 */
const REMOVE: TypedDocumentNode<
  {
    removeTag: boolean
  },
  {
    id: number
  }
> = gql`
  mutation RemoveTag($id: Int!) {
    removeTag(id: $id)
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
 * 创建标签
 */
const CREATE: TypedDocumentNode<
  {
    createTag: Tag
  },
  {
    createTagInput: CreateTagInput
  }
> = gql`
  mutation CreateTag($createTagInput: CreateTagInput!) {
    createTag(createTagInput: $createTagInput) {
      id
      name
      image
    }
  }
`

export const create = (createTagInput: CreateTagInput) =>
  fetcher.mutate({
    mutation: CREATE,
    variables: {
      createTagInput
    }
  })

/** 更新标签 */
const UPDATE: TypedDocumentNode<
  {
    updateTag: boolean
  },
  {
    id: number
    updateTagInput: UpdateTagInput
  }
> = gql`
  mutation UpdateTag($id: Int!, $updateTagInput: UpdateTagInput!) {
    updateTag(id: $id, updateTagInput: $updateTagInput)
  }
`

export const update = (id: number, updateTagInput: UpdateTagInput) =>
  fetcher.mutate({
    mutation: UPDATE,
    variables: {
      id,
      updateTagInput
    }
  })
