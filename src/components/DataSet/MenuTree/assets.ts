export interface TreeDataType {
  _id: string
  description?: string | null
  children?: TreeDataType[] | null
}

export interface Props {
  menus: string[]
  isDisable: boolean
  onCheck?: (keys: string[]) => void
}
