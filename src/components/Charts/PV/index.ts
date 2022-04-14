// third
import dayjs from 'dayjs'

export { default } from './PV'

export const initializeDates = () => {
  const from = dayjs().subtract(6, 'days').endOf('date')

  return Array.from({
    length: 7
  }).map((current, index) => from.add(index, 'days'))
}
