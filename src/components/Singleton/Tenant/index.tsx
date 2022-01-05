// react
import { forwardRef, useEffect, useState, ChangeEvent } from 'react'
// antd
import { Col, Form, FormInstance, Input, Row } from 'antd'
// project
import { Tenant as TenantType } from '../../../typings/tenant'
import { create, update } from '../../../apis/tenant'
import { responseNotification } from '../../../utils/notification'

interface Props {
  singleton?: TenantType
  onSubmitted?: Function
}

const Tenant = forwardRef<FormInstance, Props>((props, formRef) => {
  const [code, setCode] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    setCode(props.singleton?.code || '')
    setDescription(props.singleton?.description || '')
  }, [props.singleton])

  const onSubmit = async () => {
    const handlerMap = {
      create: () =>
        create({
          description,
          code
        }),
      update: () => update(props.singleton?._id as string, { description })
    }

    // 表单提交
    const handler = handlerMap[props.singleton?._id ? 'update' : 'create']
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
    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onFinish={onSubmit} ref={formRef}>
      <Row>
        <Col span={24}>
          <Form.Item label='租户代码'>
            <Input disabled={!!props.singleton} value={code} onChange={onCodeChange} />
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
