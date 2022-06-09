// react
import { useState } from 'react'
// antd
import { Table } from 'antd'
// project
import { AppID } from '~/assets'
import Toolbar from '~/components/Toolbar'
import Singleton from '~/components/Singleton'
import Tag from '~/components/Singleton/Tag'
import { remove, TAGS } from '~/apis/boomart/tag'
import { getTableRowHandler, useTableQuery } from '~/utils/table'
import { getColumns } from '.'
import { getInitialSingleton } from '~/components/Singleton/Tag'
import type { Tag as TagType } from '~/typings/boomart/tag'

const Tags = () => {
  const [isOpened, setIsOpened] = useState(false)
  const [tag, setTag] = useState<TagType>(getInitialSingleton())

  /**
   * table hooks
   */
  const { data, isLoading, pagination, refetch, onTableChange } = useTableQuery(TAGS, undefined, {
    context: {
      appId: AppID.Boomart
    }
  })

  /**
   * table column
   */
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
            onClick: onDelete(tag.id)
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
  const onDelete = (id: number) => async () => {
    const res = await remove(id)
    res.data?.removeTag && refetch()
  }

  /** 表单提交后的回调 */
  const onSubmitted = () => {
    refetch()
    setIsOpened(false)
  }

  return (
    <>
      <Toolbar onAdd={onOpen()} />

      <Table
        rowKey='id'
        columns={columns}
        dataSource={data?.tags.items}
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
