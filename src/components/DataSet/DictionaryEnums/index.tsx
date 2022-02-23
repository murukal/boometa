// react
import { useEffect, useState } from 'react'
// antd
import { Table } from 'antd'
// project
import { getColumns, Props } from './assets'
import Singleton from '../../Singleton'
import DictionaryEnum from '../../Singleton/DictionaryEnum'
import { getDictionaryEnums, remove } from '../../../apis/dictionary-enum'
import { getTableRowHandler, useTable } from '../../../utils/table'
import { responseNotification } from '../../../utils/notification'
import Toolbar from '../../Toolbar'
import { getInitialSingleton } from '../../Singleton/DictionaryEnum/assets'
import type { DictionaryEnum as DictionaryEnumType } from '../../../typings/dictionary-enum'
import type { QueryOptions } from '../../../typings/api'

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
            onClick: onDelete(dictionaryEnum._id),
            popconfirmProps: {
              title: '确认删除当前条目？',
              okText: '确认',
              cancelText: '取消'
            }
          }
        ])
    }
  ])

  const {
    handlers: { onFetch, onTableChange },
    props: { results: dictionaryEnums, pagination, isLoading }
  } = useTable<DictionaryEnumType>((query: QueryOptions) =>
    getDictionaryEnums({
      belongTo: props.dictionaryId,
      ...query
    })
  )

  const onClose = () => {
    setIsOpened(false)
  }

  const onSubmitted = () => {
    onFetch()
    onClose()
  }

  const onOpen =
    (dictionaryEnum: DictionaryEnumType = getInitialSingleton()) =>
    () => {
      setDictionaryEnum(dictionaryEnum)
      setIsOpened(true)
    }

  const onDelete = (id: string) => async () => {
    const res = await remove(id)
    responseNotification(res)
    !res.code && onFetch()
  }

  useEffect(() => {
    onFetch()
  }, [props.dictionaryId])

  return (
    <>
      <Toolbar onAdd={onOpen()} />

      <Table
        rowKey='_id'
        bordered={true}
        dataSource={dictionaryEnums}
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
          dictionaryId: props.dictionaryId
        }}
        singleton={dictionaryEnum}
        onSubmitted={onSubmitted}
        singletonComponent={DictionaryEnum}
      />
    </>
  )
}

export default DictionaryEnums
