// react
import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
// redux
import { useSelector } from 'react-redux'
// router
import { Link } from 'react-router-dom'
// antd
import { Button, Divider, Form, Input, notification, Typography } from 'antd'
import {
  LockOutlined,
  UserOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  MailOutlined,
  BorderlessTableOutlined
} from '@ant-design/icons'
import { useForm } from 'antd/lib/form/Form'
// third
import JSEncrypt from 'jsencrypt'
// project
import { useRegister, useSendCaptcha } from '~/apis/hooks/boomemory/auth'
import { reinitialize } from '~/utils/app'
import { passwordRegex } from '.'
import type { FormValues } from '.'
import type { State } from '~/redux'

const { Item } = Form
const { Title, Text } = Typography
const { Password } = Input

const Register = () => {
  const encryptor = useSelector<State, JSEncrypt>((state) => new JSEncrypt())
  const [form] = useForm<FormValues>()
  const [isTiming, setIsTiming] = useState(false)
  const [count, setCount] = useState(60)

  // 发送验证码hooks
  const [sendCaptcha] = useSendCaptcha()
  // 注册hooks
  const [register] = useRegister()

  /**
   * 计时器
   */
  useEffect(() => {
    if (!isTiming) return

    const interval = setInterval(() => {
      setCount((preCount) => {
        if (preCount <= 1) {
          setIsTiming(false)
          clearInterval(interval)
          return 60
        }
        return preCount - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isTiming])

  /**
   * 用户注册
   */
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

    const res = await register({
      variables: {
        registerInput: {
          username: formValues.username,
          emailAddress: formValues.emailAddress,
          captcha: formValues.captcha,
          password: encryptedPassword
        }
      }
    }).catch((error: Error) => {
      notification.error({
        message: error.message
      })
      return null
    })

    if (!res?.data?.register) return

    // 初始化token
    await reinitialize(res.data.register)
  }

  /**
   * 获取验证码
   */
  const onGetCaptcha = async () => {
    // 校验邮箱填写
    const isValid = await form.validateFields(['emailAddress']).catch(() => false)

    if (!isValid) return

    const isSent = await sendCaptcha({
      variables: {
        emailAddress: form.getFieldValue('emailAddress')
      }
    }).catch((error: Error) => {
      notification.error({
        message: error.message
      })

      return null
    })

    if (!isSent) return
    // 发送成功，进行计时
    setIsTiming(true)
  }

  /**
   * 验证码触发组件
   */
  const CaptchaTrigger = useMemo(() => {
    const styles: CSSProperties = {
      fontSize: '8px',
      padding: 0
    }

    // 未在倒计时，返回获取验证码按钮
    if (!isTiming)
      return (
        <Button style={styles} type='link' onClick={onGetCaptcha}>
          获取验证码
        </Button>
      )

    return <Text style={styles}>{`${count} 秒后重新获取`}</Text>
  }, [isTiming, count])

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
              message: '请输入用户名'
            }
          ]}
        >
          <Input size='large' prefix={<UserOutlined />} placeholder='用户名' maxLength={20} />
        </Item>

        <Item
          name='emailAddress'
          rules={[
            {
              required: true,
              message: '请输入邮箱地址'
            },
            {
              type: 'email',
              message: '邮箱地址不符合规范'
            }
          ]}
        >
          <Input size='large' prefix={<MailOutlined />} placeholder='邮箱地址' suffix={CaptchaTrigger} />
        </Item>

        <Item
          name='captcha'
          rules={[
            {
              required: true,
              message: '请输入验证码'
            }
          ]}
        >
          <Input size='large' prefix={<BorderlessTableOutlined />} placeholder='验证码' />
        </Item>

        <Item
          name='password'
          rules={[
            {
              required: true,
              message: '请输入密码'
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
            size='large'
            placeholder='确认密码'
            prefix={<LockOutlined />}
            iconRender={(isPasswordVisible: boolean) => (isPasswordVisible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Item>

        <Item>
          <Button block htmlType='submit' size='large' type='primary'>
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
