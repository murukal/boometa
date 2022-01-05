// react
import { ChangeEvent, useState } from 'react'
// redux
import { useDispatch, useStore } from 'react-redux'
// router
import { useNavigate } from 'react-router-dom'
// antd
import { LoginForm, ProFormText } from '@ant-design/pro-form'
import { ConfigProvider, createIntl } from '@ant-design/pro-provider'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
// project
import PhoneFormItem from '../../../components/Form/PhoneFormItem'
import CaptchaFormItem from '../../../components/Form/CaptchaFormItem'
import { register } from '../../../apis/account'
import { easyNotification, responseNotification } from '../../../utils/notification'
import { authenticate } from '../../../redux/userProfile/actions'

const Register = () => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const navigate = useNavigate()
  const store = useStore()
  const dispatch = useDispatch()
  const tenant = store.getState().tenant

  const intl = createIntl('zh_CN', {
    loginForm: {
      submitText: '注册'
    }
  })
  const onPhoneChange = (value: string) => {
    setPhone(value)
  }
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  // 用户注册
  const onRegister = async () => {
    const encryptedPassword = tenant.encrypter.encrypt(password)

    if (!encryptedPassword) {
      easyNotification('密码加密失败', 'error')
      return
    }

    const res = await register({
      tenantCode: tenant.code,
      phone,
      username,
      password: encryptedPassword
    })

    res.data && dispatch(await authenticate(res.data))

    // 登录成功的状态下，回调页面至首页
    store.getState().userProfile.isLogin && navigate('/')

    responseNotification(res)
  }

  return (
    <ConfigProvider
      value={{
        intl,
        valueTypeMap: {}
      }}
    >
      <LoginForm className='flex flex-col justify-center' title='BOOMETA' subTitle='这里可能有一些你感兴趣的' onFinish={onRegister}>
        <ProFormText
          name='username'
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined />,
            value: username,
            onChange: onUsernameChange
          }}
          placeholder='用户名'
          rules={[
            {
              required: true,
              message: '请输入用户名!'
            }
          ]}
        />

        <PhoneFormItem value={phone} onChange={onPhoneChange} />
        <CaptchaFormItem />

        <ProFormText.Password
          name='password'
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined />,
            value: password,
            onChange: onPasswordChange
          }}
          placeholder='密码'
          rules={[
            {
              required: true,
              message: '请输入密码！'
            }
          ]}
        />
      </LoginForm>
    </ConfigProvider>
  )
}

export default Register
