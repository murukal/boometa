// react
import type { CSSProperties } from 'react'
// antd
import type { UploadFile } from 'antd/lib/upload/interface'
// project
import type { Essay } from '../../../../typings/essay'
import type { Tag } from '../../../../typings/tag'

export interface Model {
  title: string
  tags: (string | Tag)[]
  fileList: UploadFile<any>[] | undefined
}

export interface Props {
  essay: Essay
  tags: Tag[]
  style?: CSSProperties | undefined
}
