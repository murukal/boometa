// react
import { createRef } from 'react'
// antd
import { Button, Drawer, Space } from 'antd'
import type { FormInstance } from 'antd'
// project
import type { Props } from '.'
import type { FetchResult } from '@apollo/client'

const Singleton = <P, E>(props: Props<P, E>) => {
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

  /** 提交后的回调事件 */
  const onSubmitted = (result?: FetchResult) => {
    if (result?.errors?.length) return
    if (!props.onSubmitted) return
    props.onSubmitted()
  }

  /** 单利组件 */
  const Instance = props.singletonComponent

  return (
    <Drawer
      title={props.title || '功能区'}
      placement='right'
      closable={false}
      maskClosable={false}
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
      <Instance singleton={props.singleton} ref={ref} extraProps={props.extraProps} onSubmitted={onSubmitted} />
    </Drawer>
  )
}

export default Singleton
