// axios
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import Axios from 'axios'
import { stringify } from 'qs'
// project
import type { ApiResponse } from '../typings/api'
import { TOKEN } from '../assets'

// 生成一个axios实例
const axios = Axios.create()

/**
 * 请求拦截器
 */
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  // 从localStorage中获取token信息
  const token = localStorage.getItem(TOKEN) || sessionStorage.getItem(TOKEN)

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
 * get
 * @param url
 * @param config
 * @returns
 */
export const get = async <T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<ApiResponse<T>> => {
  const res = await axios.get(url, {
    ...config,
    paramsSerializer: stringify
  })
  return res.data
}

/**
 * post
 * @param url
 * @param data
 * @param config
 * @returns
 */
export const post = async <T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<ApiResponse<T>> => {
  const res = await axios.post(url, data, config)
  return res.data
}

/**
 * patch
 * @param url
 * @param data
 * @param config
 * @returns
 */
export const patch = async <T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<ApiResponse<T>> => {
  const res = await axios.patch(url, data, config)
  return res.data
}

/**
 * remove
 * @param url
 * @param config
 * @returns
 */
export const shift = async <T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<ApiResponse<T>> => {
  const res = await axios.delete(url, config)
  return res.data
}
