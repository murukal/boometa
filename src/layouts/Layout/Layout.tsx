// react
import { useState } from 'react'
// router
import { Navigate, Outlet } from 'react-router-dom'
// redux
import { useSelector } from 'react-redux'
// antd
import { Layout as Wrapper, Image, Typography } from 'antd'
// project
import SiderMenu from '../SiderMenu'
import Header from '../Header'
import type { State } from '~/redux'

const { Content, Sider } = Wrapper
const { Title } = Typography

const Layout = () => {
  const [isFolded, setIsFolded] = useState(false)
  const isLogin = useSelector<State>((state) => false)

  /**
   * 侧边导航栏折叠功能
   */
  const onToggle = () => setIsFolded((isFolded) => !isFolded)

  /**
   * 未登录
   */
  if (!isLogin) return <Navigate to='/account/login' replace={true} />

  return (
    <Wrapper className='h-full'>
      {/* 侧边导航栏 */}
      <Sider collapsed={isFolded}>
        {/* logo & title */}
        <div className='flex h-16 items-center'>
          <div className='w-20 flex-shrink-0 flex justify-center items-center'>
            <Image src='/fantufantu.png' preview={false} height={32} />
          </div>

          <Title
            level={3}
            style={{
              color: 'white',
              margin: 0,
              flexShrink: 0
            }}
          >
            番土番土
          </Title>
        </div>

        {/* menu */}
        <SiderMenu />
      </Sider>

      <Wrapper className='overflow-hidden'>
        {/* 顶部导航栏 */}
        <Header isFolded={isFolded} onToggle={onToggle} />

        {/* 页面正文 */}
        <Content className='p-3 overflow-y-scroll'>
          <Outlet />
        </Content>
      </Wrapper>
    </Wrapper>
  )
}

export default Layout
