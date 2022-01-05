// redux
import { Store, Action, AnyAction } from 'redux'
// project
import { State } from '../redux/index'

declare module 'react-redux' {
  function useStore<A extends Action = AnyAction>(): Store<State, A>
}
