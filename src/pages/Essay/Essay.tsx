// react
import { useEffect, useState } from 'react'
// router
import { useNavigate, useParams } from 'react-router-dom'
// antd
import { Button, Card, Input, Form, Upload, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useForm } from 'antd/lib/form/Form'
// third
import { useQuery } from '@apollo/client'
// project
import Editor from '~/components/Singleton/Essay/Editor'
import { create, getEssay, update } from '~/apis/essay'
import { TAGS } from '~/apis/tag'
import { customRequest, getUploadParam, getValueFromEvent } from '~/utils/upload'
import type { CreateEssayInput } from '~/typings/essay'
import type { FormValues } from '.'

const { Item } = Form

const Essay = () => {
  const [initialValues, setInitialValues] = useState<FormValues>()

  /** hooks */
  const urlParams = useParams()
  const navigate = useNavigate()
  const [form] = useForm<FormValues>()
  const { data } = useQuery(TAGS)

  useEffect(() => {
    urlParams.id &&
      getEssay(Number(urlParams.id)).then(({ data }) => {
        const essay = data?.essay

        if (!essay) {
          setInitialValues(undefined)
        } else {
          // 赋值
          setInitialValues({
            title: essay.title,
            content: essay.content,
            tagIds: essay.tagIds,
            fileList: getUploadParam({
              id: essay.id,
              name: essay.title,
              url: essay.cover
            })?.fileList
          })
        }

        // 重置表单
        form.resetFields()
      })
  }, [])

  /** 提交 */
  const onSubmit = async () => {
    const formValues = form.getFieldsValue()

    const params: CreateEssayInput = {
      content: formValues.content,
      tagIds: formValues.tagIds,
      title: formValues.title,
      cover: formValues.fileList?.at(0)?.response?.data || ''
    }

    const handlers = {
      create: () => create(params),
      update: () => urlParams.id && update(Number(urlParams.id), params)
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
          name='tagIds'
          labelCol={{ span: 2 }}
          rules={[
            {
              required: true
            }
          ]}
        >
          <Select
            mode='multiple'
            options={data?.tags.items?.map((tag) => ({
              value: tag.id,
              label: tag.name
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
