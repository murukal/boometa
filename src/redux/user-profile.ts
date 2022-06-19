// redux
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
// project
import { whoAmI } from '~/apis/schemas/boomemory/user'
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
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload
    }
  },
  extraReducers: (builder) =>
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.user = action.payload
      state.isLoggedIn = !!state.user
    })
})

export const { setToken } = slice.actions

export default slice.reducer
