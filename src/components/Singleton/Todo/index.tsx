// react
import { ChangeEvent, forwardRef, useEffect, useState } from 'react'
// antd
import { Col, Form, FormInstance, Input, Row, Select } from 'antd'
// project
import type { Status, Todo as TodoType, UpdateTodo } from '../../../typings/todo'
import { create, update } from '../../../apis/todo'
import { responseNotification } from '../../../utils/notification'
import { getInitialSingleton } from './assets'
import { SingletonProps } from '../assets'

const Todo = forwardRef<FormInstance, SingletonProps<TodoType>>((props, ref) => {
  const singleton = getInitialSingleton()
  const [description, setDescription] = useState(singleton.description)
  const [status, setStatus] = useState<Status>(singleton.status)

  useEffect(() => {
    setDescription(props.singleton.description)
    setStatus(props.singleton.status)
  }, [props.singleton])

  const onSubmit = async () => {
    const todo: UpdateTodo = {
      description,
      status
    }

    const handlers = {
      create: () => create(todo),
      update: () => update(props.singleton._id as string, todo)
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
  const onStatusChange = (value: Status) => {
    setStatus(value)
  }

  return (
    <Form labelCol={{ span: 6 }} onFinish={onSubmit} ref={ref}>
      <Row>
        <Col span={24}>
          <Form.Item label='待办描述'>
            <Input value={description} onChange={onDescriptionChange} />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item label='客户端描述'>
            <Select
              value={status}
              options={[
                { label: '打开', value: 'opened' },
                {
                  label: '关闭',
                  value: 'closed'
                }
              ]}
              onChange={onStatusChange}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
})

export default Todo
