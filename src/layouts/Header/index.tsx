// redux
import { useDispatch, useSelector } from 'react-redux'
// antd
import { Avatar, Dropdown, Menu } from 'antd'
import { Header as Wrapper } from 'antd/lib/layout/layout'
import { EditOutlined, ApiOutlined } from '@ant-design/icons'
// project
import { logout } from '../../redux/userProfile/actions'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userProfile.user)

  const onLogout = () => {
    dispatch(logout())
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
    <Wrapper className='flex items-center'>
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
    </Wrapper>
  )
}

export default Header
