// antd
import { ProFormCaptcha } from '@ant-design/pro-form'
import { LockOutlined } from '@ant-design/icons'
// project
import { easyNotification } from '../../../utils/notification'

interface Props {
  value?: string
  onChange?: (value: string) => void
}

const CaptchaFormItem = (props: Props) => {
  const onGetCaptcha = async () => {
    easyNotification('Murukal还在全力开发当前功能的路上～', 'error')
  }

  return (
    <ProFormCaptcha
      fieldProps={{
        size: 'large',
        prefix: <LockOutlined />
      }}
      captchaProps={{
        size: 'large'
      }}
      placeholder={'请输入验证码'}
      captchaTextRender={(timing, count) => {
        if (timing) {
          return `${count} ${'获取验证码'}`
        }
        return '获取验证码'
      }}
      name='captcha'
      rules={[
        {
          required: true,
          message: '请输入验证码！'
        }
      ]}
      onGetCaptcha={onGetCaptcha}
    />
  )
}

export default CaptchaFormItem
