// project
import { getRsaPublicKey } from '~/apis'

export type ActionType = 'SET_RSA_PUBLIC_KEY'

export interface Action {
  type: ActionType
  data?: string | null
}

export const setRsaPublicKey = async (rsaPublicKey?: string | null): Promise<Action> => {
  const result = await getRsaPublicKey()

  return {
    type: 'SET_RSA_PUBLIC_KEY',
    data: result.data?.rsaPublicKey
  }
}
