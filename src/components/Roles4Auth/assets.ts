export interface Props {
  roleId: string
  title: string
  actived?: AuthType
  onTabChange?: (actived: string) => void
  className?: string
  onClose?: Function
}

export type AuthType = 'user' | 'menu'
