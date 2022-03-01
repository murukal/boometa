// antd
import type { UploadFile } from 'antd/lib/upload/interface'
// project
import type { Tag } from '../../../typings/tag'

export const getInitialSingleton = (): Tag => ({
  _id: '',
  cover: '',
  name: ''
})

export interface FormValues {
  name: string
  fileList: UploadFile[]
}
