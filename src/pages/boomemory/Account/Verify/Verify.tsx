import { Button, Form, Input, Typography } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { verify } from '~/apis/schemas/boomemory/auth'
import { useSendCaptcha } from '~/apis/hooks/boomemory/auth'
import { State } from '~/redux'
import { verified } from '~/redux/user-profile'
import { resultNotification } from '~/utils/notification'
import { FormValues } from '.'

const { Title, Text, Paragraph } = Typography
const { Item } = Form

const Verify = () => {
  const emailAddress = useSelector<State, string | undefined>((state) => state.userProfile.user?.emailAddress)
  const dispatch = useDispatch()

  /**
   * 发送验证码邮件hooks
   */
  const [sendCaptcha] = useSendCaptcha()

  /**
   * 页面初始化
   */
  useEffect(() => {
    // 发送验证码
    // sendCaptcha()
  }, [])

  /**
   * 表单提交
   */
  const onFinish = async (values: FormValues) => {
    // 验证请求
    const result = await verify(values)
    // 验证结果通知
    resultNotification(result)
    // 设置全局store状态
    result.data?.verify && dispatch(verified())
  }

  return (
    <div className='flex flex-col shadow-lg m-20 p-10 rounded-lg'>
      <Title className='self-center'>请输入验证码</Title>
      <Paragraph>
        为了安全，番土番土已经向您的邮箱<Text code>{emailAddress}</Text>发送了验证码！
      </Paragraph>

      <Paragraph>您必须输入验证码，才能继续登录！</Paragraph>

      <Form layout='vertical' onFinish={onFinish}>
        <Item
          name='captcha'
          label='验证码'
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input />
        </Item>

        <Item noStyle>
          <Button block htmlType='submit' size='large' type='primary'>
            继 续 登 录
          </Button>
        </Item>
      </Form>
    </div>
  )
}

export default Verify
