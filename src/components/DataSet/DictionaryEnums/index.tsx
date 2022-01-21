// react
import { createRef, useCallback, useEffect, useState } from 'react'
// antd
import { Button, Divider, FormInstance, Popconfirm, Space, Table } from 'antd'
// project
import { DictionaryEnum as DictionaryEnumType } from '../../../typings/dictionaryEnum'
import { getColumns, Props } from './assets'
import Singleton from '../../Singleton'
import DictionaryEnum from '../../Singleton/DictionaryEnum'
import { getDictionaryEnums, remove } from '../../../apis/dictionaryEnum'
import { getFetchHandler, getInitialPagination } from '../../../utils/table'
import { responseNotification } from '../../../utils/notification'
import Toolbar from '../../Toolbar'
import { getInitialSingleton } from '../../Singleton/DictionaryEnum/assets'

const DictionaryEnums = (props: Props) => {
  const ref = createRef<FormInstance>()
  const [isOpened, setIsOpened] = useState(false)
  const [dictionaryEnums, setDictionaryEnums] = useState<DictionaryEnumType[]>([])
  const [dictionaryEnum, setDictionaryEnum] = useState<DictionaryEnumType>(getInitialSingleton())
  const [pagination, setPagination] = useState(getInitialPagination())

  const columns = getColumns([
    {
      title: '操作',
      width: 100,
      align: 'center',
      render: (value, dictionaryEnum) => (
        <>
          <Space>
            <Button type='link' onClick={onOpen(dictionaryEnum)} size='small'>
              修改
            </Button>
            <Divider type='vertical' />
            <Popconfirm title='确认删除当前条目？' okText='确认' cancelText='取消' onConfirm={onDelete(dictionaryEnum._id)}>
              <Button type='link' danger size='small'>
                删除
              </Button>
            </Popconfirm>
          </Space>
        </>
      )
    }
  ])

  const onFetch = useCallback(
    (currentPagination = pagination) => {
      const handler = getFetchHandler(getDictionaryEnums, {
        setResults: setDictionaryEnums,
        setPagination
      })

      handler({
        pagination: currentPagination,
        filters: {
          belongTo: props.dictionaryId
        }
      })
    },
    [pagination, props.dictionaryId]
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

      <Table rowKey='_id' bordered={true} dataSource={dictionaryEnums} columns={columns} pagination={pagination} />

      <Singleton title='字典' isOpened={isOpened} onClose={onClose} onSubmit={onSubmit}>
        <DictionaryEnum ref={ref} dictionaryId={props.dictionaryId} singleton={dictionaryEnum} onSubmitted={onSubmitted} />
      </Singleton>
    </>
  )
}

export default DictionaryEnums
