// react
import type { ChangeEvent } from 'react'
import { forwardRef, useState } from 'react'
// antd
import type { FormInstance } from 'antd'
import { Form, Input } from 'antd'
// project
import type { CreateRole, Role as RoleType } from '../../../typings/role'
import { create, update } from '../../../apis/role'
import { responseNotification } from '../../../utils/notification'
import { SingletonProps } from '../assets'

const { Item } = Form

const Role = forwardRef<FormInstance, SingletonProps<RoleType>>((props, ref) => {
  const [name, setName] = useState(props.singleton.name)

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)

  const onSubmit = async () => {
    const params: CreateRole = {
      name
    }

    const handlers = {
      create: () => create(params),
      update: () => update(props.singleton._id, params)
    }

    const handler = handlers[props.singleton._id ? 'update' : 'create']
    const res = await handler()
    responseNotification(res)
    !res.code && props.onSubmitted && props.onSubmitted()
  }

  return (
    <>
      <Form ref={ref} onFinish={onSubmit} labelCol={{ span: 6 }}>
        <Item label='角色名称'>
          <Input value={name} onChange={onNameChange}></Input>
        </Item>
      </Form>
    </>
  )
})

export default Role
