// react
import { forwardRef, useEffect, useState, ChangeEvent } from 'react'
// antd
import { Col, Form, FormInstance, Input, Row } from 'antd'
// project
import { create, update } from '../../../apis/tenant'
import { responseNotification } from '../../../utils/notification'
import { getInitialSingleton, Props } from './assets'

const Tenant = forwardRef<FormInstance, Props>((props, ref) => {
  const singleton = getInitialSingleton()
  const [code, setCode] = useState(singleton.code)
  const [description, setDescription] = useState(singleton.description)

  useEffect(() => {
    setCode(props.singleton.code)
    setDescription(props.singleton.description)
  }, [props.singleton])

  const onSubmit = async () => {
    const handlers = {
      create: () =>
        create({
          description,
          code
        }),
      update: () => update(props.singleton._id as string, { description })
    }

    // 表单提交
    const handler = handlers[props.singleton._id ? 'update' : 'create']
    const res = await handler()
    responseNotification(res)
    !res.code && props.onSubmitted && props.onSubmitted()
  }

  const onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  const onCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }

  return (
    <Form labelCol={{ span: 6 }} onFinish={onSubmit} ref={ref}>
      <Row>
        <Col span={24}>
          <Form.Item label='租户代码'>
            <Input disabled={!!props.singleton._id} value={code} onChange={onCodeChange} />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item label='租户描述'>
            <Input value={description} onChange={onDescriptionChange} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
})

export default Tenant
