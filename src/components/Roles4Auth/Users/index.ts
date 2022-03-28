// third
import type { FetchResult } from '@apollo/client'

export { default } from './Users'

export interface Props {
  roleId: number
  userIds: number[]
  onSubmitted: (result: FetchResult) => void
}
