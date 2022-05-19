// react
import { useState } from 'react'
// antd
import { Button, Divider, Space, Table, Popconfirm, Card } from 'antd'
// project
import Menu from '~/components/Singleton/Menu'
import Singleton from '~/components/Singleton'
import { getColumns as getMenuColumns } from '.'
import { getColumns as getTenantColumns } from '../Tenants'
import { useTableQuery } from '~/utils/table'
import { TENANTS_WITH_MENUS } from '~/apis/boomemory/tenant'
import { getMenuTreeFromMenus } from '~/utils/menu'
import { getInitialSingleton } from '~/components/Singleton/Menu'
import { remove } from '~/apis/boomemory/menu'
import { resultNotification } from '~/utils/notification'
import type { Tenant } from '~/typings/tenant'
import type { Menu as MenuType } from '~/typings/menu'

const Menus = () => {
  const [isOpened, setIsOpened] = useState(false)
  const [tenantCode, setTenantCode] = useState('')
  const [parentId, setParentId] = useState<number>()
  const [menu, setMenu] = useState<MenuType>(getInitialSingleton())

  /** hooks 请求数据 */
  const { data, isLoading, refetch } = useTableQuery(TENANTS_WITH_MENUS)

  const tenantColumns = getTenantColumns([
    {
      title: '操作',
      align: 'center',
      dataIndex: 'code',
      render: (tenantCode) => (
        <Space>
          <Button type='link' size='small' onClick={onOpen(tenantCode)}>
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
            <Button type='link' size='small' onClick={onOpen(tenant.code, undefined, menu)}>
              修改
            </Button>
            <Divider type='vertical' />
            <Button type='link' size='small' onClick={onOpen(tenant.code, menu.id)}>
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

    const menus = getMenuTreeFromMenus(
      data?.tenants.items?.find((tenantWithMenus) => tenantWithMenus.code === tenant.code)?.menus
    )

    /** 菜单表格 */
    return <Table rowKey='id' columns={menuColumns} dataSource={menus} pagination={false} bordered={true} />
  }

  /** 抽屉关闭事件 */
  const onClose = () => {
    setIsOpened(false)
  }

  /** 抽屉打开事件 */
  const onOpen =
    (tenantCode: string, parentId?: number, menu: MenuType = getInitialSingleton()) =>
    () => {
      // 重置state
      setMenu(menu)
      setTenantCode(tenantCode)
      setParentId(parentId)
      setIsOpened(true)
    }

  /** 抽屉提交完成后的回调事件 */
  const onSubmitted = () => {
    refetch()
    onClose()
  }

  /** 删除菜单事件 */
  const onDelete = (id: number) => async () => {
    const res = await remove(id)
    resultNotification(res)
    res.data?.removeMenu && refetch()
  }

  return (
    <Card>
      <Table
        rowKey='code'
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
          tenantCode,
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
