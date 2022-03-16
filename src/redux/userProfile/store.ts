import { TOKEN } from '../../assets'
import type { User } from '../../typings/user'

export interface UserProfile {
  isLogin: boolean
  user?: User | null
  token: string | null
}

const getInitialState = (): UserProfile => ({
  isLogin: false,
  user: null,
  token: localStorage.getItem(TOKEN) || sessionStorage.getItem(TOKEN)
})

export default getInitialState
