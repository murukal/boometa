// router
import { Navigate, Outlet } from 'react-router-dom'
// redux
import { useSelector } from 'react-redux'
// antd
import { Image } from 'antd'
// project
import type { State } from '~/store2'
import styles from './Account.module.css'

const Account = () => {
  const isLogin = useSelector<State, boolean>((state) => false)

  // 登陆后回调到主页面
  if (isLogin) {
    return <Navigate to='/' replace />
  }

  // 未登陆
  return (
    <div className='flex h-full'>
      <div className='flex-1 flex items-center justify-center'>
        <Outlet />
      </div>
      <div className='flex-1 flex items-center justify-center'>
        <Image className={styles.float} preview={false} src='/assets/account.png' />
      </div>
    </div>
  )
}

export default Account
