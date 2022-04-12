// antd
import { notification } from 'antd'
// third
import type { FetchResult } from '@apollo/client'
import type { GraphQLError } from 'graphql'

export const resultNotification = (result?: FetchResult) => {
  const errors = result?.errors as GraphQLError[] | undefined
  const error = errors?.at(0)

  if (!error) return

  notification.error({
    message: error?.message
  })
}
