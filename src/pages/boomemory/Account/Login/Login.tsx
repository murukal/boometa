// redux
import { useSelector } from 'react-redux'
// router
import { Link, useNavigate } from 'react-router-dom'
// antd
import { Button, Checkbox, Divider, Form, Input, notification, Typography } from 'antd'
import { EyeTwoTone, EyeInvisibleOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'
import { useForm } from 'antd/lib/form/Form'
// third
import JSEncrypt from 'jsencrypt'
// project
import { login } from '~/apis/boomemory/auth'
import { reinitialize } from '~/utils/app'
import { toggleStyle } from '..'
import { resultNotification } from '~/utils/notification'
import type { FormValues } from '.'
import type { State } from '~/redux'

const { Title, Text } = Typography
const { Item } = Form
const { Password } = Input

const Login = () => {
  const rsaPublicKey = useSelector<State, string | undefined>((state) => state.app.rsaPublicKey)
  const isVerified = useSelector<State, boolean | undefined>((state) => state.userProfile.user?.isVerified)
  const [form] = useForm<FormValues>()
  const navigate = useNavigate()

  // 执行登录
  const onLogin = async () => {
    const formValues = form.getFieldsValue()

    // 利用公钥对密码进行加密
    const encryptor = new JSEncrypt()
    rsaPublicKey && encryptor.setPublicKey(rsaPublicKey)
    const encryptedPassword = encryptor.encrypt(formValues.password)

    if (!encryptedPassword) {
      notification.error({
        message: '密码加密失败！'
      })
      return
    }

    const result = await login({
      keyword: formValues.keyword,
      password: encryptedPassword
    })

    resultNotification(result)

    // 初始化token
    await reinitialize(result.data?.login, formValues.isAutoLogin)

    // 用户待验证，跳转到验证页
    if (!isVerified) {
      navigate('/account/verify')
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <Title level={2}>Sign In</Title>

      <Form
        style={{
          marginTop: 12,
          width: 300
        }}
        form={form}
        onFinish={onLogin}
      >
        <Item name='keyword' rules={[{ required: true, message: '用户名/邮箱必输！' }]}>
          <Input size='large' style={toggleStyle} prefix={<UserOutlined />} placeholder='用户名/邮箱' />
        </Item>

        <Item name='password' rules={[{ required: true, message: '密码必输！' }]}>
          <Password
            size='large'
            style={toggleStyle}
            placeholder='密码'
            prefix={<LockOutlined />}
            iconRender={(isPasswordVisible: boolean) => (isPasswordVisible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Item>

        <div className='mb-6 flex justify-between'>
          <Item name='isAutoLogin' noStyle valuePropName='checked'>
            <Checkbox>记住我</Checkbox>
          </Item>

          <Link to='/account/forget-password'>忘记密码</Link>
        </div>

        <Item>
          <Button block htmlType='submit' shape='round' size='large' type='primary'>
            登录
          </Button>
        </Item>
      </Form>

      <Divider
        plain
        style={{
          marginTop: 0
        }}
      />

      <Text>
        没有账号，前往<Link to='/account/register'>注册</Link>
      </Text>
    </div>
  )
}

export default Login
