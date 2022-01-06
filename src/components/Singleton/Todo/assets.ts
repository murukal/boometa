import { Todo } from '../../../typings/todo'

export interface Props {
  singleton: Todo
  onSubmitted?: Function
}

export const getInitialSingleton = (): Todo => ({
  _id: '',
  description: '',
  status: 'opened'
})
