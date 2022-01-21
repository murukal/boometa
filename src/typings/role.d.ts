export interface Role {
  _id: string
  name: string
  users: Array<string>
  menus: Array<string>
}

export interface CreateRole extends Pick<Role, 'name'> {}

export interface UpdateRole extends Partial<Omit<Role, '_id'>> {}
