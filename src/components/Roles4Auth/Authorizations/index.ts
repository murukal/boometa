export { default } from './Authorizations'

export interface Props {
  isDisabled: boolean
  roleId: number
  onSubmit: Function
  onSubmitted: (isSucceed?: boolean) => void
  authorizationIds: number[]
}
