import { Blog } from '../../../typings/blog'

export const getInitialSingleton = (): Blog => ({
  _id: '',
  content: '',
  createdBy: '',
  title: ''
})

export interface Props {
  singleton: Blog
  onSubmitted?: Function
}
