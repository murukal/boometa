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
import type { State } from '../../redux'

const { Content, Sider } = Wrapper

const Layout = () => {
  const [isFolded, setIsFolded] = useState(false)

  const isLogin = useSelector<State>((state) => state.userProfile.isLogin)

  /** 折叠功能 */
  const onToggle = () => setIsFolded((isFolded) => !isFolded)

  return isLogin ? (
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

      <Wrapper>
        {/* 顶部导航栏 */}
        <Header isFolded={isFolded} onToggle={onToggle} />

        {/* 页面正文 */}
        <Content className='p-3 overflow-auto'>
          <Outlet />
        </Content>
      </Wrapper>
    </Wrapper>
  ) : (
    <Navigate to='/account/login' replace={true} />
  )
}

export default Layout
