// redux
import { useDispatch, useSelector } from 'react-redux'
// antd
import { Avatar, Button, Dropdown, Menu, Typography } from 'antd'
import { Header as Wrapper } from 'antd/lib/layout/layout'
import { EditOutlined, ApiOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
// project
import { logout } from '../../redux/userProfile/actions'
import { foldStyle } from './assets'
import type { Props } from './assets'

const { Title } = Typography

const Header = (props: Props) => {
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

  /** 折叠事件 */
  const onFold = () => {
    props.onFold()
  }

  return (
    <Wrapper
      className='flex items-center'
      style={{
        paddingLeft: 0
      }}
    >
      {/* menu icon */}
      <Button
        size='large'
        icon={props.isFolded ? <MenuUnfoldOutlined style={foldStyle} /> : <MenuFoldOutlined style={foldStyle} />}
        type='link'
        onClick={onFold}
      />

      {/* avatar */}
      <div className='ml-auto flex items-center'>
        <Dropdown overlay={getMenu} trigger={['click']} placement='bottomCenter' arrow>
          <Avatar src={user?.avatar} />
        </Dropdown>

        {/* 用户名称 */}
        <Title
          level={5}
          style={{
            ...foldStyle,
            marginBottom: 0,
            paddingLeft: 16
          }}
        >
          {user?.username}
        </Title>
      </div>
    </Wrapper>
  )
}

export default Header
