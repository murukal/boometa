// router
import { Navigate, Outlet } from 'react-router-dom'
// redux
import { useSelector } from 'react-redux'
// antd
import { Layout as Wrapper } from 'antd'
// project
import SiderMenu from '../SiderMenu'
import Header from '../Header'

const { Content, Sider } = Wrapper

const Layout = () => {
  const isLogin = useSelector((state) => state.userProfile.isLogin)

  return isLogin ? (
    <Wrapper className='h-full'>
      {/* 侧边导航栏 */}
      <Sider>
        <SiderMenu />
      </Sider>

      <Wrapper>
        {/* 顶部导航栏 */}
        <Header />

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
