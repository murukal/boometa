// antd
import type { UploadFile as OriginUploadFile } from 'antd/lib/upload/interface'
import { ApiResponse } from '../../typings/api'

export type UploadFile = OriginUploadFile<ApiResponse<string>>

export interface FormValues {
  title: string
  content: string
  fileList: UploadFile[]
  tags: string[]
}
