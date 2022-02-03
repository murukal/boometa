// react
import { useEffect, useMemo, forwardRef, useState } from 'react'
// antd
import type { FormInstance } from 'antd'
import type { UploadChangeParam } from 'antd/lib/upload'
import { Form, Input, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useForm } from 'antd/lib/form/Form'
// project
import type { Tag as TagType } from '../../../typings/tag'
import { responseNotification } from '../../../utils/notification'
import { create, update } from '../../../apis/tag'
import { SingletonProps } from '../assets'
import { getUploadParam } from '../../../utils/upload'

const { Item } = Form

const Tag = forwardRef<FormInstance, SingletonProps<TagType>>((props, ref) => {
  const [form] = useForm()

  const initialValues = useMemo((): {
    name: string
    uploadParam?: UploadChangeParam
  } => {
    return {
      name: props.singleton.name,
      uploadParam: getUploadParam({
        id: props.singleton._id,
        name: props.singleton.name,
        url: props.singleton.cover
      })
    }
  }, [props.singleton])

  const [model, setModel] = useState(initialValues)

  useEffect(() => {
    setModel(initialValues)
  }, [props.singleton])

  /** 表单提交事件 */
  const onSubmit = async () => {
    const params = {
      name: model.name,
      cover: model.uploadParam?.file.response.data
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

  /** 表单数据变更 */
  const onValuesChange = (changedValues: any, values: any) => {
    setModel(values)
  }

  return (
    <>
      <Form
        form={form}
        ref={ref}
        onFinish={onSubmit}
        labelCol={{ span: 6 }}
        initialValues={initialValues}
        onValuesChange={onValuesChange}
      >
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
          name='uploadParam'
          rules={[
            {
              required: true,
              validator: async (_, value?: UploadChangeParam) => {
                if (!value || value.fileList.length === 0) throw new Error('请输入封面图')
              }
            }
          ]}
        >
          <Upload
            listType='picture-card'
            action='http://admin.r2boom.com/api/object-storage/cos'
            fileList={model.uploadParam?.fileList}
            maxCount={1}
          >
            <PlusOutlined />
          </Upload>
        </Item>
      </Form>
    </>
  )
})

export default Tag
