export interface FormValues {
  username: string
  email: string
  password: string
  repeatPassword: string
}

/**
 * 密码的正则表达式
 * 大写字母，小写字母，数组，特殊符号 其中三项
 */
export const passwordRegex =
  /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/
