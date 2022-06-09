import { Form, FormInstance, Input, Select, Upload } from 'antd'
import { forwardRef, useMemo } from 'react'
import { SingletonProps } from '../..'
import { Navigation as NavigationType } from '~/typings/boomart/navigation'
import { useForm } from 'antd/lib/form/Form'
import { FormValues } from '.'
import { customRequest, getUploadParam, getValueFromEvent } from '~/utils/upload'
import { PlusOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import { TAGS } from '~/apis/boomart/tag'
import { AppID } from '~/assets'
import { create, update } from '~/apis/boomart/navigation'
import { resultNotification } from '~/utils/notification'

const Navigation = forwardRef<FormInstance, SingletonProps<NavigationType>>((props, ref) => {
  const [form] = useForm<FormValues>()

  /**
   * 初始表单信息
   */
  const initialValues = useMemo<FormValues>(() => {
    return {
      title: props.singleton.title,
      fileList:
        getUploadParam({
          id: props.singleton.id,
          name: props.singleton.title,
          url: props.singleton.cover
        })?.fileList || [],
      tagIds: props.singleton.tags?.map((tag) => tag.id)
    }
  }, [props.singleton])

  /**
   * 标签列表
   */
  const { data: tags, loading: isTagsLoading } = useQuery(TAGS, {
    context: {
      appId: AppID.Boomart
    }
  })

  /**
   * 表单提交
   */
  const onFinish = async (values: FormValues) => {
    // 生成需要的提交数据
    const navigationInput = {
      title: values.title,
      tagIds: values.tagIds || [],
      cover: values.fileList.at(0)?.response || values.fileList.at(0)?.thumbUrl || ''
    }

    const handlers = {
      create: () => create(navigationInput),
      update: () => update(props.singleton.id, navigationInput)
    }

    const result = await handlers[props.singleton.id ? 'update' : 'create']()
    resultNotification(result)
    result.data && props.onSubmitted(result)
  }

  /**
   * UI
   */
  return (
    <Form form={form} initialValues={initialValues} ref={ref} labelCol={{ span: 6 }} onFinish={onFinish}>
      <Form.Item
        label='导航标题'
        name='title'
        rules={[
          {
            required: true
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='导航标签'
        name='tagIds'
        rules={[
          {
            required: true
          }
        ]}
      >
        <Select
          mode='multiple'
          loading={isTagsLoading}
          options={tags?.tags.items?.map((tag) => ({
            value: tag.id,
            label: tag.name
          }))}
        />
      </Form.Item>

      <Form.Item label='导航封面' name='fileList' valuePropName='fileList' getValueFromEvent={getValueFromEvent}>
        <Upload listType='picture-card' maxCount={1} customRequest={customRequest}>
          <PlusOutlined />
        </Upload>
      </Form.Item>
    </Form>
  )
})

export default Navigation
