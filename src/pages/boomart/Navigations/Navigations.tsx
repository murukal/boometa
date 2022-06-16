// react
import { useState } from 'react'
// antd
import { Card, Table } from 'antd'
// project
import { useColumns } from '.'
import { NAVIGATIONS, remove } from '~/apis/schemas/boomart/navigation'
import { AppID } from '~/assets'
import Singleton from '~/components/Singleton'
import Navigation, { getInitialSingleton } from '~/components/Singleton/boomart/Navigation'
import Toolbar from '~/components/Toolbar'
import { resultNotification } from '~/utils/notification'
import { getTableRowHandler, useTableQuery } from '~/utils/table'
import type { Navigation as NavigationType } from '~/typings/boomart/navigation'

const Navigations = () => {
  const [isOpened, setIsOpened] = useState(false)
  const [navigation, setNavigation] = useState<NavigationType>(getInitialSingleton)

  const columns = useColumns([
    {
      title: '操作',
      width: 100,
      align: 'center',
      render: (value, navigation) =>
        getTableRowHandler([
          {
            label: '修改',
            onClick: onOpen(navigation)
          },
          {
            label: '删除',
            danger: true,
            popconfirmProps: {
              title: '确认删除当前条目？',
              okText: '确认',
              cancelText: '取消'
            },
            onClick: onDelete(navigation.id)
          }
        ])
    }
  ])

  /**
   * hooks 查询导航列表
   */
  const { data, isLoading, onTableChange, pagination, refetch } = useTableQuery(NAVIGATIONS, undefined, {
    context: {
      appId: AppID.Boomart
    }
  })

  /**
   * 配置导航
   */
  const onOpen =
    (navigation = getInitialSingleton()) =>
    () => {
      setNavigation(navigation)
      setIsOpened(true)
    }

  /**
   * 关闭窗口
   */
  const onClose = () => {
    setIsOpened(false)
  }

  /**
   * 配置导航后的回调
   */
  const onSubmitted = () => {
    // 窗口关闭
    onClose()
    // 重新获取数据
    refetch()
  }

  /**
   * 删除导航
   */
  const onDelete = (id: number) => async () => {
    const result = await remove(id)
    resultNotification(result)
    result.data && refetch()
  }

  return (
    <Card>
      <Toolbar onAdd={onOpen()} />

      <Table
        rowKey='id'
        dataSource={data?.navigations.items}
        columns={columns}
        bordered
        pagination={pagination}
        onChange={onTableChange}
        loading={isLoading}
      />

      <Singleton
        title='配置导航'
        isOpened={isOpened}
        onClose={onClose}
        singleton={navigation}
        singletonComponent={Navigation}
        onSubmitted={onSubmitted}
      />
    </Card>
  )
}

export default Navigations
