// react
import { useEffect, useState } from 'react'
// router
import { useNavigate, useParams } from 'react-router-dom'
// antd
import { Button, Card, Input, Form, Upload, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useForm } from 'antd/lib/form/Form'
// project
import { getInitialModel } from './assets'
import { create, getEssay, update } from '../../apis/essay'
import { getTags } from '../../apis/tag'
import Editor from '../../components/Singleton/Essay/Editor'
import { customRequest, getValueFromEvent } from '../../utils/upload'
import type { Tag } from '../../typings/tag'
import type { Model, UploadFile } from './assets'
import { CreateEssay } from '../../typings/essay'
import { responseNotification } from '../../utils/notification'

const { Item } = Form

const Essay = () => {
  const [tags, setTags] = useState<Tag[]>([])
  const [model, setModel] = useState<Model>(getInitialModel())

  const urlParams = useParams()
  const navigate = useNavigate()
  const [form] = useForm()

  const onFetch = async () => {
    // 路由中存在文章id，查询文章
    if (urlParams.id) {
      const essay = (await getEssay(urlParams.id)).data

      // 文章不存在，返回404
      if (!essay) {
        navigate('/404')
        return
      }

      // 文件列表
      const fileList: UploadFile[] = essay.cover
        ? [
            {
              name: essay.title,
              uid: essay._id,
              thumbUrl: essay.cover
            }
          ]
        : []

      // 赋值
      setModel({
        title: essay.title,
        content: essay.content,
        tags: essay.tags as string[],
        fileList
      })

      form.setFieldsValue({
        title: essay.title,
        content: essay.content,
        tags: essay.tags as string[],
        fileList
      })
    }

    // 获取标签
    setTags((await getTags()).data?.docs || [])
  }

  useEffect(() => {
    onFetch()
  }, [])

  /** 提交 */
  const onSubmit = async () => {
    const params: CreateEssay = {
      content: model.content,
      tags: model.tags,
      title: model.title,
      cover: model.fileList.at(0)?.response?.data || ''
    }

    const handlers = {
      create: () => create(params),
      update: () => urlParams.id && update(urlParams.id, params)
    }

    const res = await handlers[urlParams.id ? 'update' : 'create']()

    // 路由跳转到文章列表
    navigate('/essays')
    // 消息提醒
    res && responseNotification(res)
  }

  /** 表单变更 */
  const onFormChange = (changedValues: any, values: any) => {
    setModel(values)
  }

  return (
    <Card>
      <Form form={form} onFinish={onSubmit} onValuesChange={onFormChange} initialValues={model}>
        <Item
          label='文章标题'
          labelCol={{ span: 2 }}
          name='title'
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input size='large' placeholder='请输入标题' />
        </Item>

        <Item
          label='文章封面'
          name='fileList'
          labelCol={{ span: 2 }}
          valuePropName='fileList'
          getValueFromEvent={getValueFromEvent}
        >
          <Upload listType='picture-card' customRequest={customRequest}>
            <PlusOutlined />
          </Upload>
        </Item>

        <Item
          label='文章标签'
          name='tags'
          labelCol={{ span: 2 }}
          rules={[
            {
              required: true
            }
          ]}
        >
          <Select
            mode='multiple'
            options={tags.map((tag) => ({
              label: tag.name,
              value: tag._id
            }))}
          />
        </Item>

        <Item
          name='content'
          rules={[
            {
              required: true,
              message: '请输入文章正文'
            }
          ]}
        >
          <Editor height={700} />
        </Item>

        <Item>
          <Button type='primary' htmlType='submit'>
            提交
          </Button>
        </Item>
      </Form>
    </Card>
  )
}

export default Essay
