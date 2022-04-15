import dayjs from 'dayjs'

export { default } from './HeatMap'

export const initializeDates = () => {
  const from = dayjs().subtract(30, 'days').endOf('date')

  return Array.from({
    length: 30
  }).map((current, index) => from.add(index, 'days'))
}
