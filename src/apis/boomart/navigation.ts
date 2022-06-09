// third
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
// project
import type { PaginateOutput, QueryParams } from '~/typings/api'
import type { CreateNavigationInput, Navigation, UpdateNavigationInput } from '~/typings/boomart/navigation'
import { fetcher } from '..'
import { AppID } from '~/assets'

/**
 * 分页查询文章
 */
export const NAVIGATIONS: TypedDocumentNode<
  {
    navigations: PaginateOutput<Navigation>
  },
  QueryParams
> = gql`
  query Navigations($paginateInput: PaginateInput) {
    navigations(paginateInput: $paginateInput) {
      items {
        id
        title
        cover
        tags {
          id
          name
        }
      }
      page
      limit
      totalCount
    }
  }
`

/**
 * 创建文章
 */
const CREATE: TypedDocumentNode<
  {
    createNavigation: boolean
  },
  {
    createNavigationInput: CreateNavigationInput
  }
> = gql`
  mutation CreateNavigation($createNavigationInput: CreateNavigationInput!) {
    createNavigation(createNavigationInput: $createNavigationInput)
  }
`

export const create = (createNavigationInput: CreateNavigationInput) =>
  fetcher.mutate({
    mutation: CREATE,
    variables: {
      createNavigationInput
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
    updateNavigation: boolean
  },
  {
    id: number
    updateNavigationInput: UpdateNavigationInput
  }
> = gql`
  mutation UpdateNavigation($id: Int!, $updateNavigationInput: UpdateNavigationInput!) {
    updateNavigation(id: $id, updateNavigationInput: $updateNavigationInput)
  }
`

export const update = (id: number, updateNavigationInput: UpdateNavigationInput) =>
  fetcher.mutate({
    mutation: UPDATE,
    variables: {
      id,
      updateNavigationInput
    },
    context: {
      appId: AppID.Boomart
    }
  })

/**
 * 删除文章
 */
const REMOVE: TypedDocumentNode<
  {
    removeNavigation: boolean
  },
  {
    id: number
  }
> = gql`
  mutation RemoveNavigation($id: Int!) {
    removeNavigation(id: $id)
  }
`

export const remove = (id: number) =>
  fetcher.mutate({
    mutation: REMOVE,
    variables: {
      id
    },
    context: {
      appId: AppID.Boomart
    }
  })
