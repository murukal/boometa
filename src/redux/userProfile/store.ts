import { User } from '../../typings/user'

export interface UserProfile {
  isLogin: boolean
  user: User | null
}

const getInitialState = (): UserProfile => ({
  isLogin: false,
  user: null
})

export default getInitialState
