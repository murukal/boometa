// npm
import path from 'path-browserify'
import { stringify } from 'qs'
// react
import { useEffect, useMemo, useState } from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
// router
import { Outlet, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
// redux
import { useSelector } from 'react-redux'
// antd
import { Button } from 'antd'
// project
import './style.css'
import { TOKEN } from '../../assets'

enum Handle {
  'login' = 'login',
  'register' = 'register'
}

const Account = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isLogin = useSelector((state) => state.userProfile.isLogin)

  const [handle, setHandle] = useState<Handle>(Handle[path.basename(location.pathname) as Handle])

  const isLoginHandle = useMemo(() => handle === Handle.login, [handle])
  const to = useMemo(() => (isLoginHandle ? Handle.register : Handle.login), [isLoginHandle])

  const onSwitch = () => {
    // 设置state
    setHandle(to)
  }

  // 获取重定向的url
  const redirect = useSearchParams()[0].get('redirect') || ''

  // 动画结束，跳转路由
  const onExited = () => {
    navigate(`/account/${to}${location.search}`)
  }

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
    <>
      <div
        className='w-full h-full bg-cover bg-no-repeat'
        style={{
          backgroundImage: `url('/assets/account/background.jpg')`
        }}
      >
        <div
          className='bg-white flex flex-col items-center'
          style={{
            width: 500,
            height: 500,
            transition: 'left 0.6s',
            position: 'absolute',
            top: '25%',
            left: `calc((100% - 1000px) / 2 + ${isLoginHandle ? '0px' : '500px'})`,
            zIndex: '1000'
          }}
        >
          Halo，来自网线另外一端的朋友！
          <h1>Halo，来自网线另外一端的朋友！</h1>
          <Button type='link' onClick={onSwitch}>
            {isLoginHandle ? '前往注册' : '前往登陆'}
          </Button>
          <a className='text-center mt-auto mb-1' href='http://ythzxfw.miit.gov.cn/index'>
            浙ICP备2021003835号
          </a>
        </div>

        <SwitchTransition>
          <CSSTransition
            key={handle}
            appear={true}
            addEndListener={(node, done) => {
              node.addEventListener('transitionend', done, false)
            }}
            classNames={`fade-${handle}`}
            onExited={onExited}
          >
            <div className='wrapper bg-white'>
              <Outlet />
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  )
}

export default Account
