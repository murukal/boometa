// react
import { useMemo, forwardRef } from 'react'
// antd
import { Form, Input, InputNumber, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import type { FormInstance } from 'antd'
// project
import { create, update } from '../../../apis/menu'
import IconSelector from '../../IconSelector'
import { componentOptions } from '.'
import { resultNotification } from '../../../utils/notification'
import type { SingletonProps } from '../assets'
import type { Menu as MenuType } from '../../../typings/menu'
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
      component: props.singleton.component
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
          tenantId: props.extraProps.tenantId,
          parentId: props.extraProps.parentId
        }),
      update: () => update(props.singleton.id, formValues)
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
        <Select options={componentOptions} />
      </Item>

      <Item label='菜单路由' name='to'>
        <Input />
      </Item>

      <Item label='菜单图标' name='icon'>
        <IconSelector />
      </Item>

      {/* <Item label='菜单权限通行证' name='authorizations'>
        <Select mode='multiple' allowClear options={authorizationOptions} />
      </Item> */}
    </Form>
  )
})

export default Menu
