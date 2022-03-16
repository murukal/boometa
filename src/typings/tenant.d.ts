export interface Tenant {
  id: number
  code: string
  name: string
  isAuthorizate: boolean
  createdAt?: string
  updatedAt?: string
}

export interface CreateTenant extends Omit<Tenant, '_id' | 'publicKey' | 'privateKey' | 'createdAt' | 'updatedAt'> {}

export interface UpdateTenant extends CreateTenant {}
