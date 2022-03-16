export type ActionType = 'SET_RSA_PUBLIC_KEY'

export interface Action {
  type: ActionType
  data: string
}

export const setRsaPublicKey = (rsaPublicKey: string): Action => {
  return {
    type: 'SET_RSA_PUBLIC_KEY',
    data: rsaPublicKey
  }
}
