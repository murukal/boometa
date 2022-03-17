// third
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
import { PaginateOutput, QueryParams } from '../typings/api'
import { Dictionary } from '../typings/dictionary'
import { fetcher } from '.'

/** 查询多个字典 */
export const DICTIONARIES: TypedDocumentNode<
  {
    dictionaries: PaginateOutput<Dictionary>
  },
  QueryParams
> = gql`
  query Dictionaries($paginateInput: PaginateInput) {
    dictionaries(paginateInput: $paginateInput) {
      items {
        id
        createdAt
        updatedAt
        code
        description
        sortBy
      }
      page
      limit
      total
      pageCount
    }
  }
`

/** 删除字典 */
const REMOVE: TypedDocumentNode<
  {
    removeDictionary: boolean
  },
  {
    id: number
  }
> = gql`
  mutation RemoveDictionary($id: Int!) {
    removeDictionary(id: $id)
  }
`

export const remove = (id: number) =>
  fetcher.mutate({
    mutation: REMOVE,
    variables: {
      id
    }
  })
