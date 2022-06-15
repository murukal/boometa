import { Button, Form, InputNumber, Typography } from 'antd'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { State } from '~/redux'

const { Title, Text, Paragraph } = Typography
const { Item } = Form

const Verify = () => {
  const emailAddress = useSelector<State, string | undefined>((state) => state.userProfile.user?.emailAddress)

  /**
   * 发送验证码邮件
   */
  const sendVerificationCode = async () => {
    const result = await fetch('/api/boomemory/auth/send-verification-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        emailAddress
      })
    })
    const data = await result.json()
    return data
  }

  useEffect(() => {}, [])

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
      >
        <Item
          name='captcha'
          label='验证码'
          rules={[
            {
              required: true,
              validator: async (rule, value: string | number | null) => {
                if (!value) {
                  throw new Error('请输入验证码')
                }

                const captcha = value.toString()

                if (captcha.length !== 6) {
                  throw new Error('验证码必须是6位数字')
                }

                return
              }
            }
          ]}
        >
          <InputNumber controls={false} style={{ width: '100%' }} precision={0} />
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
