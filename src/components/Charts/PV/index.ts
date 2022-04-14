// third
import dayjs from 'dayjs'

export { default } from './PV'

export const initializeDates = () => {
  const from = dayjs().subtract(7, 'days')

  return new Array({
    length: 7
  }).map((current, index) => from.add(index, 'days'))
}
