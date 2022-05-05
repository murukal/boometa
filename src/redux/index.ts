import { configureStore } from '@reduxjs/toolkit'
import app, { App } from './app'
import menu, { Menu } from './menu'
import userProfile, { UserProfile } from './user-profile'

export interface State {
  app: App
  userProfile: UserProfile
  menu: Menu
}

export const store = configureStore({
  reducer: {
    app,
    userProfile,
    menu
  }
})
