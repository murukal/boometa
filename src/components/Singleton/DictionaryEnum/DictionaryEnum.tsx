// react
import { useMemo, forwardRef } from 'react'
// antd
import { Form, FormInstance, Input, InputNumber } from 'antd'
import { useForm } from 'antd/lib/form/Form'
// project
import { create, update } from '~/apis/boomemory/dictionary-enum'
import { SingletonProps } from '..'
import type { ExtraProps, FormValues } from '.'
import type { DictionaryEnum as DictionaryEnumType } from '~/typings/boomemory/dictionary-enum'

const { Item } = Form

const DictionaryEnum = forwardRef<FormInstance, SingletonProps<DictionaryEnumType, ExtraProps>>((props, ref) => {
  const [form] = useForm<FormValues>()

  const initialValues = useMemo<FormValues>(
    () => ({
      code: props.singleton.code,
      description: props.singleton.description,
      sortBy: props.singleton.sortBy
    }),
    [props.singleton]
  )

  /** 提交事件 */
  const onSubmit = async () => {
    const formValues = form.getFieldsValue()

    const handlers = {
      create: () => {
        if (!props.extraProps?.parentId) return

        return create({
          ...formValues,
          parentId: props.extraProps?.parentId
        })
      },
      update: () => update(props.singleton.id, formValues)
    }

    const res = await handlers[props.singleton.id ? 'update' : 'create']()

    // 回调
    props.onSubmitted(res)
  }

  return (
    <Form ref={ref} onFinish={onSubmit} labelCol={{ span: 6 }} initialValues={initialValues}>
      <Item
        label='枚举code'
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
        label='枚举描述'
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

export default DictionaryEnum
