// third
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
// project
import { fetcher } from '.'
import type { PaginateOutput, QueryParams } from '../typings/api'
import type { CreateDictionaryEnumInput, DictionaryEnum, UpdateDictionaryEnumInput } from '../typings/dictionary-enum'

/**
 * 查询多个字典枚举
 */
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

/**
 * 删除字典枚举
 */
const REMOVE: TypedDocumentNode<
  {
    removeDictionaryEnum: boolean
  },
  {
    id: number
  }
> = gql`
  mutation RemoveDictionaryEnums($id: Int!) {
    removeDictionaryEnum(id: $id)
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
 * 创建字典
 */
const CREATE: TypedDocumentNode<
  {
    createDictionary: DictionaryEnum
  },
  {
    createDictionaryEnumInput: CreateDictionaryEnumInput
  }
> = gql`
  mutation CreateDictionaryEnum($createDictionaryEnumInput: CreateDictionaryEnumInput!) {
    createDictionaryEnum(createDictionaryEnumInput: $createDictionaryEnumInput) {
      id
    }
  }
`

export const create = (createDictionaryEnumInput: CreateDictionaryEnumInput) =>
  fetcher.mutate({
    mutation: CREATE,
    variables: {
      createDictionaryEnumInput
    }
  })

/**
 * 更新字典
 */
const UPDATE: TypedDocumentNode<
  {
    updateDictionary: boolean
  },
  {
    id: number
    updateDictionaryEnumInput: UpdateDictionaryEnumInput
  }
> = gql`
  mutation UpdateDictionaryEnum($id: Int!, $updateDictionaryEnumInput: UpdateDictionaryEnumInput!) {
    updateDictionaryEnum(id: $id, updateDictionaryEnumInput: $updateDictionaryEnumInput)
  }
`

export const update = (id: number, updateDictionaryEnumInput: UpdateDictionaryEnumInput) =>
  fetcher.mutate({
    mutation: UPDATE,
    variables: {
      id,
      updateDictionaryEnumInput
    }
  })
