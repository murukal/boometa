// router
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
// project
import type { State } from '~/redux'

const Error = () => {
  const isLogin = useSelector<State>((state) => true)

  return <>{isLogin ? <Outlet /> : <Navigate replace to='/account/login' />}</>
}

export default Error
