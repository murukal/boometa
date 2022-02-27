// react
import { useEffect } from 'react'
// router
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom'
// redux
import { useSelector } from 'react-redux'
// antd
import { Image } from 'antd'
// third
import { stringify } from 'qs'
// project
import Footer from '../../layouts/Footer'
import { TOKEN } from '../../assets'
import './style.css'

const Account = () => {
  const navigate = useNavigate()
  const isLogin = useSelector((state) => state.userProfile.isLogin)

  // 获取重定向的url
  const redirect = useSearchParams()[0].get('redirect') || ''

  useEffect(() => {
    if (!isLogin) return

    // 非重定向页面，直接内部跳转
    if (!redirect) {
      // 跳转路由
      navigate('/', { replace: true })
      return
    }

    // 重定向页面
    // 传递auth信息
    const localToken = localStorage.getItem(TOKEN)
    const sessionToken = sessionStorage.getItem(TOKEN)

    const params = {
      authentication: JSON.stringify({
        token: localToken || sessionToken,
        is_once: !localToken
      })
    }

    window.location.replace(`${redirect}?${stringify(params)}`)
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
