// third
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
// project
import type { DailyClout } from '~/typings/toggle'

export const DAILY_CLOUTS: TypedDocumentNode<
  {
    dailyBrowseClout: DailyClout[]
    dailyLikeClout: DailyClout[]
    dailyCollectClout: DailyClout[]
  },
  {
    from: string
    to: string
  }
> = gql`
  query DailyClouts($from: DateTime!, $to: DateTime!) {
    dailyBrowseClout: dailyClout(type: Browse, from: $from, to: $to) {
      createdAtDate
      clout
    }
    dailyLikeClout: dailyClout(type: Like, from: $from, to: $to) {
      createdAtDate
      clout
    }
    dailyCollectClout: dailyClout(type: Collect, from: $from, to: $to) {
      createdAtDate
      clout
    }
  }
`
