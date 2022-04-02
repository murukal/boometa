// react
import { useMemo, forwardRef } from 'react'
// antd
import { Form, Input, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useForm } from 'antd/lib/form/Form'
import type { FormInstance } from 'antd'
// project
import { create, update } from '~/apis/tag'
import { SingletonProps } from '..'
import { customRequest, getUploadParam, getValueFromEvent } from '~/utils/upload'
import type { Tag as TagType } from '~/typings/tag'
import type { FormValues } from '.'
import type { UploadFile } from 'antd/lib/upload/interface'

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

  /** 表单提交事件 */
  const onSubmit = async () => {
    const formValues = form.getFieldsValue()

    const params = {
      name: formValues.name,
      image: formValues.fileList.at(0)?.response
    }

    const handlers = {
      create: () => create(params),
      update: () => update(props.singleton.id, params)
    }

    const handler = handlers[props.singleton.id ? 'update' : 'create']
    const res = await handler()
    props.onSubmitted(res)
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
    </>
  )
})

export default Tag
