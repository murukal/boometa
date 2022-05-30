import { Menu as MenuType } from '~/typings/boomemory/menu'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMenus } from '~/apis/boomemory/menu'
import { getMenuTreeFromMenus } from '~/utils/menu'

export class Menu {
  menus: MenuType[] = []
}

export const initialize = createAsyncThunk('getMenus', async (tenantCode: string) => {
  return (await getMenus(tenantCode)).data?.menus.items || []
})

const slice = createSlice({
  name: 'menu',
  initialState: { ...new Menu() },
  reducers: {
    clear(state) {
      state.menus = []
    }
  },
  extraReducers: (builder) =>
    builder.addCase(initialize.fulfilled, (state, action) => {
      state.menus = getMenuTreeFromMenus(action.payload)
    })
})

export const { clear } = slice.actions

export default slice.reducer
