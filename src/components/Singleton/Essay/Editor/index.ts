export { default } from './Editor'

export interface Props {
  value?: string
  height?: number | string
  className?: string
  onChange?: (value: string) => void
}
