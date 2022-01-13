// react
import { ReactChild } from 'react'
// antd
import { Button, Drawer, Space } from 'antd'

interface Props {
  title?: string
  isOpened: boolean
  onSubmit?: () => void
  onClose?: () => void
  children?: ReactChild | never[]
}

const Singleton = (props: Props) => {
  return (
    <>
      <Drawer
        title={props.title}
        placement='right'
        closable={false}
        onClose={props.onClose}
        visible={props.isOpened}
        width={500}
        extra={
          <Space>
            <Button onClick={props.onClose}>关闭</Button>
            <Button type='primary' onClick={props.onSubmit}>
              提交
            </Button>
          </Space>
        }
      >
        {props.children}
      </Drawer>
    </>
  )
}

export default Singleton
