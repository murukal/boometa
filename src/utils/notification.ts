// antd
import { notification } from 'antd'
import { IconType } from 'antd/lib/notification'

export const easyNotification = (description: string, type: IconType = 'success') => {
  notification.open({
    type,
    message: type === 'success' ? '操作成功！' : '操作异常！',
    description
  })
}
