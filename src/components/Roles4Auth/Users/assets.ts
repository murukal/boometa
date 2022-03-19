// third
import type { FetchResult } from '@apollo/client'

export interface Props {
  roleId: number
  userIds: number[]
  onSubmitted: (result: FetchResult) => void
}
