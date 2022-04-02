// react
import { useState } from 'react'
// antd
import { Table, Drawer, Card } from 'antd'
// project
import Toolbar from '~/components/Toolbar'
import Singleton from '~/components/Singleton'
import Dictionary from '~/components/Singleton/Dictionary'
import DictionaryEnums from '~/components/DataSet/DictionaryEnums'
import { getTableRowHandler, useTableQuery } from '~/utils/table'
import { getColumns } from '.'
import { DICTIONARIES, remove } from '~/apis/dictionary'
import { getInitialSingleton } from '~/components/Singleton/Dictionary'
import type { Dictionary as DictionaryType } from '~/typings/dictionary'

const Dictionaries = () => {
  const columns = getColumns([
    {
      title: '操作',
      width: 100,
      align: 'center',
      render: (value, dictionary) =>
        getTableRowHandler([
          {
            label: '修改',
            onClick: onOpen(dictionary)
          },
          {
            label: '枚举配置',
            onClick: onEnumOpen(dictionary.id)
          },
          {
            label: '删除',
            danger: true,
            onClick: onDelete(dictionary.id),
            popconfirmProps: {
              okText: '确认',
              cancelText: '取消',
              title: '确认删除当前条目？'
            }
          }
        ])
    }
  ])

  const [isOpened, setIsOpened] = useState(false)
  const [dictionary, setDictionary] = useState<DictionaryType>(getInitialSingleton())

  const [dictionaryId, setDictionaryId] = useState(0)
  const [isEnumOpened, setIsEnumOpened] = useState(false)

  /** hooks */
  const { data, pagination, isLoading, refetch, onTableChange } = useTableQuery(DICTIONARIES)

  const onOpen =
    (dictionary: DictionaryType = getInitialSingleton()) =>
    () => {
      setDictionary(dictionary)
      setIsOpened(true)
    }

  const onClose = () => setIsOpened(false)

  /** 提交后的回调事件 */
  const onSubmitted = () => {
    refetch()
    onClose()
  }

  const onDelete = (id: number) => async () => {
    const res = await remove(id)
    res.data?.removeDictionary && refetch()
  }

  const onEnumOpen = (id: number) => () => {
    setDictionaryId(id)
    setIsEnumOpened(true)
  }

  const onEnumClose = () => {
    setIsEnumOpened(false)
  }

  return (
    <Card>
      <Toolbar onAdd={onOpen()} />

      <Table
        rowKey='id'
        dataSource={data?.dictionaries.items}
        columns={columns}
        bordered
        pagination={pagination}
        onChange={onTableChange}
        loading={isLoading}
      />

      {/* 字典的单例抽屉 */}
      <Singleton
        title='字典'
        isOpened={isOpened}
        onClose={onClose}
        singleton={dictionary}
        onSubmitted={onSubmitted}
        singletonComponent={Dictionary}
      />

      {/* 枚举的展现抽屉 */}
      <Drawer title='枚举配置' visible={isEnumOpened} onClose={onEnumClose} size='large' closable={false}>
        <DictionaryEnums parentId={dictionaryId} />
      </Drawer>
    </Card>
  )
}

export default Dictionaries
