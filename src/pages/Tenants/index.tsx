// react
import { createRef, useEffect, useState } from 'react'
// antd
import { Button, Divider, FormInstance, Popconfirm, Space, Table } from 'antd'
// project
import { getColumns } from './assets'
import { getTenants, remove } from '../../apis/tenant'
import { Tenant as TenantType } from '../../typings/tenant'
import Tenant from '../../components/Singleton/Tenant'
import { responseNotification } from '../../utils/notification'
import Toolbar from '../../components/Toolbar'
import Singleton from '../../components/Singleton'
import { getInitialSingleton } from '../../components/Singleton/Tenant/assets'

const Tenants = () => {
  const [isOpened, setIsOpened] = useState(false)
  const [tenants, setTenants] = useState<TenantType[]>([])
  const [tenant, setTenant] = useState<TenantType>(getInitialSingleton())

  // 抽屉表单
  const formRef = createRef<FormInstance>()

  const columns = getColumns([
    {
      title: '操作',
      align: 'center',
      render: (text, tenant) => (
        <Space>
          <Button type='link' size='small' onClick={onOpen(tenant)}>
            修改
          </Button>
          <Divider type='vertical' />
          <Popconfirm title='确认删除当前条目？' okText='确认' cancelText='取消' onConfirm={onDelete(tenant._id)}>
            <Button type='link' size='small' danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
      width: 100
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

  // 抽屉提交事件
  const onSubmit = () => {
    formRef.current?.submit()
  }

  // 抽屉提交后的事件
  const onSubmitted = () => {
    onFetch()
    onClose()
  }

  return (
    <>
      <Toolbar onAdd={onOpen()} onDelete={() => {}} />

      <Table rowKey='_id' columns={columns} dataSource={tenants} bordered={true} pagination={false} />

      <Singleton title='客户端' isOpened={isOpened} onSubmit={onSubmit} onClose={onClose}>
        <Tenant ref={formRef} singleton={tenant} onSubmitted={onSubmitted} />
      </Singleton>
    </>
  )
}

export default Tenants
