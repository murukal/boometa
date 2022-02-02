// react
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
// router
import { useNavigate, useParams } from 'react-router-dom'
// antd
import type { Status } from 'rc-steps/lib/interface'
import { Button, Card, Form, Steps } from 'antd'
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons'
// project
import { getInitialSingleton } from './assets'
import { create, getBlogById, update } from '../../apis/blog'
import { responseNotification } from '../../utils/notification'
import Step1 from '../../components/Singleton/Blog/Step1'

const { Item } = Form
const { Step } = Steps

const Blog = () => {
  const [step, setStep] = useState(0)
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

    const handlers = {
      create: () => create(blog),
      update: () => update(id, blog)
    }

    const handler = handlers[id ? 'update' : 'create']
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

  /** 进入下一个步骤条 */
  const onNextStep = () => {
    setStep(step + 1)
  }

  return (
    <Card
      className='h-full'
      bodyStyle={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Steps current={step}>
        <Step title='博客摘要' icon={step === 0 ? <LoadingOutlined /> : <UserOutlined />} />
        <Step title='博客正文' icon={step === 1 ? <LoadingOutlined /> : <SolutionOutlined />} />
        <Step title='发布完成' icon={<SmileOutlined />} />
      </Steps>

      <div className='flex-1'>
        {step === 0 && <Step1 />}
        {step === 1 && <Step1 />}
        {step === 2 && <Step1 />}
      </div>

      <div className='flex justify-end'>
        <Button onClick={onNextStep}>下一步</Button>
      </div>

      {/* <Form onFinish={onSubmit} labelCol={{ span: 6 }}>
        <Item label='博客标题'>
          <Input value={title} onChange={onTitleChange} />
        </Item>

        <Item label='博客正文'>
          <Input.TextArea showCount value={content} onChange={onContentChange} />
        </Item>

        <Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Item>
      </Form> */}
    </Card>
  )
}

export default Blog
