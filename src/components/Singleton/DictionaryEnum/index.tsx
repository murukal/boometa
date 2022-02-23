// react
import type { ChangeEvent } from 'react'
import { forwardRef, useEffect, useState } from 'react'
// antd
import { Form, FormInstance, Input, InputNumber } from 'antd'
// project
import type { ExtraProps } from './assets'
import { CreateDictionaryEnum, DictionaryEnum as DictionaryEnumType } from '../../../typings/dictionary-enum'
import { create, update } from '../../../apis/dictionary-enum'
import { responseNotification } from '../../../utils/notification'
import { getInitialSingleton } from './assets'
import { SingletonProps } from '../assets'

const { Item } = Form

const DictionaryEnum = forwardRef<FormInstance, SingletonProps<DictionaryEnumType, ExtraProps>>((props, ref) => {
  const initialDictionaryEnum = getInitialSingleton()
  const [description, setDescription] = useState(initialDictionaryEnum.description)
  const [code, setCode] = useState(initialDictionaryEnum.code)
  const [sortBy, setSortBy] = useState(initialDictionaryEnum.sortBy)

  useEffect(() => {
    setDescription(props.singleton.description)
    setCode(props.singleton.code)
    setSortBy(props.singleton.sortBy)
  }, [props.singleton])

  const onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  const onCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }

  const onSubmit = async () => {
    const params: CreateDictionaryEnum = {
      description,
      code,
      sortBy,
      belongTo: props.extraProps.dictionaryId
    }

    const handlers = {
      create: () => create(params),
      update: () => update(props.singleton._id, params)
    }

    const handler = handlers[props.singleton._id ? 'update' : 'create']
    const res = await handler()
    responseNotification(res)
    !res.code && props.onSubmitted && props.onSubmitted()
  }

  return (
    <>
      <Form ref={ref} onFinish={onSubmit} labelCol={{ span: 6 }}>
        <Item label='枚举描述'>
          <Input value={description} onChange={onDescriptionChange} />
        </Item>

        <Item label='枚举code'>
          <Input value={code} onChange={onCodeChange} />
        </Item>

        <Item label='排序码'>
          <InputNumber value={sortBy} onChange={setSortBy} />
        </Item>
      </Form>
    </>
  )
})

export default DictionaryEnum
