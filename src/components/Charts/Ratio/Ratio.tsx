import { useState } from 'react'
import Chart from 'react-apexcharts'

export const Ratio = () => {
  const [options] = useState<ApexCharts.ApexOptions>({
    labels: ['Apple', 'Mango'],
    legend: {
      position: 'bottom'
    }
  })

  const series = [49, 22]

  return <Chart options={options} series={series} type='donut' height='100%' />
}

export default Ratio
