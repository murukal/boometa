import { useQuery } from '@apollo/client'
import { ApexOptions } from 'apexcharts'
import { useState } from 'react'
import Chart from 'react-apexcharts'
import { TOP_TAGS } from '~/apis/tag'

const current = new Date()

const HeatMap = () => {
  const [series, setSeries] = useState<ApexOptions['series']>([])
  const [options] = useState<ApexCharts.ApexOptions>({
    plotOptions: {
      heatmap: {
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 5,
              color: '#00A100',
              name: '创作有点积极'
            },
            {
              from: 5,
              to: 10,
              color: '#128FD9',
              name: '产能高效'
            },
            {
              from: 10,
              to: 15,
              color: '#FFB200',
              name: '这也太卷了吧'
            }
          ]
        }
      }
    }
  })

  useQuery(TOP_TAGS, {
    variables: {
      from: current,
      to: current
    },
    onCompleted: () => {}
  })

  return <Chart type='heatmap' options={options} series={series} height='100%' />
}

export default HeatMap
