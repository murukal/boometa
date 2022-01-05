// antd
import { Button, Space } from 'antd'

type Handler = 'onAdd' | 'onDelete'

interface Props extends Partial<Record<Handler, () => void>> {}

const Toolbar = (props: Props) => {
  return (
    <Space className='mb-4'>
      {props.onAdd && (
        <Button type='primary' onClick={props.onAdd}>
          新增
        </Button>
      )}
      {props.onDelete && (
        <Button type='primary' onClick={props.onDelete}>
          删除
        </Button>
      )}
    </Space>
  )
}

export default Toolbar
