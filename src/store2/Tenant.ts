import { Module } from '../relax/Module'
import { Tenant as TenantType } from '~/typings/tenant'
import { getTenant } from '~/apis/tenant'

@Module()
export class Tenant implements TenantType {
  /**
   * property
   */
  code = 'BOOMETA'

  name = ''

  isAuthorizate = false

  /**
   * action
   */
  async initialize() {
    const tenant = (await getTenant(this.code)).data?.tenant

    if (tenant) {
      this.name = tenant.name
      this.isAuthorizate = tenant.isAuthorizate
    }
  }
}
