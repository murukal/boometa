// react
import { useEffect } from 'react'
// antd
import { Graph } from '@antv/x6'
// project
import '../../components/AntvX6/Nodes/index'

const Boomap = () => {
  useEffect(() => {
    const graph = new Graph({
      container: document.getElementById('container') || undefined,
      autoResize: true,
      grid: true,
      connecting: {
        allowBlank: false
      }
    })

    graph.addNode({
      x: 100,
      y: 60,
      shape: 'mind',
      label: 'My Custom Rect1'
    })

    graph.addNode({
      x: 300,
      y: 360,
      shape: 'mind',
      label: 'My Custom Rect2'
    })
  }, [])

  return (
    <div className='flex h-full'>
      <div id='container' className='flex-1' />
    </div>
  )
}

export default Boomap
