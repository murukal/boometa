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

    const localToken = localStorage.getItem(TOKEN)
    const sessionToken = sessionStorage.getItem(TOKEN)

    const params = {
      authentication: JSON.stringify({
        token: localToken || sessionToken,
        is_once: !localToken
      })
    }

    if (redirect) {
      window.location.replace(`${redirect}?${stringify(params)}`)
    } else {
      navigate('/', { replace: true })
    }
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

      <Footer className='flex justify-between px-6 pb-6' />
    </div>
  )
}

export default Account
