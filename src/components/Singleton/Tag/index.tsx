// react
import { ChangeEvent, useEffect } from 'react'
import { forwardRef, useState } from 'react'
// antd
import type { FormInstance } from 'antd'
import type { UploadChangeParam } from 'antd/lib/upload'
import type { UploadFile } from 'antd/lib/upload/interface'
import { Form, Input, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
// project
import type { ApiResponse } from '../../../typings/api'
import { getInitialSingleton, Props } from './assets'
import { responseNotification } from '../../../utils/notification'
import { create, update } from '../../../apis/tag'

const { Item } = Form

const Tag = forwardRef<FormInstance, Props>((props, ref) => {
  const initialTag = getInitialSingleton()

  const [name, setName] = useState(initialTag.name)
  const [cover, setCover] = useState(initialTag.cover)
  const [fileList, setFileList] = useState<UploadFile[]>([])

  /** 监听传入对象的变更 */
  useEffect(() => {
    setName(props.singleton.name)
    setCover(props.singleton.cover)
    setFileList([
      {
        uid: props.singleton._id,
        name: props.singleton.name,
        url: props.singleton.cover
      }
    ])
  }, [props.singleton])

  /** 表单提交事件 */
  const onSubmit = async () => {
    const params = {
      name,
      cover
    }

    const handlers = {
      create: () => create(params),
      update: () => update(props.singleton._id, params)
    }

    const handler = handlers[props.singleton._id ? 'update' : 'create']
    const res = await handler()
    responseNotification(res)
  }

  /** 名称变更 */
  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)

  /** 封面变更 */
  const onCoverChange = (param: UploadChangeParam) => {
    setFileList(param.fileList)

    const res: ApiResponse | undefined = param.file.response

    res?.data && setCover(res.data)
    res?.code && responseNotification(res)
  }

  /** 删除封面 */
  const onCoverRemove = () => {
    setCover('')
  }

  return (
    <>
      <Form ref={ref} onFinish={onSubmit} labelCol={{ span: 6 }}>
        <Item
          label='角色名称'
          name='name'
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input value={name} onChange={onNameChange}></Input>
        </Item>

        <Item
          label='封面图'
          name='cover'
          rules={[
            {
              required: true
            }
          ]}
        >
          <Upload
            listType='picture-card'
            action='http://admin.r2boom.com/api/object-storage/cos'
            fileList={fileList}
            onChange={onCoverChange}
            maxCount={1}
            onRemove={onCoverRemove}
          >
            <PlusOutlined />
          </Upload>
        </Item>
      </Form>
    </>
  )
})

export default Tag
