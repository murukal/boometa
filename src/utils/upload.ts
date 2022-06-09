// antd
import type { UploadChangeParam } from 'antd/lib/upload'
import type { UploadFile } from 'antd/lib/upload/interface'
import type { UploadRequestOption } from 'rc-upload/lib/interface'
// project
import { store } from '~/redux'

export interface FileProfile {
  url?: string
  name: string
  id: number
}

/** 利用参数生成默认的文件列表 */
export const getUploadParam = (fileProfile: FileProfile): UploadChangeParam | undefined => {
  if (!fileProfile.url) return

  const file: UploadFile = {
    uid: fileProfile.id.toString(),
    name: fileProfile.name,
    thumbUrl: fileProfile.url
  }

  return {
    file,
    fileList: [file]
  }
}

/**
 * 上传组件参数解析
 */
export const getValueFromEvent = (e: UploadChangeParam) => {
  return e.fileList
}

/**
 * 自定义的上传事件
 */
export const customRequest = async (options: UploadRequestOption) => {
  const token = store.getState().userProfile.token
  const form = new FormData()
  form.append('file', options.file)

  const res = await fetch(process.env.REACT_APP_BOOMEMORY_API_URL + '/upload', {
    method: 'post',
    body: form,
    headers: {
      ...(token && {
        Authorization: `Bearer ${token}`
      })
    }
  })

  options.onSuccess && options.onSuccess(await res.text())
}
