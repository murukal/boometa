// third
import { useMutation } from '@apollo/client'
// project
import { LOGIN, REGISTER, SEND_CAPTCHA } from '~/apis/schemas/boomemory/auth'

/**
 * 发送验证码
 */
export const useSendCaptcha = () => useMutation(SEND_CAPTCHA)

/**
 * 注册
 */
export const useRegister = () => useMutation(REGISTER)

/**
 * 登陆
 */
export const useLogin = () => useMutation(LOGIN)
