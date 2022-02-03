import { Todo } from '../../../typings/todo'

export const getInitialSingleton = (): Todo => ({
  _id: '',
  description: '',
  status: 'opened'
})
