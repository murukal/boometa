// react
import { Suspense, lazy } from 'react'

const Loadable = (path: string) => {
  const Component = lazy(() => import(`../../${path}`))

  return (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  )
}

export default Loadable
