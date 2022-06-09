import { Form, FormInstance } from 'antd'
import { forwardRef, useMemo } from 'react'
import { SingletonProps } from '../..'
import { Navigation as NavigationType } from '~/typings/boomart/navigation'
import { useForm } from 'antd/lib/form/Form'
import { FormValues } from '.'
import { getUploadParam } from '~/utils/upload'

const Navigation = forwardRef<FormInstance, SingletonProps<NavigationType>>((props, ref) => {
  const [form] = useForm<FormValues>()

  const initialValues = useMemo<FormValues>(() => {
    return {
      title: props.singleton.title,
      fileList:
        getUploadParam({
          id: props.singleton.id,
          name: props.singleton.title,
          url: props.singleton.cover
        })?.fileList || [],
      tagIds: props.singleton.tags?.map((tag) => tag.id) || []
    }
  }, [props.singleton])

  return (
    <Form form={form} initialValues={initialValues}>
      <Form.Item></Form.Item>
    </Form>
  )
})

export default Navigation
