// react
import { forwardRef, useState } from 'react'
import type { ChangeEvent } from 'react'
// antd
import { Form, Input } from 'antd'
import type { FormInstance } from 'antd'
// project
import { create, update } from '~/apis/boomemory/role'
import type { SingletonProps } from '..'
import type { Role as RoleType } from '~/typings/role'

const { Item } = Form

const Role = forwardRef<FormInstance, SingletonProps<RoleType>>((props, ref) => {
  const [name, setName] = useState(props.singleton.name)

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)

  const onSubmit = async () => {
    const params = {
      name
    }

    const handlers = {
      create: () => create(params),
      update: () => update(props.singleton.id, params)
    }

    const handler = handlers[props.singleton.id ? 'update' : 'create']
    const res = await handler()
    props.onSubmitted(res)
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
