// antd
import type { UploadFile } from 'antd/lib/upload/interface'

export interface FormValues {
  title: string
  content: string
  fileList?: UploadFile[]
  tagIds: number[]
}
