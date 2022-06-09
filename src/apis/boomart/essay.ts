// third
import { gql, TypedDocumentNode } from '@apollo/client'
// project
import { AppID } from '~/assets'
import { fetcher } from '..'
import type { PaginateOutput, QueryParams } from '~/typings/api'
import type { CreateEssayInput, Essay, UpdateEssayInput } from '~/typings/boomart/essay'

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
      totalCount
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
    variables: { id },
    context: {
      appId: AppID.Boomart
    }
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
    },
    context: {
      appId: AppID.Boomart
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
    updateEssay(id: $id, updateEssayInput: $updateEssayInput)
  }
`

export const update = (id: number, updateEssayInput: UpdateEssayInput) =>
  fetcher.mutate({
    mutation: UPDATE,
    variables: {
      id,
      updateEssayInput
    },
    context: {
      appId: AppID.Boomart
    }
  })

/**
 * 查询单个文章
 */
const ESSAY: TypedDocumentNode<
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

export const getEssay = (id: number) =>
  fetcher.query({
    query: ESSAY,
    variables: {
      id
    },
    fetchPolicy: 'no-cache',
    context: {
      appId: AppID.Boomart
    }
  })
