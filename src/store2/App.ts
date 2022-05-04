import { Module } from '~/relax'

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
