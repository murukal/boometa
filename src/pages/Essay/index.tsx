// react
import { useEffect, useState } from 'react'
// router
import { useNavigate, useParams } from 'react-router-dom'
// antd
import { Button, Card, Input, Form, Upload, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useForm } from 'antd/lib/form/Form'
import type { DefaultOptionType } from 'antd/lib/select'
// project
import Editor from '../../components/Singleton/Essay/Editor'
import { create, getEssay, update } from '../../apis/essay'
import { getTags } from '../../apis/tag'
import { customRequest, getUploadParam, getValueFromEvent } from '../../utils/upload'
import type { CreateEssay } from '../../typings/essay'
import type { FormValues } from './assets'

const { Item } = Form

const Essay = () => {
  const [tagOptions, setTagOptions] = useState<DefaultOptionType[]>()
  const [initialValues, setInitialValues] = useState<FormValues>()

  const urlParams = useParams()
  const navigate = useNavigate()
  const [form] = useForm<FormValues>()

  const onFetch = async () => {
    // 标签选项
    setTagOptions(
      ((await getTags()).data?.docs || []).map((tag) => ({
        label: tag.name,
        value: tag.id
      }))
    )

    // 路由存在文章id，还需要查询文章信息
    // 如果不存在，不做处理
    if (!urlParams.id) return

    const essay = (await getEssay(urlParams.id)).data

    // 文章不存在，返回404
    if (!essay) {
      navigate('/404')
      return
    }

    // 赋值
    setInitialValues({
      title: essay.title,
      content: essay.content,
      tags: essay.tags as string[],
      fileList: getUploadParam({
        id: essay.id,
        name: essay.title,
        url: essay.cover
      })?.fileList
    })

    // 重置表单
    form.resetFields()
  }

  useEffect(() => {
    onFetch()
  }, [])

  /** 提交 */
  const onSubmit = async () => {
    const formValues = form.getFieldsValue()

    const params: CreateEssay = {
      content: formValues.content,
      tags: formValues.tags,
      title: formValues.title,
      cover: formValues.fileList?.at(0)?.response?.data || ''
    }

    const handlers = {
      create: () => create(params),
      update: () => urlParams.id && update(urlParams.id, params)
    }

    await handlers[urlParams.id ? 'update' : 'create']()
    // 路由跳转到文章列表
    navigate('/essays')
  }

  return (
    <Card>
      <Form form={form} onFinish={onSubmit} initialValues={initialValues}>
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

        <Item label='文章封面' name='fileList' labelCol={{ span: 2 }} valuePropName='fileList' getValueFromEvent={getValueFromEvent}>
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
          <Select mode='multiple' options={tagOptions} />
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
