// antd
import type { UploadFile } from 'antd/lib/upload/interface'

export { default } from './Essay'

export interface FormValues {
  fileList?: UploadFile[]
  tagIds: number[]
}
