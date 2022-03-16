export type ActionType = 'SET_RSA_PUBLIC_KEY'

export interface Action {
  type: ActionType
  data: string | null
}

export const setRsaPublicKey = (rsaPublicKey: string | null): Action => {
  return {
    type: 'SET_RSA_PUBLIC_KEY',
    data: rsaPublicKey
  }
}
