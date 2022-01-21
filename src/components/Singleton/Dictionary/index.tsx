// react
import { ChangeEvent, forwardRef, useState, useEffect } from 'react'
// antd
import { Form, FormInstance, Input, InputNumber } from 'antd'
// project
import { create, update } from '../../../apis/dictionary'
import { responseNotification } from '../../../utils/notification'
import { getInitialSingleton, Props } from './assets'

const { Item } = Form

const Dictionary = forwardRef<FormInstance, Props>((props, ref) => {
  const singleton = getInitialSingleton()
  const [description, setDescription] = useState(singleton.description)
  const [sort, setSort] = useState(singleton.sort)
  const [code, setCode] = useState(singleton.code)

  useEffect(() => {
    setDescription(props.singleton.description)
    setSort(props.singleton.sort)
    setCode(props.singleton.code)
  }, [props.singleton])

  const onCodeChange = (e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)

  const onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)

  const onSortChange = (value: number) => setSort(value)

  const onSubmit = async () => {
    const params = {
      code,
      sort,
      description
    }

    const handlerMap = {
      create: () => create(params),
      update: () => update(props.singleton._id as string, params)
    }

    // 表单提交
    const handler = handlerMap[props.singleton._id ? 'update' : 'create']
    const res = await handler()
    responseNotification(res)
    !res.code && props.onSubmitted && props.onSubmitted()
  }

  return (
    <Form ref={ref} onFinish={onSubmit} labelCol={{ span: 6 }}>
      <Item label='字典Code'>
        <Input value={code} onChange={onCodeChange} />
      </Item>

      <Item label='字典描述'>
        <Input value={description} onChange={onDescriptionChange} />
      </Item>

      <Item label='排序码'>
        <InputNumber value={sort} onChange={onSortChange} />
      </Item>
    </Form>
  )
})

export default Dictionary
