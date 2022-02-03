import { UploadChangeParam } from 'antd/lib/upload'

export interface FileProfile {
  url?: string
  name: string
  id: string
}

/** 利用参数生成默认的文件列表 */
export const getUploadParam = (fileProfile: FileProfile): UploadChangeParam | undefined => {
  if (!fileProfile.url) return

  const file = {
    uid: fileProfile.id,
    name: fileProfile.name,
    thumbUrl: fileProfile.url
  }

  return {
    file,
    fileList: [file]
  }
}

/** 上传组件参数解析 */
export const getValueFromEvent = (e: UploadChangeParam) => {
  return e.fileList
}
