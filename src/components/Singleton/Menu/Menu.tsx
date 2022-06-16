// react
import { useMemo, forwardRef } from 'react'
// antd
import { Form, Input, InputNumber, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import type { FormInstance } from 'antd'
// project
import IconSelector from '../../IconSelector'
import { create, update } from '~/apis/schemas/boomemory/menu'
import { componentOptions } from '.'
import { resultNotification } from '~/utils/notification'
import { useQuery } from '@apollo/client'
import { AUTHORIZATION_RESOURCES } from '~/apis/schemas/boomemory/auth'
import type { SingletonProps } from '..'
import type { Menu as MenuType } from '~/typings/boomemory/menu'
import type { ExtraProps, FormValues } from '.'

const { Item } = Form

const Menu = forwardRef<FormInstance, SingletonProps<MenuType, ExtraProps>>((props, ref) => {
  const [form] = useForm<FormValues>()

  const initialValuse = useMemo<FormValues>(
    () => ({
      name: props.singleton.name,
      sortBy: props.singleton.sortBy,
      icon: props.singleton.icon,
      to: props.singleton.to,
      component: props.singleton.component,
      resourceCodes: props.singleton.resourceCodes
    }),
    [props.singleton]
  )

  /**
   * 权限资源
   */
  const { data: resources } = useQuery(AUTHORIZATION_RESOURCES)

  /**
   * 表单提交事件
   */
  const onSubmit = async () => {
    const formValues = form.getFieldsValue()

    const handlers = {
      create: () => {
        // 每个菜单都必须有对应的租户code
        if (!props.extraProps?.tenantCode) return

        return create({
          ...formValues,
          tenantCode: props.extraProps?.tenantCode,
          parentId: props.extraProps?.parentId
        })
      },
      update: () =>
        update(props.singleton.id, {
          ...formValues,
          component: formValues.component || '',
          icon: formValues.icon || ''
        })
    }

    // 提交表单
    const result = await handlers[props.singleton.id ? 'update' : 'create']()
    resultNotification(result)
    props.onSubmitted(result)
  }

  return (
    <Form labelCol={{ span: 6 }} onFinish={onSubmit} ref={ref} form={form} initialValues={initialValuse}>
      <Item
        label='菜单名称'
        name='name'
        rules={[
          {
            required: true
          }
        ]}
      >
        <Input />
      </Item>

      <Item
        label='菜单排序码'
        name='sortBy'
        rules={[
          {
            required: true
          }
        ]}
      >
        <InputNumber />
      </Item>

      <Item label='菜单组件路径' name='component'>
        <Select options={componentOptions} allowClear />
      </Item>

      <Item label='菜单路由' name='to'>
        <Input />
      </Item>

      <Item label='菜单图标' name='icon'>
        <IconSelector type='ant-design' />
      </Item>

      <Item label='权限资源' name='resourceCodes'>
        <Select
          mode='multiple'
          allowClear
          options={resources?.authorizationResources}
          fieldNames={{
            label: 'name',
            value: 'code'
          }}
        />
      </Item>
    </Form>
  )
})

export default Menu
