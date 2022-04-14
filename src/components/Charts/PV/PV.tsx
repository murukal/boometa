// react
import { useMemo, useState } from 'react'
// third
import { useQuery } from '@apollo/client'
import Chart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'
// project
import { DAILY_CLOUTS } from '~/apis/toggle'
import { initializeDates } from '.'

const PV = () => {
  const dates = initializeDates()

  console.log('dates====', dates)

  const { data } = useQuery(DAILY_CLOUTS)

  const [options] = useState<ApexCharts.ApexOptions>({
    chart: {
      toolbar: {
        show: false
      }
    },
    stroke: {
      width: [2, 2, 0, 0]
    },
    xaxis: {
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  })

  const series = useMemo<ApexOptions['series']>(
    () => [
      {
        name: '文章访问数',
        type: 'line',
        data: [23, 12, 54, 61, 32, 56, 70, 19]
      },
      {
        name: '文章点赞数',
        type: 'column',
        data: [62, 12, 45, 55, 76, 41, 23, 43]
      },
      {
        name: '文章收藏',
        type: 'column',
        data: [2, 3, 8, 4, 7, 4, 2, 3]
      }
    ],
    [data]
  )

  return <Chart options={options} series={series} type='line' height={500} />
}

export default PV
