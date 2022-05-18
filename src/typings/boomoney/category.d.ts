export interface Category {
  id: number
  name: string
  icon: string
}

export interface CreateCategoryInput extends Omit<Category, 'id'> {}

export interface UpdateCategoryInput extends CreateCategoryInput {}
