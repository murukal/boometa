import type { NsGraph } from '@antv/xflow'

const Material: NsGraph.INodeRender = (props) => {
  /**
   * 1. 节点的数据、位置信息通过props取
   * 2. 当节点被触发更新时, props返回的数据也会动态更新, 触发节点重新渲染
   */
  return (
    <div className='w-full h-full flex items-center justify-center font-semibold bg-white'>
      <div>{'React节点1'}</div>
    </div>
  )
}
export default Material
