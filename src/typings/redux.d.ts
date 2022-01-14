// redux
import { Store, Action, AnyAction } from 'redux'
// project
import { State } from '../redux/index'

declare module 'react-redux' {
  // 重写useStore
  function useStore<A extends Action = AnyAction>(): Store<State, A>
  // 重写useSelector
  function useSelector<TState = State, TSelected = unknown>(selector: (state: TState) => TSelected, equalityFn?: (left: TSelected, right: TSelected) => boolean): TSelected
}
