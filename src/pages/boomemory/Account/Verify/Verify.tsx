import { useMutation } from '@apollo/client'
import { Button, Form, Input, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { SEND_CAPTCHA, verify } from '~/apis/boomemory/auth'
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
   * 发送验证码邮件
   */
  useMutation(SEND_CAPTCHA, {
    variables: {
      emailAddress: emailAddress || ''
    },
    fetchPolicy: 'no-cache'
  })

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
    <div className='flex flex-col shadow-lg m-10 p-10'>
      <Title className='self-center'>请输入验证码</Title>
      <Paragraph>
        为了安全，fantufantu已经向您的邮箱<Text code>{emailAddress}</Text>发送了验证码！
      </Paragraph>

      <Paragraph>您必须输入验证码，才能继续登录！</Paragraph>

      <Form
        labelCol={{
          span: 24
        }}
        wrapperCol={{
          span: 24
        }}
        onFinish={onFinish}
      >
        <Item
          name='captcha'
          label='验证码'
          rules={[
            {
              required: true,
              validator: async (rule, value) => {
                if (!value) {
                  throw new Error('请输入验证码')
                }
                return
              }
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
