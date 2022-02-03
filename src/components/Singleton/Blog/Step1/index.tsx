// react
import { forwardRef, useEffect, useMemo } from 'react'
// antd
import { Input, Upload, Form, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { PlusOutlined } from '@ant-design/icons'
import type { FormInstance } from 'antd'
// project
import { getUploadParam, getValueFromEvent } from '../../../../utils/upload'
import type { Model, Props } from './assets'

const { Item } = Form

const Step1 = forwardRef<FormInstance, Props>((props, ref) => {
  const [form] = useForm()

  const initialValues = useMemo<Model>(() => {
    return {
      title: props.blog.title,
      tags: props.blog.tags,
      fileList: getUploadParam({
        id: props.blog._id,
        name: props.blog.title,
        url: props.blog.cover
      })?.fileList
    }
  }, [props.blog])

  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues])

  return (
    <Form
      form={form}
      className='h-full flex flex-col justify-around'
      ref={ref}
      initialValues={initialValues}
      labelCol={{ span: 4 }}
      style={props.style}
    >
      <Item
        label='博客标题'
        name='title'
        rules={[
          {
            required: true
          }
        ]}
      >
        <Input size='large' />
      </Item>

      <Item label='博客封面' name='fileList' valuePropName='fileList' getValueFromEvent={getValueFromEvent}>
        <Upload listType='picture-card'>
          <PlusOutlined />
        </Upload>
      </Item>

      <Item
        label='博客标签'
        name='tags'
        rules={[
          {
            required: true
          }
        ]}
      >
        <Select
          mode='multiple'
          options={props.tags.map((tag) => ({
            label: tag.name,
            value: tag._id
          }))}
        />
      </Item>
    </Form>
  )
})

export default Step1
