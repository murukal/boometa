import { useQuery } from '@apollo/client'
import { ApexOptions } from 'apexcharts'
import { useState } from 'react'
import Chart from 'react-apexcharts'
import { TOP_TAGS } from '~/apis/tag'
import { initializeDates } from '.'

const HeatMap = () => {
  const [dates] = useState(initializeDates)
  const [series, setSeries] = useState<ApexOptions['series']>([])
  const [options] = useState<ApexCharts.ApexOptions>({
    colors: ['#008FFB'],
    title: {
      text: '最近30天创作热度🔥'
    },
    dataLabels: {
      enabled: false
    },
    chart: {
      toolbar: {
        show: false
      }
    }
  })

  useQuery(TOP_TAGS, {
    variables: {
      from: dates.at(0)?.toDate() as Date,
      to: dates.at(dates.length - 1)?.toDate() as Date
    },
    onCompleted: (data) => {
      setSeries(
        data.topTags
          .map((topTag) => ({
            name: topTag.name,
            data: dates.map((current) => ({
              x: current.format('M-D'),
              y:
                topTag.dailyHeat.find((heat) => heat.createdAtDate === current.format('YYYY-MM-DD'))?.creationCount || 0
            }))
          }))
          .reverse()
      )
    }
  })

  return <Chart type='heatmap' options={options} series={series} height='100%' />
}

export default HeatMap
