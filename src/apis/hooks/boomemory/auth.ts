import { useMutation } from '@apollo/client'
import { SEND_CAPTCHA } from '~/apis/schemas/boomemory/auth'

/**
 * 发送验证码
 */
export const useSendCaptcha = () => useMutation(SEND_CAPTCHA)
