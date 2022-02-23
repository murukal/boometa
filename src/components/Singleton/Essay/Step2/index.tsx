import { forwardRef, useEffect, useMemo, useState } from 'react'
// antd
import type { FormInstance } from 'antd'
import type { RuleObject } from 'antd/lib/form'
import type { StoreValue } from 'antd/lib/form/interface'
import { Form, Input } from 'antd'
// third
import ReactMarkdown from 'react-markdown'
// project
import type { Props } from './assets'
import { useForm } from 'antd/lib/form/Form'

const { Item } = Form
const { TextArea } = Input

const Step2 = forwardRef<FormInstance, Props>((props, ref) => {
  const [form] = useForm()

  const initialValues = useMemo(() => {
    return {
      content: props.essay.content
    }
  }, [props.essay])

  useEffect(() => {
    form.setFieldsValue(initialValues)
    setModel(initialValues)
  }, [initialValues])

  const [model, setModel] = useState(initialValues)
  const [validateFailedMessage, setValidateFailedMessage] = useState<string>()

  /** 表单的修改事件 */
  const onFormChange = (changedValues: any, values: any) => {
    setModel(values)
  }

  /** md文本的校验 */
  const onContentValidate = async (rule: RuleObject, value: StoreValue) => {
    if (!value) {
      const message = '请输入正文'
      setValidateFailedMessage(message)
      throw new Error(message)
    }

    setValidateFailedMessage(undefined)
  }

  return (
    <div
      className='h-full flex py-5'
      style={{
        ...props.style
      }}
    >
      <Form ref={ref} form={form} className='w-1/2' initialValues={initialValues} labelCol={{ span: 24 }} onValuesChange={onFormChange}>
        <Item
          name='content'
          rules={[
            {
              required: true,
              validator: onContentValidate
            }
          ]}
          noStyle
        >
          <TextArea
            style={{
              height: '100%',
              resize: 'none',
              borderColor: validateFailedMessage ? '#ff4d4f' : undefined
            }}
          />
        </Item>

        {/* 校验信息 */}
        {validateFailedMessage && (
          <p
            className='relative'
            style={{
              color: '#ff4d4f'
            }}
          >
            {validateFailedMessage}
          </p>
        )}
      </Form>
      <ReactMarkdown className='w-1/2 ml-2 overflow-auto border border-solid border-slate-400'>{model.content}</ReactMarkdown>
    </div>
  )
})

export default Step2
