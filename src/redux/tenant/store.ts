// npm
import JSEncrypt from 'jsencrypt'
// project
import { Tenant } from '../../typings/tenant'

// store 在原先的数据结构基础上 补充
export interface TenantState extends Tenant {
  encryptor: JSEncrypt
}

const getInitialState = (): TenantState => ({
  // 租户信息
  _id: '',
  code: 'BOOMETA',
  description: '',
  publicKey: '',
  privateKey: '',
  createdAt: '',
  updatedAt: '',

  // 加密器
  encryptor: new JSEncrypt()
})

export default getInitialState
