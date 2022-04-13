// third
import { gql, TypedDocumentNode } from '@apollo/client'
// project
import { fetcher } from '.'
import { PaginateOutput } from '~/typings/api'
import type { Menu, CreateMenuInput, UpdateMenuInput, FilterInput } from '~/typings/menu'

/**
 * 删除菜单
 */
const REMOVE: TypedDocumentNode<
  {
    removeMenu: boolean
  },
  {
    id: number
  }
> = gql`
  mutation RemoveMenu($id: Int!) {
    removeMenu(id: $id)
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
 * 创建菜单
 */
const CREATE: TypedDocumentNode<
  {
    createMenu: boolean
  },
  {
    createMenuInput: CreateMenuInput
  }
> = gql`
  mutation CreateMenu($createMenuInput: CreateMenuInput!) {
    createMenu(createMenuInput: $createMenuInput)
  }
`

export const create = (createMenuInput: CreateMenuInput) =>
  fetcher.mutate({
    mutation: CREATE,
    variables: {
      createMenuInput
    }
  })

/**
 * 更新菜单
 */
const UPDATE: TypedDocumentNode<
  {
    updateMenu: boolean
  },
  {
    id: number
    updateMenuInput: UpdateMenuInput
  }
> = gql`
  mutation UpdateMenu($id: Int!, $updateMenuInput: UpdateMenuInput!) {
    updateMenu(id: $id, updateMenuInput: $updateMenuInput)
  }
`

export const update = (id: number, updateMenuInput: UpdateMenuInput) =>
  fetcher.mutate({
    mutation: UPDATE,
    variables: {
      id,
      updateMenuInput
    }
  })

/**
 * 查询多个菜单
 */
const MENUS: TypedDocumentNode<
  {
    menus: PaginateOutput<Menu>
  },
  {
    filterInput: FilterInput
  }
> = gql`
  query Menus($filterInput: FilterMenuInput!) {
    menus(filterInput: $filterInput) {
      items {
        id
        name
        sortBy
        icon
        to
        component
        parentId
      }
    }
  }
`

export const getMenus = (tenantCode: string) =>
  fetcher.query({
    query: MENUS,
    variables: {
      filterInput: {
        tenantCode
      }
    },
    fetchPolicy: 'no-cache'
  })
