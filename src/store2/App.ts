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
  initialized() {
    this.isInitialized = true
  }
}
