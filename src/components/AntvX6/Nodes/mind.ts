// antd
import { Node, ObjectExt, Graph } from '@antv/x6'

export class Mind extends Node {}

Mind.config({
  width: 100,
  height: 40,
  markup: [
    {
      tagName: 'rect',
      selector: 'body'
    },
    {
      tagName: 'text',
      selector: 'label'
    },
    {
      tagName: 'path',
      selector: 'bottom'
    }
  ],
  attrs: {
    body: {
      fill: '#ffffff'
    },
    label: {
      fontSize: 14,
      fill: '#333333',
      refX: '50%',
      refY: '50%',
      textAnchor: 'middle',
      textVerticalAnchor: 'middle'
    },
    bottom: {
      stroke: '#fb923c',
      d: 'M0 40 l100 0',
      strokeWidth: 4
    }
  },

  ports: {
    groups: {
      from: {
        position: {
          name: 'bottom',
          args: { dx: -50 }
        },

        attrs: {
          circle: {
            r: 1,
            magnet: true,
            stroke: '#fb923c',
            fill: '#fb923c'
          }
        }
      },
      to: {
        position: {
          name: 'bottom',
          args: { dx: 50 }
        },

        attrs: {
          circle: {
            r: 1,
            magnet: true,
            stroke: '#fb923c',
            fill: '#fb923c'
          }
        }
      }
    },

    items: [
      {
        id: 'from',
        group: 'from'
      },
      {
        id: 'to',
        group: 'to'
      }
    ]
  },

  propHooks(metadata) {
    const { label, ...others } = metadata

    // 标签文本
    label && ObjectExt.setByPath(others, 'attrs/label/text', label)

    return others
  }
})

Graph.registerNode('mind', Mind)
