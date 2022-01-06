// react
import { useEffect, useState, createRef } from 'react'
// antd
import { Button, Space, Table, Divider, Popconfirm, Drawer } from 'antd'
import { FormInstance } from 'antd/lib/form/Form'
// project
import { getFetchHandler, getInitialPagination, getTableChangeHandler } from '../../utils/table'
import { getColumns } from './assets'
import Toolbar from '../../components/Toolbar'
import Singleton from '../../components/Singleton'
import { responseNotification } from '../../utils/notification'
import { Dictionaries as DictionariesType, Dictionary as DictionaryType } from '../../typings/dictionary'
import Dictionary from '../../components/Singleton/Dictionary'
import { getDictionaries, remove } from '../../apis/dictionary'
import DictionaryEnums from '../../components/DataSet/DictionaryEnums'
import { getInitialSingleton } from '../../components/Singleton/Dictionary/assets'

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
          <Button type='link' size='small' onClick={onEnumOpen(dictionary._id)}>
            枚举配置
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
  const [dictionary, setDictionary] = useState<DictionaryType>(getInitialSingleton())
  const [dictionaries, setDictionaries] = useState<DictionariesType>([])
  const [pagination, setPagination] = useState(getInitialPagination())

  const [dictionaryId, setDictionaryId] = useState('')
  const [isEnumOpened, setIsEnumOpened] = useState(false)

  const onFetch = getFetchHandler(getDictionaries, {
    setResults: setDictionaries,
    setPagination: setPagination
  })

  const onOpen =
    (dictionary: DictionaryType = getInitialSingleton()) =>
    () => {
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

  const onEnumOpen = (id: string) => () => {
    setDictionaryId(id)
    setIsEnumOpened(true)
  }

  const onEnumClose = () => {
    setIsEnumOpened(false)
  }

  const onTableChange = getTableChangeHandler(onFetch)

  useEffect(() => {
    onFetch()
  }, [])

  return (
    <>
      <Toolbar onAdd={onOpen()} />

      <Table rowKey='_id' dataSource={dictionaries} columns={columns} bordered pagination={pagination} onChange={onTableChange} />

      {/* 字典的单例抽屉 */}
      <Singleton title='字典' isOpened={isOpened} onClose={onClose} onSubmit={onSubmit}>
        <Dictionary ref={formRef} singleton={dictionary} onSubmitted={onSubmitted} />
      </Singleton>

      {/* 枚举的展现抽屉 */}
      <Drawer title='枚举配置' visible={isEnumOpened} onClose={onEnumClose} size='large' closable={false}>
        <DictionaryEnums dictionaryId={dictionaryId} />
      </Drawer>
    </>
  )
}

export default Dictionaries
