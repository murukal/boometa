// react
import { useEffect } from 'react'
// router
import { Outlet, useNavigate } from 'react-router-dom'
// redux
import { useSelector } from 'react-redux'
// antd
import { Image } from 'antd'
// project
import Footer from '../../layouts/Footer'
import type { State } from '../../redux'
// css
import './index.css'

const Account = () => {
  const navigate = useNavigate()
  const isLogin = useSelector<State, boolean>((state) => state.userProfile.isLogin)

  useEffect(() => {
    if (!isLogin) return
    // 跳转路由
    navigate('/', { replace: true })
  }, [isLogin])

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1 flex'>
        <div className='flex-1 flex items-center justify-center'>
          <Outlet />
        </div>
        <div className='flex-1 flex items-center justify-center'>
          <Image
            style={{
              animation: 'up-down 2s ease-in-out infinite alternate-reverse both'
            }}
            preview={false}
            src='/assets/account.png'
          />
        </div>
      </div>

      <Footer className='flex justify-between' />
    </div>
  )
}

export default Account
