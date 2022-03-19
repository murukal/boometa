import { gql, TypedDocumentNode } from '@apollo/client'
import { fetcher } from '.'
import { PaginateOutput, QueryParams } from '../typings/api'
import { CreateEssayInput, Essay, UpdateEssayInput } from '../typings/essay'

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

/**
 * 创建文章
 */
const CREATE: TypedDocumentNode<
  {
    createEssay: Essay
  },
  {
    createEssayInput: CreateEssayInput
  }
> = gql`
  mutation CreateEssay($createEssayInput: CreateEssayInput!) {
    createEssay(createEssayInput: $createEssayInput) {
      id
      title
      content
      cover
    }
  }
`

export const create = (createEssayInput: CreateEssayInput) =>
  fetcher.mutate({
    mutation: CREATE,
    variables: {
      createEssayInput
    }
  })

/**
 * 更新文章
 */
const UPDATE: TypedDocumentNode<
  {
    updateEssay: boolean
  },
  {
    id: number
    updateEssayInput: UpdateEssayInput
  }
> = gql`
  mutation UpdateEssay($id: Int!, $updateEssayInput: UpdateEssayInput!) {
    updateEssay(updateEssayInput: $updateEssayInput)
  }
`

export const update = (id: number, updateEssayInput: UpdateEssayInput) =>
  fetcher.mutate({
    mutation: UPDATE,
    variables: {
      id,
      updateEssayInput
    }
  })

/**
 * 查询单个文章
 */
export const ESSAY: TypedDocumentNode<
  {
    essay: Essay
  },
  {
    id: number
  }
> = gql`
  query Essay($id: Int!) {
    essay(id: $id) {
      id
      title
      content
      cover
      tagIds
    }
  }
`
