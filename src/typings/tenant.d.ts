export type TenantCode = string

export interface CreateTenant {
  code: TenantCode
  description: string
}

export interface Tenant extends CreateTenant {
  _id: string
  publicKey: string
  privateKey?: string
  createdAt: string
  updatedAt: string
}

export type Tenants = Tenant[]

export interface UpdateTenant extends Omit<CreateTenant, 'code'> {}
