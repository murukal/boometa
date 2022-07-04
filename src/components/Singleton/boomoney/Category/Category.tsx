// react
import { forwardRef, useMemo } from 'react'
// antd
import { Form, Input, notification } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import type { FormInstance } from 'antd'
// third
import { useMutation } from '@apollo/client'
// project
import { CREATE, UPDATE } from '~/apis/schemas/boomoney/category'
import IconSelector from '~/components/IconSelector'
import { AppID } from '~/assets'
import type { Category as CategoryType } from '~/typings/boomoney/category'
import type { FormValues } from '.'
import type { SingletonProps } from '../..'

const { Item } = Form

const Category = forwardRef<FormInstance, SingletonProps<CategoryType>>((props, ref) => {
  const [form] = useForm<FormValues>()
  const [create] = useMutation(CREATE, {})
  const [update] = useMutation(UPDATE, {
    context: {
      appId: AppID.Boomoney
    }
  })

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
      create: () =>
        create({
          variables: {
            createCategoryInput: formValues
          }
        }),
      update: () =>
        update({
          variables: {
            id: props.singleton.id,
            updateCategoryInput: formValues
          }
        })
    }

    // 发起请求
    const res = await handlers[props.singleton.id ? 'update' : 'create']().catch((error: Error) => {
      notification.error({
        message: error.message
      })
      return null
    })

    res?.data && props.onSubmitted()
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
