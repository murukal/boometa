// react
import { createRef, useEffect, useState } from 'react'
// antd
import type { FormInstance } from 'antd'
import { Table } from 'antd'
// project
import type { DictionaryEnum as DictionaryEnumType } from '../../../typings/dictionaryEnum'
import { getColumns, Props } from './assets'
import Singleton from '../../Singleton'
import DictionaryEnum from '../../Singleton/DictionaryEnum'
import { getDictionaryEnums, remove } from '../../../apis/dictionaryEnum'
import { getTableRowHandler, useTable } from '../../../utils/table'
import { responseNotification } from '../../../utils/notification'
import Toolbar from '../../Toolbar'
import { getInitialSingleton } from '../../Singleton/DictionaryEnum/assets'
import { QueryOptions } from '../../../typings/api'

const DictionaryEnums = (props: Props) => {
  const ref = createRef<FormInstance>()
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

  const onSubmit = () => {
    ref.current?.submit()
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

      <Table rowKey='_id' bordered={true} dataSource={dictionaryEnums} columns={columns} pagination={pagination} onChange={onTableChange} loading={isLoading} />

      <Singleton title='字典' isOpened={isOpened} onClose={onClose} onSubmit={onSubmit}>
        <DictionaryEnum ref={ref} dictionaryId={props.dictionaryId} singleton={dictionaryEnum} onSubmitted={onSubmitted} />
      </Singleton>
    </>
  )
}

export default DictionaryEnums
