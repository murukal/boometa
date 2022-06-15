// redux
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// project
import { whoAmI } from '~/apis/boomemory/user'
import { TOKEN } from '~/assets'
import type { User } from '~/typings/boomemory/user'

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

export const { setToken } = slice.actions

export default slice.reducer
