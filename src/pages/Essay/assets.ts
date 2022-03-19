// antd
import type { UploadFile as OriginUploadFile } from 'antd/lib/upload/interface'

export type UploadFile = OriginUploadFile

export interface FormValues {
  title: string
  content: string
  fileList?: UploadFile[]
  tagIds: number[]
}
