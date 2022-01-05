// redux
import { useDispatch, useStore } from 'react-redux'
// router
import { useNavigate } from 'react-router-dom'
// antd
import { Avatar, Dropdown, Menu } from 'antd'
import { EditOutlined, ApiOutlined } from '@ant-design/icons'
// project
import { logout } from '../../redux/userProfile/actions'

const HeaderBar = () => {
  const navigate = useNavigate()
  const store = useStore()
  const dispatch = useDispatch()
  const state = store.getState()
  const user = state.userProfile.user

  const onLogout = () => {
    dispatch(logout())
    // 重定向至登录页面
    navigate('/account/login')
  }

  const getMenu = () => {
    return (
      <Menu>
        <Menu.Item className='text-center' key='1' icon={<EditOutlined />}>
          完善用户信息
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className='text-center' key='2' icon={<ApiOutlined />} onClick={onLogout}>
          注销
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <div className='h-full flex items-center'>
      {/* logo */}
      <div className='w-4/5'></div>

      {/* menu icon */}

      {/* space */}

      {/* avatar */}
      <div className=''>
        <Dropdown overlay={getMenu} trigger={['click']} placement='bottomCenter' arrow>
          <Avatar src={user?.avatar} />
        </Dropdown>
      </div>
    </div>
  )
}

export default HeaderBar
