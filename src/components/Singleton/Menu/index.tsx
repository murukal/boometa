// react
import { useMemo, forwardRef } from 'react'
// antd
import { Form, Input, InputNumber, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import type { FormInstance } from 'antd'
// project
import { create, update } from '../../../apis/menu'
import { responseNotification } from '../../../utils/notification'
import IconSelector from '../../IconSelector'
import { authorizationOptions, componentOptions } from './assets'
import { SingletonProps } from '../assets'
import type { MenuTreeNode } from '../../../typings/menu'
import type { ExtraProps, FormValues } from './assets'

const { Item } = Form

const Menu = forwardRef<FormInstance, SingletonProps<MenuTreeNode, ExtraProps>>((props, ref) => {
  const [form] = useForm<FormValues>()

  const initialValuse = useMemo<FormValues>(
    () => ({
      name: props.singleton.name,
      sortBy: props.singleton.sortBy,
      icon: props.singleton.icon,
      authorizations: props.singleton.authorizations,
      route: props.singleton.route
    }),
    [props.singleton]
  )

  /** 表单提交事件 */
  const onSubmit = async () => {
    const formValues = form.getFieldsValue()

    const handlers = {
      create: () =>
        create({
          ...formValues,
          tenant: props.extraProps.tenantId,
          parent: props.extraProps.parentId
        }),
      update: () => update(props.singleton.id, formValues)
    }

    // 提交表单
    const res = await handlers[props.singleton.id ? 'update' : 'create']()
    responseNotification(res)
    !res.code && props.onSubmitted && props.onSubmitted()
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

      <Item label='菜单组件路径' name={['route', 'component']}>
        <Select options={componentOptions} />
      </Item>

      <Item label='菜单路由' name={['route', 'to']}>
        <Input />
      </Item>

      <Item label='菜单图标' name='icon'>
        <IconSelector />
      </Item>

      <Item label='菜单权限通行证' name='authorizations'>
        <Select mode='multiple' allowClear options={authorizationOptions} />
      </Item>
    </Form>
  )
})

export default Menu
