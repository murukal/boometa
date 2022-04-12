export { default } from './Users'

export interface Props {
  roleId: number
  userIds: number[]
  onSubmitted: (isSucceed?: boolean) => void
}
