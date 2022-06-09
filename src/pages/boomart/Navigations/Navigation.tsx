import { Card, Table } from 'antd'
import { useState } from 'react'
import { NAVIGATIONS } from '~/apis/boomart/navigations'
import { AppID } from '~/assets'
import Singleton from '~/components/Singleton'
import Navigation, { getInitialSingleton } from '~/components/Singleton/boomart/Navigation'
import Toolbar from '~/components/Toolbar'
import { Navigation as NavigationType } from '~/typings/boomart/navigation'
import { useTableQuery } from '~/utils/table'
import { useColumns } from '.'

const Navigations = () => {
  const [isOpened, setIsOpened] = useState(false)
  const columns = useColumns()
  const [navigation, setNavigation] = useState<NavigationType>(getInitialSingleton)

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
    refetch()
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
