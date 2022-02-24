// project
import arq from '.'

interface UploadParams {
  url: string
  headers?: Record<string, string>
  file: string | Blob | File
}

export const upload = (params: UploadParams) => {
  const formData = new FormData()
  formData.append('file', params.file)

  return arq.post<string>(params.url, formData, {
    headers: {
      ...params.headers,
      'Content-Type': 'multipart/form-data'
    }
  })
}
