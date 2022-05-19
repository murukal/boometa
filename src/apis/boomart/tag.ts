// third
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
// project
import { fetcher } from '..'
import type { PaginateOutput, QueryParams } from '../../typings/api'
import type { CreateTagInput, Tag, TopTag, UpdateTagInput } from '../../typings/tag'

/**
 * 查询多个标签
 */
export const TAGS: TypedDocumentNode<
  {
    tags: PaginateOutput<Tag>
  },
  QueryParams
> = gql`
  query ($paginateInput: PaginateInput) {
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
  mutation ($id: Int!) {
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
  mutation ($createTagInput: CreateTagInput!) {
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
  mutation ($id: Int!, $updateTagInput: UpdateTagInput!) {
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

/**
 * 标签榜单 + 日创作量
 */
export const TOP_TAGS: TypedDocumentNode<
  {
    topTags: TopTag[]
  },
  {
    from: Date
    to: Date
  }
> = gql`
  query ($from: DateTime!, $to: DateTime!) {
    topTags(from: $from, to: $to) {
      id
      name
      dailyHeat {
        createdAtDate
        creationCount
      }
    }
  }
`
