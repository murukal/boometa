import Axios, { AxiosResponse } from 'axios'
import { AxiosRequestConfig } from 'axios'
import { ApiResponse } from '../typings/api'

// 生成一个axios实例
const axios = Axios.create()

/**
 * 请求拦截器
 */
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  // 从localStorage中获取token信息
  const token = localStorage.getItem('BOOM_AUTH_TOKEN') || sessionStorage.getItem('BOOM_AUTH_TOKEN')

  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

/**
 * 结果拦截器
 */
axios.interceptors.response.use(
  // http res拦截器
  (res) => res,

  // http异常拦截器
  (error): AxiosResponse => {
    return {
      status: error.response?.status,
      statusText: error.response?.statusText,
      headers: error.response?.headers,
      config: error.response?.config,
      data: {
        code: error.response?.data?.code || 999,
        message: error.response?.data?.message || '纳尼，后端居然连消息都不给！',
        data: error.response?.data?.data || null
      }
    }
  }
)

/**
 * request
 * @param requestConfig
 * @returns
 */
const request = async <T = any, D = any>(requestConfig: AxiosRequestConfig<D>): Promise<ApiResponse<T>> => {
  const res = await axios.request(requestConfig)
  return res.data
}

export default axios
export { request }
