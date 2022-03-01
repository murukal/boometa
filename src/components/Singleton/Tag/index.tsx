// react
import { useMemo, forwardRef } from 'react'
// antd
import type { FormInstance } from 'antd'
import { Form, Input, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useForm } from 'antd/lib/form/Form'
// project
import { responseNotification } from '../../../utils/notification'
import { create, update } from '../../../apis/tag'
import { SingletonProps } from '../assets'
import { customRequest, getUploadParam, getValueFromEvent } from '../../../utils/upload'
import type { Tag as TagType } from '../../../typings/tag'
import type { FormValues } from './assets'

const { Item } = Form

const Tag = forwardRef<FormInstance, SingletonProps<TagType>>((props, ref) => {
  const [form] = useForm<FormValues>()

  const initialValues = useMemo<FormValues>(() => {
    return {
      name: props.singleton.name,
      fileList:
        getUploadParam({
          id: props.singleton._id,
          name: props.singleton.name,
          url: props.singleton.cover
        })?.fileList || []
    }
  }, [props.singleton])

  /** 表单提交事件 */
  const onSubmit = async () => {
    const formValues = form.getFieldsValue()

    const params = {
      name: formValues.name,
      cover: formValues.fileList.at(0)?.response.data
    }

    const handlers = {
      create: () => create(params),
      update: () => update(props.singleton._id, params)
    }

    const handler = handlers[props.singleton._id ? 'update' : 'create']
    const res = await handler()
    responseNotification(res)
    props.onSubmitted && props.onSubmitted()
  }

  return (
    <>
      <Form form={form} ref={ref} onFinish={onSubmit} labelCol={{ span: 6 }} initialValues={initialValues}>
        <Item
          label='标签名称'
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
          label='封面图'
          name='fileList'
          valuePropName='fileList'
          rules={[
            {
              required: true
              // validator: async (_, value?: UploadChangeParam) => {
              //   if (!value || value.fileList.length === 0) throw new Error('请输入封面图')
              // }
            }
          ]}
          getValueFromEvent={getValueFromEvent}
        >
          <Upload listType='picture-card' maxCount={1} customRequest={customRequest}>
            <PlusOutlined />
          </Upload>
        </Item>
      </Form>
    </>
  )
})

export default Tag
