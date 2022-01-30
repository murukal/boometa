// antd
import { Input, Upload } from 'antd'
import { InboxOutlined, UserOutlined } from '@ant-design/icons'

const { Dragger } = Upload

const Step1 = () => {
  return (
    <>
      <Input size='large' placeholder='large size' prefix={<UserOutlined />} />
      <div>
        <Dragger action='http://admin.r2boom.com/upload'>
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>Click or drag file to this area to upload</p>
          <p className='ant-upload-hint'>Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
        </Dragger>
      </div>
    </>
  )
}

export default Step1
