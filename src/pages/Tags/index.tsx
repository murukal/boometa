// react
import { useEffect, useState } from 'react'
// antd
import { Table } from 'antd'
// project
import type { Tag as TagType } from '../../typings/tag'
import { getTags, remove } from '../../apis/tag'
import { getTableRowHandler, useTable } from '../../utils/table'
import { getColumns } from './assets'
import { responseNotification } from '../../utils/notification'
import Singleton from '../../components/Singleton'
import Tag from '../../components/Singleton/Tag'
import { getInitialSingleton } from '../../components/Singleton/Tag/assets'
import Toolbar from '../../components/Toolbar'

const Tags = () => {
  const [isOpened, setIsOpened] = useState(false)
  const [tag, setTag] = useState<TagType>(getInitialSingleton())

  /** table hooks */
  const {
    handlers: { onFetch, onTableChange },
    props: { results: tags, pagination, isLoading }
  } = useTable<TagType>(getTags)

  /** table column */
  const columns = getColumns([
    {
      title: '操作',
      width: 100,
      align: 'center',
      render: (value, tag) =>
        getTableRowHandler([
          {
            label: '修改',
            onClick: onOpen(tag)
          },
          {
            label: '删除',
            danger: true,
            popconfirmProps: {
              title: '确认删除当前条目？',
              okText: '确认',
              cancelText: '取消'
            },
            onClick: onDelete(tag._id)
          }
        ])
    }
  ])

  /** 打开抽屉 */
  const onOpen =
    (tag = getInitialSingleton()) =>
    () => {
      setTag(tag)
      setIsOpened(true)
    }

  /** 关闭抽屉 */
  const onClose = () => {
    setIsOpened(false)
  }

  /** 删除tag */
  const onDelete = (id: string) => async () => {
    const res = await remove(id)
    responseNotification(res)
    !res.code && onFetch()
  }

  /** 表单提交后的回调 */
  const onSubmitted = () => {
    onFetch()
    setIsOpened(false)
  }

  /** 初次渲染 */
  useEffect(() => {
    onFetch()
  }, [])

  return (
    <>
      <Toolbar onAdd={onOpen()} />

      <Table
        rowKey='_id'
        columns={columns}
        dataSource={tags}
        bordered={true}
        pagination={pagination}
        onChange={onTableChange}
        loading={isLoading}
      />

      <Singleton
        title='标签'
        isOpened={isOpened}
        onClose={onClose}
        singleton={tag}
        singletonComponent={Tag}
        onSubmitted={onSubmitted}
      />
    </>
  )
}

export default Tags
