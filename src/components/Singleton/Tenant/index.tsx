// react
import { forwardRef } from 'react'
// antd
import { Form, FormInstance, Input, Switch } from 'antd'
// project
import { CREATE, UPDATE } from '../../../apis/tenant'
import { useForm } from 'antd/lib/form/Form'
import { useMemo } from 'react'
import type { FormValues } from './assets'
import type { SingletonProps } from '../assets'
import type { Tenant as TenantType } from '../../../typings/tenant'
import { useApolloClient } from '@apollo/client'

const Tenant = forwardRef<FormInstance, SingletonProps<TenantType>>((props, ref) => {
  const [form] = useForm<FormValues>()
  const clinet = useApolloClient()

  /** 表单初始值 */
  const initialValues = useMemo<FormValues>(
    () => ({
      code: props.singleton.code,
      name: props.singleton.name,
      isAuthorizate: props.singleton.isAuthorizate
    }),
    [props.singleton]
  )

  const onSubmit = async () => {
    const formValues = form.getFieldsValue()

    const handlers = {
      create: () =>
        clinet.mutate<
          TenantType,
          {
            tenant: FormValues
          }
        >({
          mutation: CREATE,
          variables: {
            tenant: formValues
          }
        }),
      update: () =>
        clinet.mutate<
          boolean,
          {
            id: number
            tenant: FormValues
          }
        >({
          mutation: UPDATE,
          variables: {
            id: props.singleton.id,
            tenant: formValues
          }
        })
    }

    // 表单提交
    const res = await handlers[props.singleton.id ? 'update' : 'create']()
    // 触发回调
    props.onSubmitted(res)
  }

  return (
    <Form form={form} labelCol={{ span: 6 }} onFinish={onSubmit} ref={ref} initialValues={initialValues}>
      <Form.Item
        label='租户代码'
        name='code'
        rules={[
          {
            required: true
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='租户名称'
        name='name'
        rules={[
          {
            required: true
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label='是否鉴权' name='isAuthorizate' valuePropName='checked'>
        <Switch />
      </Form.Item>
    </Form>
  )
})

export default Tenant
