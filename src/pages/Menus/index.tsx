// react
import { useState } from 'react'
// antd
import { Button, Divider, Space, Table, Popconfirm, Card } from 'antd'
// project
import Menu from '../../components/Singleton/Menu'
import Singleton from '../../components/Singleton'
import { getColumns as getMenuColumns } from './assets'
import { getColumns as getTenantColumns } from '../Tenants/assets'
import { useTableQuery } from '../../utils/table'
import { TENANTS_WITH_MENUS } from '../../apis/tenant'
import type { Tenant } from '../../typings/tenant'
import type { Menu as MenuType } from '../../typings/menu'

const Menus = () => {
  const [isOpened, setIsOpened] = useState(false)
  const [tenantId, setTenantId] = useState(0)
  const [parentId, setParentId] = useState<number>()
  const [menu, setMenu] = useState<MenuType>()

  /** hooks 请求数据 */
  const { data, isLoading, refetch } = useTableQuery(TENANTS_WITH_MENUS)

  const tenantColumns = getTenantColumns([
    {
      title: '操作',
      align: 'center',
      dataIndex: 'id',
      render: (tenantId) => (
        <Space>
          <Button type='link' size='small' onClick={onOpen(tenantId)}>
            添加菜单
          </Button>
        </Space>
      ),
      width: 100
    }
  ])

  const expandedRowRender = (tenant: Tenant) => {
    const menuColumns = getMenuColumns([
      {
        title: '操作',
        align: 'center',
        render: (text, menu) => (
          <Space>
            <Button type='link' size='small' onClick={onOpen(tenant.id, undefined, menu)}>
              修改
            </Button>
            <Divider type='vertical' />
            <Button type='link' size='small' onClick={onOpen(tenant.id, menu.id)}>
              添加子级菜单
            </Button>
            <Divider type='vertical' />
            <Popconfirm title='确认删除当前条目？' okText='确认' cancelText='取消' onConfirm={onDelete(menu.id)}>
              <Button type='link' size='small' danger>
                删除
              </Button>
            </Popconfirm>
          </Space>
        ),
        width: 100
      }
    ])

    /** 菜单表格 */
    return (
      <Table
        rowKey='id'
        columns={menuColumns}
        dataSource={data?.tenants.items?.find((tenantWithMenus) => tenantWithMenus.code === tenant.code)?.menus}
        pagination={false}
        bordered={true}
      />
    )
  }

  /** 抽屉关闭事件 */
  const onClose = () => {
    setIsOpened(false)
  }

  /** 抽屉打开事件 */
  const onOpen = (tenantId: number, parentId?: number, menu?: MenuType) => () => {
    // 重置state
    setMenu(menu)
    setTenantId(tenantId)
    setParentId(parentId)
    setIsOpened(true)
  }

  /** 抽屉提交完成后的回调事件 */
  const onSubmitted = () => {
    onClose()
  }

  /** 删除菜单事件 */
  const onDelete = (id: number) => async () => {
    // 删除成功后回调，刷新数据
    refetch()
  }

  return (
    <Card>
      <Table
        rowKey='id'
        columns={tenantColumns}
        dataSource={data?.tenants.items}
        bordered={true}
        expandable={{ expandedRowRender }}
        pagination={false}
        loading={isLoading}
      />

      <Singleton
        title='菜单'
        isOpened={isOpened}
        onClose={onClose}
        extraProps={{
          tenantId,
          parentId
        }}
        singletonComponent={Menu}
        singleton={menu}
        onSubmitted={onSubmitted}
      />
    </Card>
  )
}

export default Menus
