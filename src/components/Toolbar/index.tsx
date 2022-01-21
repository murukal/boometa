// react
import type { MouseEventHandler } from 'react'
// antd
import { Button, Space } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'

type Handler = 'onAdd' | 'onDelete' | 'onAddUser'

interface Props extends Partial<Record<Handler, MouseEventHandler<HTMLElement>>> {}

const Toolbar = (props: Props) => {
  return (
    <Space className='mb-4'>
      {props.onAdd && (
        <Button type='primary' onClick={props.onAdd} icon={<PlusOutlined />}>
          新增
        </Button>
      )}
      {props.onDelete && (
        <Button type='primary' onClick={props.onDelete} icon={<MinusOutlined />} danger>
          删除
        </Button>
      )}
      {props.onAddUser && (
        <Button type='primary' onClick={props.onAddUser} icon={<PlusOutlined />}>
          添加用户
        </Button>
      )}
    </Space>
  )
}

export default Toolbar
