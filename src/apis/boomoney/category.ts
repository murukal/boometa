import { gql, TypedDocumentNode } from '@apollo/client'
import { PaginateInput, PaginateOutput } from '~/typings/api'
import { Category } from '~/typings/boomoney/category'
import { fetcher } from '..'

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
