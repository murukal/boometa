import { Module } from '../relax'
import { Tenant as TenantType } from '~/typings/tenant'
import { getTenant } from '~/apis/tenant'

@Module()
export class Tenant implements TenantType {
  code = 'BOOMETA'
  name = ''
  isAuthorizate = false

  async initialize() {
    const tenant = (await getTenant(this.code)).data?.tenant

    if (tenant) {
      this.name = tenant.name
      this.isAuthorizate = tenant.isAuthorizate
    }
  }
}
