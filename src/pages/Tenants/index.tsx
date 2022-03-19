// react
import { useState } from 'react'
// antd
import { Card } from 'antd'
import { Table } from 'antd'
// project
import Tenant from '../../components/Singleton/Tenant'
import Toolbar from '../../components/Toolbar'
import Singleton from '../../components/Singleton'
import { getColumns } from './assets'
import { remove, TENANTS } from '../../apis/tenant'
import { getInitialTenant } from '../../components/Singleton/Tenant/assets'
import { getTableRowHandler, useTableQuery } from '../../utils/table'
import type { Tenant as TenantType } from '../../typings/tenant'

const Tenants = () => {
  const [isOpened, setIsOpened] = useState(false)
  const [tenant, setTenant] = useState<TenantType>(getInitialTenant())

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
            onClick: onDelete(tenant.id)
          }
        ])
    }
  ])

  // table hook
  // 取消分页
  const { data, isLoading, refetch } = useTableQuery(TENANTS)

  // 抽屉关闭事件
  const onClose = () => {
    setIsOpened(false)
  }

  // 抽屉打开事件
  const onOpen =
    (tenant: TenantType = getInitialTenant()) =>
    () => {
      setTenant(tenant)
      setIsOpened(true)
    }

  // 删除客户端
  const onDelete = (id: number) => {
    return async () => {
      const res = await remove(id)
      res.data?.removeTenant && refetch()
    }
  }

  // 抽屉提交后的事件
  const onSubmitted = () => {
    refetch()
    onClose()
  }

  return (
    <Card>
      <Toolbar onAdd={onOpen()} onDelete={() => {}} />

      <Table
        rowKey='code'
        loading={isLoading}
        columns={columns}
        dataSource={data?.tenants.items}
        bordered={true}
        pagination={false}
      />

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
