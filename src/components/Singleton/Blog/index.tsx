// react
import { ChangeEvent, useEffect, useState } from 'react'
// antd
import { Button, Form, Input, Space } from 'antd'
// project
import { getInitialSingleton } from './assets'
import { create, getBlogById, update } from '../../../apis/blog'
import { responseNotification } from '../../../utils/notification'
import { useParams } from 'react-router-dom'

const { Item } = Form

const Blog = () => {
  const [title, setTitle] = useState(getInitialSingleton().title)
  const [content, setContent] = useState(getInitialSingleton().content)
  const [id, setId] = useState(useParams().id || '')

  console.log(id)

  const onFetch = async () => {
    if (!id) return
    const res = await getBlogById(id)

    !res.data || setId('')
    setTitle(res.data?.title || getInitialSingleton().title)
    setContent(res.data?.content || getInitialSingleton().content)
  }

  useEffect(() => {
    onFetch()
  }, [])

  const onSubmit = async () => {
    const blog = {
      title,
      content
    }

    const handlerMap = {
      create: () => create(blog),
      update: () => update(id, blog)
    }

    const handler = handlerMap[id ? 'update' : 'create']
    const res = await handler()
    responseNotification(res)
  }

  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  return (
    <>
      <Form onFinish={onSubmit} labelCol={{ span: 6 }}>
        <Item label='博客标题'>
          <Input value={title} onChange={onTitleChange} />
        </Item>

        <Item label='博客正文'>
          <Input.TextArea showCount maxLength={100} value={content} onChange={onContentChange} />
        </Item>

        <Item>
          <Space>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
            <Button htmlType='submit'>Fill</Button>
          </Space>
        </Item>
      </Form>
    </>
  )
}

export default Blog
