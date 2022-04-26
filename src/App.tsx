// react
import { useEffect } from 'react'
// redux
import { useSelector } from 'react-redux'
// project
import Router from './routes/Router'
import { initialize } from './utils/app'
import type { State } from './store2'

const App = () => {
  const isInitialized = useSelector<State, boolean>((state) => state.App.isInitialized)

  /**
   * 初始化渲染
   */
  useEffect(() => {
    initialize()
  }, [])

  /**
   * 未渲染完成
   */
  if (!isInitialized) return null

  /**
   * 渲染完成
   */
  return <Router />
}

export default App
