import { gql, TypedDocumentNode } from '@apollo/client'
import { fetcher } from '.'

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
