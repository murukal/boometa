// react
import { useEffect, useState, createRef } from 'react'
// antd
import { Button, Space, Table, Divider, Popconfirm } from 'antd'
import { FormInstance } from 'antd/lib/form/Form'
// project
import { getFetchHandler, getInitialPagination } from '../../utils/table'
import { getColumns, getDictionaryEnumColumns } from './assets'
import Toolbar from '../../components/Toolbar'
import Singleton from '../../components/Singleton'
import { responseNotification } from '../../utils/notification'

import { Dictionaries as DictionariesType, Dictionary as DictionaryType } from '../../typings/dictionary'
import Dictionary from '../../components/Singleton/Dictionary'
import { getDictionaries, remove } from '../../apis/dictionary'

import { DictionaryEnum as DictionaryEnumType } from '../../typings/dictionaryEnum'
import DictionaryEnum from '../../components/Singleton/DictionaryEnum'
import { remove as removeEnum } from '../../apis/dictionaryEnum'

const Dictionaries = () => {
  const columns = getColumns([
    {
      title: '操作',
      width: 100,
      align: 'center',
      render: (value, dictionary) => (
        <Space>
          <Button type='link' onClick={onOpen(dictionary)} size='small'>
            修改
          </Button>
          <Divider type='vertical' />
          <Button type='link' size='small' onClick={onOpen(dictionary)}>
            添加枚举
          </Button>
          <Divider type='vertical' />
          <Popconfirm title='确认删除当前条目？' okText='确认' cancelText='取消' onConfirm={onDelete(dictionary._id)}>
            <Button type='link' danger size='small'>
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ])

  const formRef = createRef<FormInstance>()
  const [isOpened, setIsOpened] = useState(false)
  const [dictionary, setDictionary] = useState<DictionaryType>()
  const [dictionaries, setDictionaries] = useState<DictionariesType>([])
  const [pagination, setPagination] = useState(getInitialPagination())

  const dictionaryEnumColumns = getDictionaryEnumColumns([
    {
      title: '操作',
      width: 100,
      align: 'center',
      render: (value, dictionaryEnum) => (
        <>
          <Space>
            <Button type='link' onClick={onEnumOpen(dictionaryEnum.belongTo, dictionaryEnum)} size='small'>
              修改
            </Button>
            <Divider type='vertical' />
            <Popconfirm title='确认删除当前条目？' okText='确认' cancelText='取消' onConfirm={onEnumDelete(dictionaryEnum._id)}>
              <Button type='link' danger size='small'>
                删除
              </Button>
            </Popconfirm>
          </Space>
        </>
      )
    }
  ])

  const formEnumRef = createRef<FormInstance>()
  const [isEnumOpened, setIsEnumOpened] = useState(false)
  const [dictionaryId, setDictionaryId] = useState('')
  const [dictionaryEnum, setDictionaryEnum] = useState<DictionaryEnumType>()

  const onFetch = getFetchHandler(getDictionaries, {
    setResults: setDictionaries,
    setPagination: setPagination
  })

  const onOpen = (dictionary?: DictionaryType) => () => {
    setDictionary(dictionary)
    setIsOpened(true)
  }

  const onClose = () => setIsOpened(false)

  const onSubmit = () => {
    formRef.current?.submit()
  }

  const onSubmitted = () => {
    onFetch()
    onClose()
  }

  const onDelete = (id: string) => async () => {
    const res = await remove(id)
    responseNotification(res)
    !res.code && onFetch()
  }

  const onEnumOpen = (id: string, dictionaryEnum: DictionaryEnumType) => () => {
    setDictionaryId(id)
    setDictionaryEnum(dictionaryEnum)
    setIsEnumOpened(true)
  }

  const onEnumClose = () => {
    setIsEnumOpened(false)
  }

  const onEnumSubmit = () => {
    formEnumRef.current?.submit()
  }

  const onEnumSubmitted = () => {}

  const expandedRowRender = (dictionary: DictionaryType) => {
    return <Table rowKey='_id' bordered={true} dataSource={dictionary.enums} columns={dictionaryEnumColumns} />
  }

  const onEnumDelete = (id: string) => async () => {
    const res = await removeEnum(id)
    responseNotification(res)
    !res.code &&
      onFetch({
        pagination
      })
  }

  useEffect(() => {
    onFetch()
  }, [])

  return (
    <>
      <Toolbar onAdd={onOpen()} />

      <Table rowKey='_id' dataSource={dictionaries} columns={columns} bordered pagination={pagination} expandable={{ expandedRowRender }} />

      {/* 字典的单例抽屉 */}
      <Singleton title='字典' isOpened={isOpened} onClose={onClose} onSubmit={onSubmit}>
        <Dictionary ref={formRef} singleton={dictionary} onSubmitted={onSubmitted} />
      </Singleton>

      {/* 枚举的单例抽屉 */}
      <Singleton title='枚举' isOpened={isEnumOpened} onClose={onEnumClose} onSubmit={onEnumSubmit}>
        <DictionaryEnum ref={formEnumRef} dictionaryId={dictionaryId} singleton={dictionaryEnum} onSubmitted={onEnumSubmitted} />
      </Singleton>
    </>
  )
}

export default Dictionaries
