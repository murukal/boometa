// project
import { gql } from '@apollo/client'
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

/** 初始化项目 */
export const INITIALIZE = gql`
  query Initialize($tenantCode: ID!) {
    rsaPublicKey
    tenant(keyword: $tenantCode) {
      id
      code
      name
      isAuthorizate
    }
    whoAmI {
      id
      username
    }
  }
`
