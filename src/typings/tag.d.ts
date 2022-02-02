export interface Tag {
  _id: string
  name: string
  cover: string
}

export interface CreateTag extends Omit<Tag, '_id'> {}

export interface UpdateTag extends CreateTag {}
