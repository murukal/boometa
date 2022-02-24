// react
import { useState } from 'react'
// redux
import { useDispatch, useSelector } from 'react-redux'
// router
import { Link } from 'react-router-dom'
// antd
import { LockOutlined, UserOutlined, EyeTwoTone, EyeInvisibleOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, Typography } from 'antd'
// project
import { register } from '../../../apis/account'
import { easyNotification, responseNotification } from '../../../utils/notification'
import { authenticate, passToken } from '../../../redux/userProfile/actions'
import { setToken } from '../../../utils/app'
import { toggleStyle } from '../assets'

const { Item } = Form
const { Title, Text } = Typography
const { Password } = Input

const Register = () => {
  const [model, setModel] = useState({
    username: '',
    email: '',
    password: ''
  })

  const dispatch = useDispatch()
  const tenant = useSelector((state) => state.tenant)

  // 用户注册
  const onRegister = async () => {
    // 利用公钥加密密码
    const encryptedPassword = tenant.encryptor.encrypt(model.password)

    if (!encryptedPassword) {
      easyNotification('密码加密失败', 'error')
      return
    }

    const res = await register({
      ...model,
      password: encryptedPassword,
      tenantCode: tenant.code
    })

    if (res.data) {
      setToken(res.data, false)
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
      <Title level={2}>Sign up</Title>

      <Form
        style={{
          marginTop: 12
        }}
        onFinish={onRegister}
        onValuesChange={onFormChange}
      >
        <Item name='username'>
          <Input style={toggleStyle} size='large' prefix={<UserOutlined />} placeholder='用户名' />
        </Item>

        <Item name='email'>
          <Input style={toggleStyle} size='large' prefix={<MailOutlined />} placeholder='邮箱' />
        </Item>

        <Item name='password'>
          <Password
            style={toggleStyle}
            size='large'
            placeholder='密码'
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
