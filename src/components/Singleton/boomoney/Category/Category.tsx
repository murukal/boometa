// react
import { forwardRef, useMemo } from 'react'
// antd
import { Form, Input } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import type { FormInstance } from 'antd'
// project
import { create, update } from '~/apis/schemas/boomoney/category'
import IconSelector from '~/components/IconSelector'
import { resultNotification } from '~/utils/notification'
import type { Category as CategoryType } from '~/typings/boomoney/category'
import type { FormValues } from '.'
import type { SingletonProps } from '../..'

const { Item } = Form

const Category = forwardRef<FormInstance, SingletonProps<CategoryType>>((props, ref) => {
  const [form] = useForm<FormValues>()

  const initialValues = useMemo<FormValues>(() => {
    return {
      name: props.singleton.name,
      icon: props.singleton.icon
    }
  }, [props.singleton])

  /**
   * 表单提交
   */
  const onSubmit = async () => {
    const formValues = form.getFieldsValue()

    const handlers = {
      create: () => create(formValues),
      update: () => update(props.singleton.id, formValues)
    }

    const result = await handlers[props.singleton.id ? 'update' : 'create']()

    resultNotification(result)
    result.data && props.onSubmitted()
  }

  return (
    <Form form={form} ref={ref} onFinish={onSubmit} labelCol={{ span: 6 }} initialValues={initialValues}>
      <Item
        label='分类名称'
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
        label='分类图标'
        name='icon'
        rules={[
          {
            required: true
          }
        ]}
      >
        <IconSelector type='material-design' />
      </Item>
    </Form>
  )
})

export default Category
