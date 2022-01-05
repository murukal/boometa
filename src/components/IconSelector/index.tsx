// react
import { createElement } from 'react'
// antd
import { Select } from 'antd'
import * as Icons from '@ant-design/icons/lib/icons'

interface Props {
  value: string
  onChange?: (value: string) => void
}

const { Option } = Select

export const IconSelector = (props: Props) => {
  return (
    <Select value={props.value} onChange={props.onChange}>
      {Object.keys(Icons).map((key) => {
        return (
          <Option key={key} value={key}>
            <div className='flex items-center'>
              {createElement(Icons[key as keyof typeof Icons])}
              <p className='ml-1'>{key}</p>
            </div>
          </Option>
        )
      })}
    </Select>
  )
}

export default IconSelector
