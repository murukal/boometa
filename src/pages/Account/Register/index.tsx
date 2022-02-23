// react
import { ChangeEvent, useState } from 'react'
// redux
import { useDispatch, useSelector } from 'react-redux'
// antd
import { LoginForm, ProFormText } from '@ant-design/pro-form'
import { ConfigProvider, createIntl } from '@ant-design/pro-provider'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
// project
import PhoneFormItem from '../../../components/Form/PhoneFormItem'
import CaptchaFormItem from '../../../components/Form/CaptchaFormItem'
import { register } from '../../../apis/account'
import { easyNotification, responseNotification } from '../../../utils/notification'
import { authenticate, passToken } from '../../../redux/userProfile/actions'
import { setToken } from '../../../utils/app'

const Register = () => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const dispatch = useDispatch()
  const tenant = useSelector((state) => state.tenant)

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
    // 利用公钥加密密码
    const encryptedPassword = tenant.encryptor.encrypt(password)

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

    if (res.data) {
      setToken(res.data, false)
      dispatch(passToken())
      dispatch(await authenticate())
    }
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
