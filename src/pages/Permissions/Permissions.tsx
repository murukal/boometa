// react
import { useState, useEffect } from 'react'
// antd
import { Card, Tag, Tree } from 'antd'
// third
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
// project
import { resources, getItemStyle } from '.'

const Permissions = () => {
  const [permissions, setPermissions] = useState<
    {
      key: string
      title: string
    }[]
  >([])

  /**
   * 异步请求
   */
  useEffect(() => {
    setPermissions([
      {
        key: '1',
        title: '测试'
      }
    ])
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        gap: 12
      }}
    >
      <DragDropContext onDragEnd={() => {}}>
        <Card
          style={{
            flex: 1
          }}
          title='资源列表'
        >
          <Droppable droppableId='resources'>
            {(provided, snapshot) => (
              <div ref={provided.innerRef}>
                {resources.map((resource, index) => {
                  return (
                    <Draggable key={resource} draggableId={resource} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(provided.draggableProps.style)}
                        >
                          <Tag>{resource}</Tag>
                        </div>
                      )}
                    </Draggable>
                  )
                })}
              </div>
            )}
          </Droppable>
        </Card>

        <Card
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}
          bodyStyle={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}
          title='权限分配'
        >
          <Droppable droppableId='permissions'>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{
                  flex: 1
                }}
              >
                <Tree
                  treeData={permissions}
                  checkable
                  titleRender={(node) => {
                    return node.title
                  }}
                />
              </div>
            )}
          </Droppable>
        </Card>
      </DragDropContext>
    </div>
  )
}

export default Permissions
