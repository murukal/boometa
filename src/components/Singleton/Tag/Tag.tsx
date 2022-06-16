// react
import { useMemo, forwardRef } from 'react'
// antd
import { Form, Input, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useForm } from 'antd/lib/form/Form'
import type { FormInstance } from 'antd'
// project
import { create, update } from '~/apis/schemas/boomart/tag'
import { SingletonProps } from '..'
import { customRequest, getUploadParam, getValueFromEvent } from '~/utils/upload'
import type { Tag as TagType } from '~/typings/boomart/tag'
import type { FormValues } from '.'
import type { UploadFile } from 'antd/lib/upload/interface'
import { resultNotification } from '~/utils/notification'

const { Item } = Form

const Tag = forwardRef<FormInstance, SingletonProps<TagType>>((props, ref) => {
  const [form] = useForm<FormValues>()

  const initialValues = useMemo<FormValues>(() => {
    return {
      name: props.singleton.name,
      fileList:
        getUploadParam({
          id: props.singleton.id,
          name: props.singleton.name,
          url: props.singleton.image
        })?.fileList || []
    }
  }, [props.singleton])

  /**
   * 表单提交事件
   */
  const onFinish = async (values: FormValues) => {
    const tagInput = {
      name: values.name,
      image: values.fileList.at(0)?.response || values.fileList.at(0)?.thumbUrl || ''
    }

    const handlers = {
      create: () => create(tagInput),
      update: () => update(props.singleton.id, tagInput)
    }

    const result = await handlers[props.singleton.id ? 'update' : 'create']()
    resultNotification(result)
    result.data && props.onSubmitted(result)
  }

  return (
    <Form form={form} ref={ref} onFinish={onFinish} labelCol={{ span: 6 }} initialValues={initialValues}>
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
            required: true,
            validator: async (_, fileList?: UploadFile[]) => {
              if (!fileList?.length) throw new Error('请输入封面图')
            }
          }
        ]}
        getValueFromEvent={getValueFromEvent}
      >
        <Upload listType='picture-card' maxCount={1} customRequest={customRequest}>
          <PlusOutlined />
        </Upload>
      </Item>
    </Form>
  )
})

export default Tag
