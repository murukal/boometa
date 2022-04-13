import { ActionType } from '../reducer'
import type { Action } from './action'
import getInitialState from './store'

const reducer = (state = getInitialState(), action: Action) => {
  switch (action.type) {
    case ActionType.SetRsaPublicKey:
      action.data && state.setPublicKey(action.data)
  }

  return state
}

export default reducer
