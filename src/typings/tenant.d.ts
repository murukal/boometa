export type TenantCode = string

export interface Tenant {
  _id: string
  code: TenantCode
  description: string
  publicKey: string
  privateKey?: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateTenant extends Omit<Tenant, '_id' | 'publicKey' | 'privateKey' | 'createdAt' | 'updatedAt'> {}

export interface UpdateTenant extends Omit<CreateTenant, 'code'> {}
