// react
import { useEffect, useState, createRef } from 'react'
// antd
import type { FormInstance } from 'antd'
import { Table, Drawer, Card } from 'antd'
// project
import type { Dictionary as DictionaryType } from '../../typings/dictionary'
import { getTableRowHandler, useTable } from '../../utils/table'
import { getColumns } from './assets'
import Toolbar from '../../components/Toolbar'
import Singleton from '../../components/Singleton'
import { responseNotification } from '../../utils/notification'
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
      render: () =>
        getTableRowHandler([
          {
            label: '修改',
            onClick: onOpen(dictionary)
          },
          {
            label: '枚举配置',
            onClick: onEnumOpen(dictionary._id)
          },
          {
            label: '删除',
            danger: true,
            onClick: onDelete(dictionary._id),
            popconfirmProps: {
              okText: '确认',
              cancelText: '取消',
              title: '确认删除当前条目？'
            }
          }
        ])
    }
  ])

  const ref = createRef<FormInstance>()
  const [isOpened, setIsOpened] = useState(false)
  const [dictionary, setDictionary] = useState<DictionaryType>(getInitialSingleton())

  const [dictionaryId, setDictionaryId] = useState('')
  const [isEnumOpened, setIsEnumOpened] = useState(false)

  const {
    handlers: { onFetch, onTableChange },
    props: { results: dictionaries, pagination, isLoading }
  } = useTable<DictionaryType>(getDictionaries)

  const onOpen =
    (dictionary: DictionaryType = getInitialSingleton()) =>
    () => {
      setDictionary(dictionary)
      setIsOpened(true)
    }

  const onClose = () => setIsOpened(false)

  const onSubmit = () => {
    ref.current?.submit()
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

  useEffect(() => {
    onFetch()
  }, [])

  return (
    <Card>
      <Toolbar onAdd={onOpen()} />

      <Table rowKey='_id' dataSource={dictionaries} columns={columns} bordered pagination={pagination} onChange={onTableChange} loading={isLoading} />

      {/* 字典的单例抽屉 */}
      <Singleton title='字典' isOpened={isOpened} onClose={onClose} onSubmit={onSubmit}>
        <Dictionary ref={ref} singleton={dictionary} onSubmitted={onSubmitted} />
      </Singleton>

      {/* 枚举的展现抽屉 */}
      <Drawer title='枚举配置' visible={isEnumOpened} onClose={onEnumClose} size='large' closable={false}>
        <DictionaryEnums dictionaryId={dictionaryId} />
      </Drawer>
    </Card>
  )
}

export default Dictionaries
