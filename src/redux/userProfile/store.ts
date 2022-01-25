import type { User } from '../../typings/user'

export interface UserProfile {
  isLogin: boolean
  user: User | null
  token: string
}

const getInitialState = (): UserProfile => ({
  isLogin: false,
  user: null,
  token: ''
})

export default getInitialState
