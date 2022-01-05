// react
import { ChangeEvent, forwardRef } from 'react'
// antd
import { Form, FormInstance, Input, InputNumber } from 'antd'
import { useState } from 'react'
import { Dictionary as DictionaryType } from '../../../typings/dictionary'
import { create, update } from '../../../apis/dictionary'
import { responseNotification } from '../../../utils/notification'
import { useEffect } from 'react'

interface Props {
  singleton?: DictionaryType
  onSubmitted?: Function
}

const { Item } = Form

const Dictionary = forwardRef<FormInstance, Props>((props, formRef) => {
  const [description, setDescription] = useState('')
  const [sort, setSort] = useState(0)

  useEffect(() => {
    setDescription(props.singleton?.description || '')
    setSort(props.singleton?.sort || 0)
  }, [props.singleton])

  const onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)

  const onSortChange = (value: number) => setSort(value)

  const onSubmit = async () => {
    const params = {
      sort,
      description
    }

    const handlerMap = {
      create: () => create(params),
      update: () => update(props.singleton?._id as string, params)
    }

    // 表单提交
    const handler = handlerMap[props.singleton?._id ? 'update' : 'create']
    const res = await handler()
    responseNotification(res)
    !res.code && props.onSubmitted && props.onSubmitted()
  }

  return (
    <Form ref={formRef} onFinish={onSubmit}>
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
