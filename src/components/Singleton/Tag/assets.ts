// project
import type { Tag } from '../../../typings/tag'

export interface Props {
  singleton: Tag
}

export const getInitialSingleton = (): Tag => ({
  _id: '',
  cover: '',
  name: ''
})
