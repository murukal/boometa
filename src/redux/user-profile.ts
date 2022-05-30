import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { whoAmI } from '~/apis/boomemory/auth'
import { TOKEN } from '~/assets'

import { User } from '~/typings/boomemory/auth'

export class UserProfile {
  isLogin = false
  user?: User = undefined
  token: string | null = null
}

export const authenticate = createAsyncThunk('authenticate', async () => (await whoAmI()).data?.whoAmI)

const slice = createSlice({
  name: 'user-profile',
  initialState: { ...new UserProfile() },
  reducers: {
    logout: (state) => {
      state.isLogin = false
      state.user = undefined
      state.token = ''
    },

    setToken: (state) => {
      state.token = localStorage.getItem(TOKEN) || sessionStorage.getItem(TOKEN)
    }
  },
  extraReducers: (builder) =>
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.isLogin = !!action.payload
      state.user = action.payload
    })
})

export const { logout, setToken } = slice.actions

export default slice.reducer
