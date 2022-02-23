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
      title: props.essay.title,
      tags: props.essay.tags,
      fileList: getUploadParam({
        id: props.essay._id,
        name: props.essay.title,
        url: props.essay.cover
      })?.fileList
    }
  }, [props.essay])

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
        label='文章标题'
        name='title'
        rules={[
          {
            required: true
          }
        ]}
      >
        <Input size='large' />
      </Item>

      <Item label='文章封面' name='fileList' valuePropName='fileList' getValueFromEvent={getValueFromEvent}>
        <Upload action='http://admin.r2boom.com/api/object-storage/cos' listType='picture-card'>
          <PlusOutlined />
        </Upload>
      </Item>

      <Item
        label='文章标签'
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
