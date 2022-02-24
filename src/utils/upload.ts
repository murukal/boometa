// antd
import type { UploadChangeParam } from 'antd/lib/upload'
import type { UploadRequestOption } from 'rc-upload/lib/interface'
import { upload } from '../apis/base'

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

/** 自定义的上传事件 */
export const customRequest = async (options: UploadRequestOption) => {
  const res = await upload({
    url: '/api/upload',
    file: options.file,
    headers: options.headers
  })

  if (res.code) {
    options.onError && options.onError(new Error(res.message), res)
  } else {
    options.onSuccess && options.onSuccess(res)
  }
}
