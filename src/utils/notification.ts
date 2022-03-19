// antd
import { notification } from 'antd'
// third
import type { FetchResult } from '@apollo/client'

export const resultNotification = (result: FetchResult) => {
  const error = result.errors?.at(0)

  if (!error) return

  notification.error({
    message: result.errors?.at(0)?.message
  })
}
