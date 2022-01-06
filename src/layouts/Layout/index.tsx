// router
import { Navigate, Outlet } from 'react-router-dom'
// redux
import { useStore } from 'react-redux'
// antd
import { Card, Layout as AntdLayout } from 'antd'
// project
import SiderMenu from '../SiderMenu'
import HeaderBar from '../HeaderBar'

const { Sider, Content, Header } = AntdLayout

const Layout = () => {
  const store = useStore()
  const isLogin = store.getState().userProfile.isLogin

  console.log('isLogin====', isLogin)

  return isLogin ? (
    <AntdLayout className='h-full w-full'>
      <Header>
        <HeaderBar />
      </Header>
      <AntdLayout>
        <Sider>
          <SiderMenu />
        </Sider>
        <Content className='p-3 overflow-auto'>
          <Card className='h-full w-full'>
            <Outlet />
          </Card>
        </Content>
      </AntdLayout>
    </AntdLayout>
  ) : (
    <Navigate to='/account/login' replace={true} />
  )
}

export default Layout
