// react
import { createRef, useEffect, useState } from 'react'
// router
import { useParams } from 'react-router-dom'
// antd
import { Button, Card, Steps, Result, Space } from 'antd'
import { UserOutlined, SolutionOutlined, SmileOutlined } from '@ant-design/icons'
import type { FormInstance } from 'antd'
// project
import { getInitialSingleton } from './assets'
import { getBlogById } from '../../apis/blog'
import Step1 from '../../components/Singleton/Blog/Step1'
import { getTags } from '../../apis/tag'
import Step2 from '../../components/Singleton/Blog/Step2'
import type { Tag } from '../../typings/tag'
import type { Blog as BlogType } from '../../typings/blog'
import type { Model as Step1Model } from '../../components/Singleton/Blog/Step1/assets'
import type { Model as Step2Model } from '../../components/Singleton/Blog/Step2/assets'

const { Step } = Steps

const Blog = () => {
  const [step, setStep] = useState(0)
  const [tags, setTags] = useState<Tag[]>([])
  const [blog, setBlog] = useState<BlogType>(getInitialSingleton())

  // 步骤1model
  const [step1Model, setStep1Model] = useState<Step1Model>()
  // 步骤2model
  const [step2Model, setStep2Model] = useState<Step2Model>()

  const urlParams = useParams()
  const refs = [createRef<FormInstance>(), createRef<FormInstance>()]

  const onFetch = async () => {
    if (urlParams.id) {
      const res = await getBlogById(urlParams.id)
      setBlog(res.data || getInitialSingleton())
    }

    // 获取标签
    const tagsRes = await getTags({
      pagination: {
        pagination: false
      }
    })
    setTags(tagsRes.data?.docs || [])
  }

  useEffect(() => {
    onFetch()
  }, [])

  /** 进入下一个步骤条 */
  const onNextStep = async () => {
    const ref = refs[step]

    // 仅当表单对象存在时发起校验
    if (ref.current) {
      const res = await ref.current?.validateFields().catch(() => false)
      if (!res) return
    }

    setStep(step + 1)
  }

  /** 退回上一步 */
  const onPrevStep = () => {
    setStep(step - 1)
  }

  /** 表单发生变更 */
  const onFormChange = (changedValues: any, values: any) => {
    switch (step) {
      case 0:
        setStep1Model(values)
        break
      case 1:
        setStep2Model(values)
        break
    }
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
        <Step title='博客摘要' icon={<UserOutlined />} />
        <Step title='博客正文' icon={<SolutionOutlined />} />
        <Step title='发布完成' icon={<SmileOutlined />} />
      </Steps>

      <div className='flex-1 h-0'>
        <Step1
          style={{
            display: step === 0 ? undefined : 'none'
          }}
          ref={refs[0]}
          blog={blog}
          tags={tags}
          model={step1Model}
          onFormChange={onFormChange}
        />
        <Step2
          style={{
            display: step === 1 ? undefined : 'none'
          }}
          ref={refs[1]}
          blog={blog}
          model={step2Model}
          onFormChange={onFormChange}
        />
        <Result
          style={{
            display: step === 2 ? undefined : 'none'
          }}
          status='success'
          title='Successfully Purchased Cloud Server ECS!'
          subTitle='Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.'
          extra={[
            <Button type='primary' key='console'>
              Go Console
            </Button>,
            <Button key='buy'>Buy Again</Button>
          ]}
        />
      </div>

      {step < 2 && (
        <div className='flex justify-end'>
          <Space>
            {step > 0 && <Button onClick={onPrevStep}>上一步</Button>}
            <Button onClick={onNextStep}>下一步</Button>
          </Space>
        </div>
      )}
    </Card>
  )
}

export default Blog
