// router
import { Navigate, Outlet } from 'react-router-dom'
// redux
import { useSelector } from 'react-redux'
// antd
import { Image } from 'antd'
// project
import type { State } from '~/redux'
import styles from './Account.module.css'

const Account = () => {
  const isLoggedIn = useSelector<State, boolean>((state) => state.userProfile.isLoggedIn)

  // 登陆后回调到主页面
  if (isLoggedIn) {
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
