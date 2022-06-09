import { UploadFile } from 'antd/lib/upload/interface'
import { Navigation } from '~/typings/boomart/navigation'

export { default } from './Navigation'

export const getInitialSingleton = (): Navigation => ({
  id: 0,
  title: ''
})

export interface FormValues {
  title: string
  fileList: UploadFile[]
  tagIds: number[]
}
