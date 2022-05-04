import JSEncrypt from 'jsencrypt'
import { getRsaPublicKey } from '~/apis'
import { Module } from '~/relax'

@Module()
export class Encryptor extends JSEncrypt {
  async initialize() {
    const rsaPublicKey = (await getRsaPublicKey()).data?.rsaPublicKey
    if (rsaPublicKey) {
      this.setPublicKey(rsaPublicKey)
    }
  }
}
