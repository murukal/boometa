// react
import { forwardRef, useMemo } from 'react'
// antd
import { Form, Input, InputNumber } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import type { FormInstance } from 'antd'
// project
import { create, update } from '~/apis/schemas/boomemory/dictionary'
import type { SingletonProps } from '..'
import type { FormValues } from '.'
import type { Dictionary as DictionaryType } from '~/typings/boomemory/dictionary'

const { Item } = Form

const Dictionary = forwardRef<FormInstance, SingletonProps<DictionaryType>>((props, ref) => {
  const [form] = useForm<FormValues>()

  const initialValues = useMemo<FormValues>(
    () => ({
      code: props.singleton.code,
      description: props.singleton.description,
      sortBy: props.singleton.sortBy
    }),
    [props.singleton]
  )

  const onSubmit = async () => {
    const formValues = form.getFieldsValue()

    const handlers = {
      create: () => create(formValues),
      update: () => update(props.singleton.id, formValues)
    }

    // 表单提交
    const res = await handlers[props.singleton.id ? 'update' : 'create']()

    // 回调
    props.onSubmitted(res)
  }

  return (
    <Form ref={ref} form={form} onFinish={onSubmit} labelCol={{ span: 6 }} initialValues={initialValues}>
      <Item
        label='字典Code'
        name='code'
        rules={[
          {
            required: true
          }
        ]}
      >
        <Input />
      </Item>

      <Item
        label='字典描述'
        name='description'
        rules={[
          {
            required: true
          }
        ]}
      >
        <Input />
      </Item>

      <Item
        label='排序码'
        name='sortBy'
        rules={[
          {
            required: true
          }
        ]}
      >
        <InputNumber />
      </Item>
    </Form>
  )
})

export default Dictionary
