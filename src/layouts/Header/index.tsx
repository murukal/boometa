// redux
import { useDispatch, useSelector } from 'react-redux'
// antd
import { Avatar, Button, Dropdown, Menu, Typography } from 'antd'
import { Header as Wrapper } from 'antd/lib/layout/layout'
import { EditOutlined, ApiOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
// project
import { logout } from '../../redux/userProfile/action'
import { foldStyle } from './assets'
import { TOKEN } from '../../assets'
import type { Props } from './assets'
import type { State } from '../../redux'
import type { User } from '../../typings/auth'

const { Title } = Typography

const Header = (props: Props) => {
  const dispatch = useDispatch()
  const user = useSelector<State, User | undefined | null>((state) => state.userProfile.user)

  const onLogout = () => {
    // 清楚浏览器的缓存
    localStorage.removeItem(TOKEN)
    sessionStorage.removeItem(TOKEN)

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
  const onToggle = () => {
    props.onToggle()
  }

  return (
    <Wrapper className='flex items-center'>
      {/* menu icon */}
      <Button
        size='large'
        icon={props.isFolded ? <MenuUnfoldOutlined style={foldStyle} /> : <MenuFoldOutlined style={foldStyle} />}
        type='link'
        onClick={onToggle}
      />

      {/* avatar */}
      <div className='ml-auto flex items-center'>
        <Dropdown overlay={getMenu} trigger={['click']} placement='bottom' arrow>
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
