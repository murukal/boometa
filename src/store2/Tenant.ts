import { Module } from '../relax/Module'
import { Property } from '../relax/Property'
import { Tenant as TenantType } from '~/typings/tenant'
import { getTenant } from '~/apis/tenant'
import { Action } from '~/relax/Action'

@Module()
export class Tenant implements TenantType {
  /**
   * property
   */
  @Property()
  code = 'BOOMETA'

  @Property()
  name = ''

  @Property()
  isAuthorizate = false

  /**
   * action
   */
  @Action()
  async initialize() {
    const tenant = (await getTenant(this.code)).data?.tenant

    if (tenant) {
      this.name = tenant.name
      this.isAuthorizate = tenant.isAuthorizate
    }
  }
}
