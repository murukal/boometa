// third
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
// project
import { fetcher } from '..'
import type { PaginateOutput, QueryParams } from '~/typings/api'
import type { Dictionary, CreateDictionaryInput } from '~/typings/boomemory/dictionary'

/**
 * 查询多个字典
 */
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
      totalCount
    }
  }
`

/**
 * 删除字典
 */
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

/**
 * 创建字典
 */
const CREATE: TypedDocumentNode<
  {
    createDictionary: Dictionary
  },
  {
    createDictionaryInput: CreateDictionaryInput
  }
> = gql`
  mutation CreateDictionary($createDictionaryInput: CreateDictionaryInput!) {
    createDictionary(createDictionaryInput: $createDictionaryInput) {
      id
    }
  }
`

export const create = (createDictionaryInput: CreateDictionaryInput) =>
  fetcher.mutate({
    mutation: CREATE,
    variables: {
      createDictionaryInput
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
    updateDictionaryInput: CreateDictionaryInput
  }
> = gql`
  mutation UpdateDictionary($id: Int!, $updateDictionaryInput: UpdateDictionaryInput!) {
    updateDictionary(id: $id, updateDictionaryInput: $updateDictionaryInput)
  }
`

export const update = (id: number, updateDictionaryInput: CreateDictionaryInput) =>
  fetcher.mutate({
    mutation: UPDATE,
    variables: {
      id,
      updateDictionaryInput
    }
  })
