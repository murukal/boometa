import { gql, TypedDocumentNode } from '@apollo/client'
import { fetcher } from '.'
import { PaginateOutput, QueryParams } from '../typings/api'
import { Essay } from '../typings/essay'

/** 查询多个文章 */
export const ESSAYS: TypedDocumentNode<
  {
    essays: PaginateOutput<Essay>
  },
  QueryParams
> = gql`
  query Essays($paginateInput: PaginateInput) {
    essays(paginateInput: $paginateInput) {
      items {
        id
        createdAt
        updatedAt
        title
        content
        cover
      }
      page
      limit
      total
      pageCount
    }
  }
`

/** 删除文章 */
const REMOVE: TypedDocumentNode<
  {
    removeEssay: boolean
  },
  {
    id: number
  }
> = gql`
  mutation RemoveEssay($id: Int!) {
    removeEssay(id: $id)
  }
`

export const remove = (id: number) =>
  fetcher.mutate({
    mutation: REMOVE,
    variables: { id }
  })
