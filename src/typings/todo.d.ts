export type Status = 'opened' | 'closed'

export interface CreateTodo {
  description: string
  status: Status
}

export interface Todo extends CreateTodo {
  _id: string
}

export interface UpdateTodo extends CreateTodo {}

export type Todos = Todo[]
