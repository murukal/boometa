// project
import { getRsaPublicKey } from '~/apis'
import { ActionType } from '../reducer'

export interface Action {
  type: ActionType
  data?: string | null
}

export const setRsaPublicKey = async (rsaPublicKey?: string | null): Promise<Action> => {
  const result = await getRsaPublicKey()

  return {
    type: ActionType.SetRsaPublicKey,
    data: result.data?.rsaPublicKey
  }
}
