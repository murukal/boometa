// redux
import { useSelector } from 'react-redux'
// router
import { Link } from 'react-router-dom'
// antd
import { LockOutlined, UserOutlined, EyeTwoTone, EyeInvisibleOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, notification, Typography } from 'antd'
import { useForm } from 'antd/lib/form/Form'
// third
import JSEncrypt from 'jsencrypt'
// project
import { register } from '~/apis/boomemory/auth'
import { reinitialize } from '~/utils/app'
import { toggleStyle } from '..'
import { passwordRegex } from '.'
import { resultNotification } from '~/utils/notification'
import type { FormValues } from '.'
import type { State } from '~/redux'

const { Item } = Form
const { Title, Text } = Typography
const { Password } = Input

const Register = () => {
  const encryptor = useSelector<State, JSEncrypt>((state) => new JSEncrypt())

  const [form] = useForm<FormValues>()

  // 用户注册
  const onRegister = async () => {
    const formValues = form.getFieldsValue()

    // 利用公钥加密密码
    const encryptedPassword = encryptor.encrypt(formValues.password)

    if (!encryptedPassword) {
      notification.error({
        message: '密码加密失败！'
      })
      return
    }

    const result = await register({
      username: formValues.username,
      email: formValues.email,
      password: encryptedPassword
    })

    resultNotification(result)
    reinitialize(result.data?.register)
  }

  return (
    <div className='flex flex-col items-center'>
      <Title level={2}>Sign Up</Title>

      <Form
        style={{
          marginTop: 12,
          width: 300
        }}
        form={form}
        onFinish={onRegister}
      >
        <Item
          name='username'
          rules={[
            {
              required: true,
              message: '用户名必输！'
            }
          ]}
        >
          <Input style={toggleStyle} size='large' prefix={<UserOutlined />} placeholder='用户名' maxLength={20} />
        </Item>

        <Item
          name='email'
          rules={[
            {
              required: true,
              message: '邮箱必输！'
            },
            {
              type: 'email',
              message: '邮箱不符合规范！'
            }
          ]}
        >
          <Input style={toggleStyle} size='large' prefix={<MailOutlined />} placeholder='邮箱' />
        </Item>

        <Item
          name='password'
          rules={[
            {
              required: true,
              message: '密码必输！'
            },
            {
              validator: async (rule, value) => {
                if (!value) return

                if (!passwordRegex.test(value)) return Promise.reject('需包含大/小写字母，数组，特殊符号中三项！')
              }
            }
          ]}
        >
          <Password
            style={toggleStyle}
            size='large'
            placeholder='密码'
            prefix={<LockOutlined />}
            iconRender={(isPasswordVisible: boolean) => (isPasswordVisible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Item>

        <Item
          name='repeatPassword'
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: '请再次输入密码！'
            },
            ({ getFieldValue }) => ({
              validator: async (rule, value) => {
                if (!value) return

                if (value !== getFieldValue('password')) return Promise.reject('再次输入的密码必须跟密码保持一致！')
              }
            })
          ]}
        >
          <Password
            style={toggleStyle}
            size='large'
            placeholder='请再次输入密码'
            prefix={<LockOutlined />}
            iconRender={(isPasswordVisible: boolean) => (isPasswordVisible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Item>

        <Item>
          <Button block htmlType='submit' shape='round' size='large' type='primary'>
            注册
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
        已有账号，前往<Link to='/account/login'>登录</Link>
      </Text>
    </div>
  )
}

export default Register
