// antd
import type { UploadFile as OriginUploadFile } from 'antd/lib/upload/interface'
import { ApiResponse } from '../../typings/api'

export const getInitialModel = (): Model => ({
  title: '',
  content: '',
  fileList: [],
  tags: []
})

export type UploadFile = OriginUploadFile<ApiResponse<string>>

export interface Model {
  title: string
  content: string
  fileList: UploadFile[]
  tags: string[]
}
