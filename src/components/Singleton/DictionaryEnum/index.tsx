// react
import { ChangeEvent, forwardRef, useState } from 'react'
// antd
import { Form, FormInstance, Input, InputNumber } from 'antd'
// project
import { CreateDictionaryEnum, DictionaryEnum as DictionaryEnumType } from '../../../typings/dictionaryEnum'
import { create, update } from '../../../apis/dictionaryEnum'
import { responseNotification } from '../../../utils/notification'

interface Props {
  dictionaryId: string
  singleton?: DictionaryEnumType
  onSubmitted?: Function
}

const { Item } = Form

const DictionaryEnum = forwardRef<FormInstance, Props>((props, formRef) => {
  const [description, setDescription] = useState('')
  const [code, setCode] = useState('')
  const [sort, setSort] = useState(0)

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
      sort,
      belongTo: props.dictionaryId as string
    }

    const handlerMap = {
      create: () => create(params),
      update: () => update(props.singleton?._id as string, params)
    }

    const handler = handlerMap[props.singleton?._id ? 'update' : 'create']
    const res = await handler()
    responseNotification(res)
    !res.code && props.onSubmitted && props.onSubmitted()
  }

  return (
    <>
      <Form ref={formRef} onFinish={onSubmit}>
        <Item label='枚举描述'>
          <Input value={description} onChange={onDescriptionChange}></Input>
        </Item>

        <Item label='枚举code'>
          <Input value={code} onChange={onCodeChange}></Input>
        </Item>

        <Item label='排序码'>
          <InputNumber value={sort} onChange={setSort}></InputNumber>
        </Item>
      </Form>
    </>
  )
})

export default DictionaryEnum
