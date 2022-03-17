import { gql, TypedDocumentNode } from '@apollo/client'
import { fetcher } from '.'
import { PaginateOutput, QueryParams } from '../typings/api'
import { DictionaryEnum } from '../typings/dictionary-enum'

/** 查询多个字典枚举 */
export const DICTIONARY_ENUMS: TypedDocumentNode<
  {
    dictionaryEnums: PaginateOutput<DictionaryEnum>
  },
  QueryParams
> = gql`
  query DictionaryEnums($paginateInput: PaginateInput) {
    dictionaryEnums(paginateInput: $paginateInput) {
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

/** 删除字典枚举 */
const REMOVE_DICTIONAAY_ENUM = gql`
  mutation RemoveDictionaryEnums($id: Int!) {
    removeDictionaryEnum(id: $id)
  }
`

export const remove = (id: number) =>
  fetcher.mutate({
    mutation: REMOVE_DICTIONAAY_ENUM,
    variables: {
      id
    }
  })
