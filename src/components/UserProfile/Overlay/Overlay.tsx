import { PoweroffOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { Props } from '.'

const Overlay = (props: Props) => {
  return (
    <Menu
      style={{
        paddingTop: 32,
        width: 240
      }}
      items={[
        {
          key: 'profile',
          label: '个人中心',
          icon: <UserOutlined />
        },
        {
          key: 'setting',
          label: '设置',
          icon: <SettingOutlined />
        },
        {
          type: 'divider'
        },
        {
          key: 'logout',
          label: '退出',
          icon: <PoweroffOutlined />
        }
      ]}
      onClick={props.onMenuItemClick}
    />
  )
}

export default Overlay
