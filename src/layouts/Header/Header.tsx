// redux
import { useSelector } from 'react-redux'
// antd
import { Avatar, Button, Dropdown, Menu, Typography } from 'antd'
import { Header as Wrapper } from 'antd/lib/layout/layout'
import { EditOutlined, ApiOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
// project
import { signOut } from '~/utils/app'
import type { Props } from '.'
import type { State } from '~/store2'
import type { User } from '~/typings/auth'

const { Title } = Typography

const Header = (props: Props) => {
  const user = useSelector<State, User | undefined | null>((state) => undefined)

  const getMenu = () => {
    return (
      <Menu>
        <Menu.Item className='text-center' key='1' icon={<EditOutlined />}>
          完善用户信息
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className='text-center' key='2' icon={<ApiOutlined />} onClick={signOut}>
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
    <Wrapper
      className='flex items-center z-10'
      style={{
        paddingLeft: 0
      }}
    >
      {/* menu icon */}
      <Button
        size='large'
        style={{
          color: 'white'
        }}
        icon={
          props.isFolded ? <MenuUnfoldOutlined className='text-white' /> : <MenuFoldOutlined className='text-white' />
        }
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
            color: 'white',
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
