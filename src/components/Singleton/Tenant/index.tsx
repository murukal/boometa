// react
import { forwardRef, useEffect, useState, ChangeEvent } from 'react'
// antd
import { Col, Form, FormInstance, Input, Row } from 'antd'
// project
import { create, update } from '../../../apis/tenant'
import { responseNotification } from '../../../utils/notification'
import { getInitialSingleton } from './assets'
import type { SingletonProps } from '../assets'
import type { Tenant as TenantType } from '../../../typings/tenant'

const Tenant = forwardRef<FormInstance, SingletonProps<TenantType>>((props, ref) => {
  const singleton = getInitialSingleton()
  const [code, setCode] = useState(singleton.code)
  const [name, setName] = useState(singleton.name)

  useEffect(() => {
    setCode(props.singleton.code)
    setName(props.singleton.name)
  }, [props.singleton])

  const onSubmit = async () => {
    const handlers = {
      create: () =>
        create({
          name,
          code
        }),
      update: () => update(props.singleton._id, { name })
    }

    // 表单提交
    const handler = handlers[props.singleton._id ? 'update' : 'create']
    const res = await handler()
    responseNotification(res)
    !res.code && props.onSubmitted && props.onSubmitted()
  }

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }

  return (
    <Form labelCol={{ span: 6 }} onFinish={onSubmit} ref={ref}>
      <Row>
        <Col span={24}>
          <Form.Item label='租户代码'>
            <Input value={code} onChange={onCodeChange} />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item label='租户名称'>
            <Input value={name} onChange={onNameChange} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
})

export default Tenant
