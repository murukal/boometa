import { Essay } from '../../typings/essay'

export const getInitialSingleton = (): Essay => ({
  _id: '',
  content: '',
  createdBy: '',
  title: '',
  tags: []
})
