// react
import { ChangeEvent } from 'react'
// antd
import { ProFormText } from '@ant-design/pro-form'
import { MobileOutlined } from '@ant-design/icons'

interface Props {
  value?: string
  onChange?: (value: string) => void
}

const PhoneFormItem = (props: Props) => {
  const onPhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange && props.onChange(e.target.value)
  }

  return (
    <ProFormText
      fieldProps={{
        size: 'large',
        prefix: <MobileOutlined />,
        value: props.value,
        onChange: onPhoneChange
      }}
      placeholder={'手机号'}
      rules={[
        {
          required: true,
          message: '请输入手机号！'
        },
        {
          pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
          message: '手机号格式错误！'
        }
      ]}
    />
  )
}

export default PhoneFormItem
