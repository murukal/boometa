// antd
import { Card, Table } from 'antd'
import { useState } from 'react'
// project
import { CATEGORIES, remove } from '~/apis/boomoney/category'
import { AppID } from '~/assets'
import Singleton from '~/components/Singleton'
import Category, { getInitialSingleton } from '~/components/Singleton/boomoney/Category'
import Toolbar from '~/components/Toolbar'
import { Category as CategoryType } from '~/typings/boomoney/category'
import { getTableRowHandler, useTableQuery } from '~/utils/table'
import { useColumns } from '.'

const Categories = () => {
  const [isOpened, setIsOpened] = useState(false)
  const [category, setCategory] = useState<CategoryType>(getInitialSingleton())

  const columns = useColumns([
    {
      title: '操作',
      width: 100,
      align: 'center',
      render: (value, category) =>
        getTableRowHandler([
          {
            label: '修改',
            onClick: onOpen(category)
          },
          {
            label: '删除',
            danger: true,
            popconfirmProps: {
              title: '确认删除当前条目？',
              okText: '确认',
              cancelText: '取消'
            },
            onClick: onDelete(category.id)
          }
        ])
    }
  ])

  const { data, isLoading, pagination, onTableChange, refetch } = useTableQuery(CATEGORIES, undefined, {
    context: {
      appId: AppID.Boomoney
    }
  })

  /**
   * 打开侧边栏
   */
  const onOpen =
    (category: CategoryType = getInitialSingleton()) =>
    () => {
      setCategory(category)
      setIsOpened(true)
    }

  /**
   * 删除分类
   */
  const onDelete = (id: number) => async () => {
    await remove(id)
    await refetch()
  }

  /**
   * 关闭侧边栏
   */
  const onClose = () => {
    setIsOpened(false)
  }

  /**
   * 提交后的回调
   */
  const onSubmitted = async () => {
    onClose()
    await refetch()
  }

  return (
    <Card>
      <Toolbar onAdd={onOpen()} />

      <Table
        rowKey='id'
        columns={columns}
        dataSource={data?.categories.items}
        bordered={true}
        pagination={pagination}
        onChange={onTableChange}
        loading={isLoading}
      />

      <Singleton
        title='标签'
        isOpened={isOpened}
        onClose={onClose}
        singleton={category}
        singletonComponent={Category}
        onSubmitted={onSubmitted}
      />
    </Card>
  )
}

export default Categories
