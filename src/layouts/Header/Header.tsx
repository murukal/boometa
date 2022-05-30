// antd
import { Button } from 'antd'
import { Header as Wrapper } from 'antd/lib/layout/layout'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
// project
import type { Props } from '.'
import UserProfile from '~/components/UserProfile'

const Header = (props: Props) => {
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

      <UserProfile className='ml-auto' />
    </Wrapper>
  )
}

export default Header
