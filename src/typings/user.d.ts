export interface User {
  id: number
  username: string
  email: string
  avatar: string
}

export interface LoginInput {
  keyword: string
  password: string
}

export interface RegisterInput {
  username: string
  email: string
  password: string
  avatar?: string
}
