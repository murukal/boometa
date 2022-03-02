// router
import { Navigate, Outlet } from 'react-router-dom'
// redux
import { useSelector } from 'react-redux'
// antd
import { Layout as Wrapper, Typography, Image } from 'antd'
// project
import SiderMenu from '../SiderMenu'
import Header from '../Header'
import { useState } from 'react'

const { Content, Sider } = Wrapper
const { Title } = Typography

const Layout = () => {
  const [isFolded, setIsFolded] = useState(false)

  const isLogin = useSelector((state) => state.userProfile.isLogin)

  /** 折叠功能 */
  const onFold = () => setIsFolded((isFolded) => !isFolded)

  return isLogin ? (
    <Wrapper className='h-full'>
      {/* 侧边导航栏 */}
      <Sider collapsed={isFolded}>
        {/* logo */}
        {/* 站名 */}
        <div className='h-16 flex items-center justify-around'>
          <Image
            src='/boomart.ico'
            style={{
              height: 32
            }}
            preview={false}
          />

          {!isFolded && (
            <Title
              level={5}
              style={{
                color: 'white',
                marginBottom: 0
              }}
            >
              fantufantu
            </Title>
          )}
        </div>

        {/* menu */}
        <SiderMenu />
      </Sider>

      <Wrapper>
        {/* 顶部导航栏 */}
        <Header isFolded={isFolded} onFold={onFold} />

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
