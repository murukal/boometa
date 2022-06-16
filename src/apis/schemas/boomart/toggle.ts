// third
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
// project
import type { DailyClout } from '~/typings/boomart/toggle'

export const DAILY_CLOUTS: TypedDocumentNode<
  {
    dailyBrowseClout: DailyClout[]
    dailyLikeClout: DailyClout[]
    dailyCollectClout: DailyClout[]
  },
  {
    from: Date
    to: Date
  }
> = gql`
  query DailyClouts($from: DateTime!, $to: DateTime!) {
    dailyBrowseClout: dailyClout(type: Browse, targetType: Essay, from: $from, to: $to) {
      createdAtDate
      clout
    }
    dailyLikeClout: dailyClout(type: Like, targetType: Essay, from: $from, to: $to) {
      createdAtDate
      clout
    }
    dailyCollectClout: dailyClout(type: Collect, targetType: Essay, from: $from, to: $to) {
      createdAtDate
      clout
    }
  }
`
