import { createGraphConfig } from '@antv/xflow'
/** 自定义React节点/边 */
import Edge from './Edge'
import Material from './Material'

export const useGraphConfig = createGraphConfig((config) => {
  config.getConfig().then((res) => {
    console.log(res)
  })

  /** 设置XFlow画布配置项 */
  config.setX6Config({
    /** 画布网格 */
    grid: true,
    /** 画布缩放等级 */
    scaling: {
      min: 0.2,
      max: 3
    }
  })

  /** 设置XFlow画布需要渲染的React节点/边 */
  config.setNodeRender('Material', Material)
  config.setEdgeRender('Edge', Edge)
})
