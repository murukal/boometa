// react
import { ChangeEvent, forwardRef, useEffect, useState } from 'react'
// antd
import { Form, FormInstance, Input } from 'antd'
// project
import { getInitialSingleton, Props } from './assets'
import { create, update } from '../../../apis/blog'
import { responseNotification } from '../../../utils/notification'

const { Item } = Form

const Blog = forwardRef<FormInstance, Props>((props, formRef) => {
  const [title, setTitle] = useState(getInitialSingleton().title)
  const [content, setContent] = useState(getInitialSingleton().content)

  useEffect(() => {
    setTitle(props.singleton.title)
    setContent(props.singleton.content)
  }, [props.singleton])

  const onSubmit = async () => {
    const params = {
      title,
      content
    }

    const handlerMap = {
      create: () => create(params),
      update: () => update(props.singleton._id, params)
    }

    const handler = handlerMap[props.singleton._id ? 'update' : 'create']
    const res = await handler()
    responseNotification(res)
    !res.code && props.onSubmitted && props.onSubmitted()
  }

  const onContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  return (
    <>
      <Form ref={formRef} onFinish={onSubmit} labelCol={{ span: 6 }}>
        <Item label='博客标题'>
          <Input value={title} onChange={onTitleChange} />
        </Item>

        <Item label='博客正文'>
          <Input value={content} onChange={onContentChange} />
        </Item>
      </Form>
    </>
  )
})

export default Blog
