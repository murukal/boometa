// react
import { useState } from 'react'
// router
import { Navigate, Outlet } from 'react-router-dom'
// redux
import { useSelector } from 'react-redux'
// antd
import { Layout as Wrapper, Image } from 'antd'
// project
import SiderMenu from '../SiderMenu'
import Header from '../Header'
import type { State } from '~/store'

const { Content, Sider } = Wrapper

const Layout = () => {
  const [isFolded, setIsFolded] = useState(false)
  const isLogin = useSelector<State>((state) => state.userProfile.isLogin)

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
        {/* logo */}
        <div className='m-4'>
          <Image src='/boomart.ico' preview={false} height={32} />
        </div>

        {/* menu */}
        <SiderMenu />
      </Sider>

      <Wrapper className='overflow-hidden'>
        {/* 顶部导航栏 */}
        <Header isFolded={isFolded} onToggle={onToggle} />

        {/* 页面正文 */}
        <Content className='overflow-y-scroll'>
          <div className='p-3 h-full'>
            <Outlet />
          </div>
        </Content>
      </Wrapper>
    </Wrapper>
  )
}

export default Layout
