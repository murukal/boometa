import { createSlice } from '@reduxjs/toolkit'

export class App {
  isInitialized = false
}

const slice = createSlice({
  name: 'App',
  initialState: { ...new App() },
  reducers: {
    initialized: (state) => {
      state.isInitialized = true
    }
  }
})

export const { initialized } = slice.actions

export default slice.reducer
