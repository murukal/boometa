// react
import { useState } from 'react'
// antd
import { Table } from 'antd'
// project
import Singleton from '../../Singleton'
import DictionaryEnum from '../../Singleton/DictionaryEnum'
import Toolbar from '../../Toolbar'
import { getColumns } from '.'
import { DICTIONARY_ENUMS, remove } from '../../../apis/dictionary-enum'
import { getTableRowHandler, onTableChange, useTableQuery } from '../../../utils/table'
import { getInitialSingleton } from '../../Singleton/DictionaryEnum'
import type { Props } from '.'
import type { DictionaryEnum as DictionaryEnumType } from '../../../typings/dictionary-enum'

const DictionaryEnums = (props: Props) => {
  const [isOpened, setIsOpened] = useState(false)
  const [dictionaryEnum, setDictionaryEnum] = useState<DictionaryEnumType>(getInitialSingleton())

  const columns = getColumns([
    {
      title: '操作',
      width: 100,
      align: 'center',
      render: (value, dictionaryEnum) =>
        getTableRowHandler([
          {
            label: '修改',
            onClick: onOpen(dictionaryEnum)
          },
          {
            label: '删除',
            danger: true,
            onClick: onDelete(dictionaryEnum.id),
            popconfirmProps: {
              title: '确认删除当前条目？',
              okText: '确认',
              cancelText: '取消'
            }
          }
        ])
    }
  ])

  const { data, isLoading, pagination, refetch } = useTableQuery(DICTIONARY_ENUMS)

  const onClose = () => {
    setIsOpened(false)
  }

  const onSubmitted = () => {
    refetch()
    onClose()
  }

  const onOpen =
    (dictionaryEnum: DictionaryEnumType = getInitialSingleton()) =>
    () => {
      setDictionaryEnum(dictionaryEnum)
      setIsOpened(true)
    }

  const onDelete = (id: number) => async () => {
    const res = await remove(id)
    res.data?.removeDictionaryEnum && refetch()
  }

  return (
    <>
      <Toolbar onAdd={onOpen()} />

      <Table
        rowKey='id'
        bordered={true}
        dataSource={data?.dictionaryEnums.items}
        columns={columns}
        pagination={pagination}
        onChange={onTableChange}
        loading={isLoading}
      />

      <Singleton
        title='字典'
        isOpened={isOpened}
        onClose={onClose}
        extraProps={{
          parentId: props.parentId
        }}
        singleton={dictionaryEnum}
        onSubmitted={onSubmitted}
        singletonComponent={DictionaryEnum}
      />
    </>
  )
}

export default DictionaryEnums
