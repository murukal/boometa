// redux
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// project
import { whoAmI } from '~/apis/boomemory/user'
import { TOKEN } from '~/assets'
import type { User } from '~/typings/boomemory/user'

export class UserProfile {
  isLoggedIn = false
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
    },

    verified: (state) => {
      if (state.user) {
        state.user.isVerified = true
      }
      state.isLoggedIn = !!state.user?.isVerified
    }
  },
  extraReducers: (builder) =>
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.user = action.payload
      state.isLoggedIn = !!state.user?.isVerified
    })
})

export const { setToken, verified } = slice.actions

export default slice.reducer
