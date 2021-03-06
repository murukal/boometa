import { Core } from '..'

export interface Tag extends Core {
  name: string
  image: string
}

export interface CreateTagInput extends Pick<Tag, 'name' | 'image'> {}

export interface UpdateTagInput extends Partial<CreateTagInput> {}

export interface TopTag {
  id: number
  name: string
  dailyHeat: {
    createdAtDate: string
    creationCount: number
  }[]
}
