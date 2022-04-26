import { Action } from '~/relax/Action'
import { Module } from '~/relax/Module'

@Module()
export class App {
  /**
   * property
   */
  isInitialized = false

  /**
   * method
   */
  @Action()
  initialized() {
    this.isInitialized = true
    return this
  }
}
