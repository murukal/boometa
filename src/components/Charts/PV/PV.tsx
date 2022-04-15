// react
import { useState } from 'react'
// third
import { useQuery } from '@apollo/client'
import Chart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'
// project
import { DAILY_CLOUTS } from '~/apis/toggle'
import { initializeDates } from '.'

const PV = () => {
  const [dates] = useState(initializeDates)
  const [series, setSeries] = useState<ApexOptions['series']>([])
  const [options] = useState<ApexCharts.ApexOptions>({
    chart: {
      toolbar: {
        show: false
      }
    },
    stroke: {
      width: [2, 0, 0]
    },
    xaxis: {
      categories: dates.map((date) => date.format('M-D'))
    },
    title: {
      text: '最近10天游客流量🌲'
    }
  })

  useQuery(DAILY_CLOUTS, {
    variables: {
      from: dates.at(0)?.toDate() as Date,
      to: dates.at(dates.length - 1)?.toDate() as Date
    },
    onCompleted: (data) => {
      setSeries(
        (Object.keys(data) as (keyof typeof data)[]).map((key) => {
          return {
            ...(key === 'dailyBrowseClout'
              ? {
                  name: '文章浏览量',
                  type: 'line'
                }
              : key === 'dailyCollectClout'
              ? {
                  name: '文章收藏量',
                  type: 'column'
                }
              : {
                  name: '文章点赞量',
                  type: 'column'
                }),
            data: dates.map((current) => {
              return (
                data[key].find((clout) => {
                  return clout.createdAtDate === current.format('YYYY-MM-DD')
                })?.clout || 0
              )
            })
          }
        })
      )
    }
  })

  return <Chart options={options} series={series} height='100%' />
}

export default PV
