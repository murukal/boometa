// react
import { createRef } from 'react'
// antd
import { Button, Drawer, Space } from 'antd'
import type { FormInstance } from 'antd'
// project
import { Props } from './assets'

const Singleton = (props: Props) => {
  const ref = createRef<FormInstance>()

  const onSubmit = () => {
    ref.current?.submit()
  }

  const onReset = () => {
    ref.current?.resetFields()
  }

  /** 抽屉切换 */
  const afterVisibleChange = (isOpened: boolean) => {
    if (isOpened) {
      onReset()
    }
  }

  const Instance = props.singletonComponent

  return (
    <>
      <Drawer
        title={props.title}
        placement='right'
        closable={false}
        onClose={props.onClose}
        visible={props.isOpened}
        afterVisibleChange={afterVisibleChange}
        width={500}
        extra={
          <Space>
            <Button onClick={props.onClose}>关闭</Button>
            <Button onClick={onReset}>重置</Button>
            <Button type='primary' onClick={onSubmit}>
              提交
            </Button>
          </Space>
        }
      >
        {Instance ? <Instance singleton={props.singleton} ref={ref} extraProps={props.extraProps} onSubmitted={props.onSubmitted} /> : null}
      </Drawer>
    </>
  )
}

export default Singleton
