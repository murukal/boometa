import { Dictionary } from '../../../typings/dictionary'

export const getInitialSingleton = (): Dictionary => ({
  description: '',
  _id: '',
  sortBy: 0,
  code: ''
})

/** 字典code枚举，配置的时候请务必参考下当前文件 */
export const DICTIONARY_CODE_PERMISSION_KEY = 'PERMISSION_KEY'
