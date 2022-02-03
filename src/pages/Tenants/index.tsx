// react
import { useEffect, useState } from 'react'
// antd
import { Card } from 'antd'
import { Table } from 'antd'
// project
import type { Tenant as TenantType } from '../../typings/tenant'
import { getColumns } from './assets'
import { getTenants, remove } from '../../apis/tenant'
import Tenant from '../../components/Singleton/Tenant'
import { responseNotification } from '../../utils/notification'
import Toolbar from '../../components/Toolbar'
import Singleton from '../../components/Singleton'
import { getInitialSingleton } from '../../components/Singleton/Tenant/assets'
import { getTableRowHandler } from '../../utils/table'

const Tenants = () => {
  const [isOpened, setIsOpened] = useState(false)
  const [tenants, setTenants] = useState<TenantType[]>([])
  const [tenant, setTenant] = useState<TenantType>(getInitialSingleton())

  const columns = getColumns([
    {
      title: '操作',
      align: 'center',
      width: 100,
      render: (text, tenant) =>
        getTableRowHandler([
          {
            label: '修改',
            onClick: onOpen(tenant)
          },
          {
            popconfirmProps: {
              title: '确认删除当前条目？',
              okText: '确认',
              cancelText: '取消'
            },
            label: '删除',
            danger: true,
            onClick: onDelete(tenant._id)
          }
        ])
    }
  ])

  // 数据加载方法
  const onFetch = async () => {
    const res = await getTenants()
    setTenants(res.data || [])
  }

  // 请求数据
  useEffect(() => {
    onFetch()
  }, [])

  // 抽屉关闭事件
  const onClose = () => {
    setIsOpened(false)
  }

  // 抽屉打开事件
  const onOpen =
    (tenant: TenantType = getInitialSingleton()) =>
    () => {
      setTenant(tenant)
      setIsOpened(true)
    }

  // 删除客户端
  const onDelete = (_id: string) => {
    return async () => {
      const res = await remove(_id)
      responseNotification(res)
      !res.code && onFetch()
    }
  }

  // 抽屉提交后的事件
  const onSubmitted = () => {
    onFetch()
    onClose()
  }

  return (
    <Card>
      <Toolbar onAdd={onOpen()} onDelete={() => {}} />

      <Table rowKey='_id' columns={columns} dataSource={tenants} bordered={true} pagination={false} />

      <Singleton
        title='客户端'
        isOpened={isOpened}
        onClose={onClose}
        singleton={tenant}
        singletonComponent={Tenant}
        onSubmitted={onSubmitted}
      />
    </Card>
  )
}

export default Tenants
