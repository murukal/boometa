// react
import { ChangeEvent, forwardRef, useState, useEffect } from 'react'
// antd
import { Form, FormInstance, Input, InputNumber } from 'antd'
// project
import type { Dictionary as DictionaryType } from '../../../typings/dictionary'
import { create, update } from '../../../apis/dictionary'
import { responseNotification } from '../../../utils/notification'
import { getInitialSingleton } from './assets'
import { SingletonProps } from '../assets'

const { Item } = Form

const Dictionary = forwardRef<FormInstance, SingletonProps<DictionaryType>>((props, ref) => {
  const initialDictionary = getInitialSingleton()
  const [description, setDescription] = useState(initialDictionary.description)
  const [sortBy, setSortBy] = useState(initialDictionary.sortBy)
  const [code, setCode] = useState(initialDictionary.code)

  useEffect(() => {
    setDescription(props.singleton.description)
    setSortBy(props.singleton.sortBy)
    setCode(props.singleton.code)
  }, [props.singleton])

  const onCodeChange = (e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)

  const onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)

  const onSortByChange = (value: number) => setSortBy(value)

  const onSubmit = async () => {
    const params = {
      code,
      sortBy,
      description
    }

    const handlers = {
      create: () => create(params),
      update: () => update(props.singleton._id, params)
    }

    // 表单提交
    const handler = handlers[props.singleton._id ? 'update' : 'create']
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
        <InputNumber value={sortBy} onChange={onSortByChange} />
      </Item>
    </Form>
  )
})

export default Dictionary
