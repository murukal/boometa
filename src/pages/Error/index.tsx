// router
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const Error = () => {
  const isLogin = useSelector((state) => state.userProfile.isLogin)

  return <>{isLogin ? <Outlet /> : <Navigate replace to='/account/login' />}</>
}

export default Error
