// third
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
// project
import type { PaginateOutput, QueryParams } from '~/typings/api'
import type { Navigation } from '~/typings/boomart/navigation'

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
      }
      page
      limit
      totalCount
    }
  }
`
