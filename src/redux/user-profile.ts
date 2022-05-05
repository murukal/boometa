import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { whoAmI } from '~/apis/auth'
import { TOKEN } from '~/assets'

import { User } from '~/typings/auth'

export class UserProfile {
  isLogin = false
  user?: User = undefined
  token = localStorage.getItem(TOKEN) || sessionStorage.getItem(TOKEN)
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
      console.log('action===', action)

      state.isLogin = !!action.payload
      state.user = action.payload
    })
})

export const { logout, setToken } = slice.actions

export default slice.reducer
