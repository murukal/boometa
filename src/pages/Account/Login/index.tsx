// react
import { useState } from 'react'
// redux
import { useDispatch, useSelector } from 'react-redux'
// router
import { Link } from 'react-router-dom'
// antd
import { Button, Divider, Form, Input, Typography } from 'antd'
import { EyeTwoTone, EyeInvisibleOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'
// project
import { login } from '../../../apis/account'
import { easyNotification, responseNotification } from '../../../utils/notification'
import { authenticate, passToken } from '../../../redux/userProfile/actions'
import { setToken } from '../../../utils/app'
import { toggleStyle } from '../assets'

const { Title, Text } = Typography
const { Item } = Form
const { Password } = Input

const Login = () => {
  // const [isAutoLogin, setIsAutoLogin] = useState(true)

  const [model, setModel] = useState({
    keyword: '',
    password: ''
  })

  const dispatch = useDispatch()
  const tenant = useSelector((state) => state.tenant)

  // 执行登录
  const onLogin = async () => {
    // 利用公钥对密码进行加密
    const encryptedPassword = tenant.encryptor.encrypt(model.password)

    if (!encryptedPassword) {
      easyNotification('密码加密失败', 'error')
      return
    }

    const res = await login({
      ...model,
      tenantCode: tenant.code,
      password: encryptedPassword
    })

    // 加密失败
    if (!res) return

    if (res.data) {
      setToken(res.data, true)
      dispatch(passToken())
      dispatch(await authenticate())
    }

    responseNotification(res)
  }

  /** 表单数据变更 */
  const onFormChange = (changedValues: any, values: any) => {
    setModel(values)
  }

  return (
    <div className='flex flex-col items-center'>
      <Title level={2}>Sign in</Title>

      <Form
        style={{
          marginTop: 12
        }}
        onFinish={onLogin}
        onValuesChange={onFormChange}
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
