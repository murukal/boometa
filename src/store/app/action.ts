import { ActionType } from '../reducer'

export interface Action {
  type: ActionType
}

export const initialized = (): Action => {
  return {
    type: ActionType.Initialized
  }
}
