// react
import { ChangeEvent, CSSProperties, useState } from 'react'
// redux
import { useDispatch, useSelector } from 'react-redux'
// antd
import { Button, Space, Tabs } from 'antd'
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-form'
import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'
// project
import PhoneFormItem from '../../../components/Form/PhoneFormItem'
import CaptchaFormItem from '../../../components/Form/CaptchaFormItem'
import { LoginType } from '../../../typings/user'
import { login, loginByPhone } from '../../../apis/account'
import { responseNotification } from '../../../utils/notification'
import { authenticate } from '../../../redux/userProfile/actions'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

const IconStyle: CSSProperties = {
  marginLeft: 16,
  fontSize: 24,
  verticalAlign: 'middle'
}

const Login = () => {
  const [keyword, setKeyword] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [isAutoLogin, setIsAutoLogin] = useState(false)
  const [loginType, setLoginType] = useState<LoginType>('account')

  const dispatch = useDispatch()
  const tenant = useSelector((state) => state.tenant)

  const onLoginTypeChange = (activeKey: string) => {
    setLoginType(activeKey as LoginType)
  }
  const onKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const onIsAutoLoginChange = (e: CheckboxChangeEvent) => {
    setIsAutoLogin(e.target.checked)
  }

  // 执行登录
  const onLogin = async () => {
    // 执行登录
    // 登录方式不同，提交表单的格式也不同
    // 账户关键字 + 密码登录
    const handlerMap = {
      account: () => {
        // 利用公钥对密码进行加密
        const encryptedPassword = tenant.encrypter.encrypt(password)

        return login({
          tenantCode: tenant.code,
          keyword,
          password: encryptedPassword.toString()
        })
      },
      phone: () =>
        loginByPhone({
          phone,
          captcha
        })
    }

    const handler = handlerMap[loginType]
    const res = await handler()
    res.data && dispatch(await authenticate(res.data, isAutoLogin))
    responseNotification(res)
  }

  return (
    <LoginForm
      className='flex flex-col justify-center'
      title='BOOMETA'
      subTitle='这里可能有一些你感兴趣的'
      onFinish={onLogin}
      actions={
        <Space>
          <span>其他登录方式</span>
          <AlipayCircleOutlined style={IconStyle} />
          <TaobaoCircleOutlined style={IconStyle} />
          <WeiboCircleOutlined style={IconStyle} />
        </Space>
      }
    >
      <Tabs activeKey={loginType} onChange={onLoginTypeChange}>
        <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
        <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
      </Tabs>

      {loginType === 'account' && (
        <>
          <ProFormText
            name='username'
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />,
              value: keyword,
              onChange: onKeywordChange
            }}
            placeholder='用户名'
            rules={[
              {
                required: true,
                message: '请输入用户名!'
              }
            ]}
          />
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
        </>
      )}

      {loginType === 'phone' && (
        <>
          <PhoneFormItem value={phone} onChange={setPhone} />
          <CaptchaFormItem value={captcha} onChange={setCaptcha} />
        </>
      )}

      <div className='mb-5'>
        <ProFormCheckbox
          noStyle
          fieldProps={{
            checked: isAutoLogin,
            onChange: onIsAutoLoginChange
          }}
        >
          自动登录
        </ProFormCheckbox>

        <Button
          className='p-0'
          size='small'
          type='link'
          style={{
            float: 'right'
          }}
        >
          忘记密码
        </Button>
      </div>
    </LoginForm>
  )
}

export default Login
