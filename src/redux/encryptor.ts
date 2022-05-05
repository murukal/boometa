import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import JSEncrypt from 'jsencrypt'
import { getRsaPublicKey } from '~/apis'

export class Encryptor {
  encryptor = new JSEncrypt()
}

export const setRsaPublicKey = createAsyncThunk('setRsaPublicKey', async () => {
  return (await getRsaPublicKey()).data?.rsaPublicKey
})

const slice = createSlice({
  name: 'encryptor',
  initialState: { ...new Encryptor() },
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(setRsaPublicKey.fulfilled, (state, action) => {
      // action.payload && state.encryptor.setPublicKey(action.payload)
    })
})

export default slice.reducer
