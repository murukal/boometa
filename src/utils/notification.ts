// antd
import { notification } from 'antd'
import { IconType } from 'antd/lib/notification'

// project
import { ApiResponse } from '../typings/api'

export const responseNotification = (response: ApiResponse) => {
  notification.open({
    type: response.code ? 'error' : 'success',
    message: response.message
  })
}

export const easyNotification = (description: string, type: IconType = 'success') => {
  notification.open({
    type,
    message: type === 'success' ? '操作成功！' : '操作异常！',
    description
  })
}
