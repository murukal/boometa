// project
import type { Core } from '..'

export interface User extends Core {
  username: string
  emailAddress: string
  avatar: string
}
