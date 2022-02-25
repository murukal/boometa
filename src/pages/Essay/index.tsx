// react
import { createRef, useEffect, useState } from 'react'
// router
import { useParams } from 'react-router-dom'
// antd
import { Button, Card, Steps, Result, Space, Input } from 'antd'
import { UserOutlined, SolutionOutlined, SmileOutlined } from '@ant-design/icons'
import type { FormInstance } from 'antd'
// project
import { getInitialSingleton } from './assets'
import { create, getEssay, update } from '../../apis/essay'
import Step1 from '../../components/Singleton/Essay/Step1'
import { getTags } from '../../apis/tag'
import Step2 from '../../components/Singleton/Essay/Step2'
import { responseNotification } from '../../utils/notification'
import type { Tag } from '../../typings/tag'
import type { Essay as EssayType } from '../../typings/essay'

const { Step } = Steps

const Essay = () => {
  const [step, setStep] = useState(1)
  const [tags, setTags] = useState<Tag[]>([])
  const [essay, setEssay] = useState<EssayType>(getInitialSingleton())

  const urlParams = useParams()
  const refs = [createRef<FormInstance>(), createRef<FormInstance>()]

  const onFetch = async () => {
    if (urlParams.id) {
      const res = await getEssay(urlParams.id)
      setEssay(res.data || getInitialSingleton())
    }

    // 获取标签
    setTags((await getTags()).data?.docs || [])
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

    if (step >= 1) {
      // 提交
      const res = await onSubmit()
      if (!res) return
    }

    setStep(step + 1)
  }

  /** 提交 */
  const onSubmit = async () => {
    const form1 = refs[0].current?.getFieldsValue()
    const form2 = refs[1].current?.getFieldsValue()

    const params = {
      title: form1.title,
      tags: form1.tags,
      cover: form1.fileList && form1.fileList[0]?.response.data,
      content: form2.content
    }

    const handlers = {
      create: () => create(params),
      update: () => update(essay._id, params)
    }

    const handler = handlers[essay._id ? 'update' : 'create']
    const res = await handler()
    res.code && responseNotification(res)
    return !res.code
  }

  /** 退回上一步 */
  const onPrevStep = () => {
    setStep(step - 1)
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
      <Input size='large' placeholder='请输入标题' />

      <div className='flex-1 h-0'>
        <Step1
          style={{
            display: step === 0 ? undefined : 'none'
          }}
          ref={refs[0]}
          essay={essay}
          tags={tags}
        />
        <Step2
          style={{
            display: step === 1 ? undefined : 'none'
          }}
          ref={refs[1]}
          essay={essay}
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
            <Button type='primary' onClick={onNextStep}>
              {step >= 1 ? '提交' : '下一步'}
            </Button>
          </Space>
        </div>
      )}
    </Card>
  )
}

export default Essay
