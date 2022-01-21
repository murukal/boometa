// react
import { ChangeEvent, useEffect, useState } from 'react'
// router
import { useNavigate, useParams } from 'react-router-dom'
// antd
import { Button, Card, Form, Input } from 'antd'
// project
import { getInitialSingleton } from './assets'
import { create, getBlogById, update } from '../../apis/blog'
import { responseNotification } from '../../utils/notification'

const { Item } = Form

const Blog = () => {
  const [title, setTitle] = useState(getInitialSingleton().title)
  const [content, setContent] = useState(getInitialSingleton().content)
  const [id, setId] = useState(useParams().id || getInitialSingleton()._id)

  const navigate = useNavigate()

  const onFetch = async () => {
    if (!id) return
    const res = await getBlogById(id)

    setId(res.data?._id || getInitialSingleton()._id)
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
    !res.code && navigate('/blogs')
  }

  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  return (
    <Card>
      <Form onFinish={onSubmit} labelCol={{ span: 6 }}>
        <Item label='博客标题'>
          <Input value={title} onChange={onTitleChange} />
        </Item>

        <Item label='博客正文'>
          <Input.TextArea showCount maxLength={100} value={content} onChange={onContentChange} />
        </Item>

        <Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Item>
      </Form>
    </Card>
  )
}

export default Blog
