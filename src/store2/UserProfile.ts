import { whoAmI } from '~/apis/auth'
import { TOKEN } from '~/assets'
import { Module } from '~/relax'
import { User } from '~/typings/auth'

@Module()
export class UserProfile {
  isLogin = false
  user?: User = undefined
  token = localStorage.getItem(TOKEN) || sessionStorage.getItem(TOKEN)

  async authenticate() {
    // 查询用户信息
    const user = (await whoAmI()).data?.whoAmI

    this.isLogin = !!user
    this.user = user
  }

  logout() {
    this.isLogin = false
    this.user = undefined
    this.token = ''
  }
}
