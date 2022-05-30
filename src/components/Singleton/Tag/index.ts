// antd
import type { UploadFile } from 'antd/lib/upload/interface'
// project
import type { Tag } from '~/typings/boomart/tag'

export { default } from './Tag'

export const getInitialSingleton = (): Tag => ({
  id: 0,
  image: '',
  name: ''
})

export interface FormValues {
  name: string
  fileList: UploadFile[]
}
