// third
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
// project
import { fetcher } from '.'
import type { PaginateOutput, QueryParams } from '../typings/api'
import type { Tag } from '../typings/tag'

/** 查询多个标签 */
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
      total
      pageCount
    }
  }
`

/** 删除标签 */
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
