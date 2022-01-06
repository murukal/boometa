// react
import { useState, createRef } from 'react'
// antd
import { Button, Divider, Space, Table, FormInstance, Popconfirm } from 'antd'
// project
import { getColumns as getMenuColumns } from './assets'
import { getColumns as getTenantColumns } from '../Tenants/assets'
import Menu from '../../components/Singleton/Menu'
import { getTenants } from '../../apis/tenant'
import { useEffect } from 'react'
import { Tenant } from '../../typings/tenant'
import { MenuTreeNode, MenuTree } from '../../typings/menu'
import { getMenuTrees, remove } from '../../apis/menu'
import { responseNotification } from '../../utils/notification'
import Singleton from '../../components/Singleton'
import { getInitialSingleton } from '../../components/Singleton/Menu/assets'

const Menus = () => {
  const [isOpened, setIsOpened] = useState(false)
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [tenantId, setTenantId] = useState('')
  const [parentId, setParentId] = useState<string>()
  const [menuTrees, setMenuTrees] = useState<MenuTree[]>([])
  const [menuTreeNode, setMenuTreeNode] = useState<MenuTreeNode>(getInitialSingleton())

  // 抽屉表单
  const formRef = createRef<FormInstance>()

  const tenantColumns = getTenantColumns([
    {
      title: '操作',
      align: 'center',
      dataIndex: '_id',
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
            <Button type='link' size='small' onClick={onOpen(tenant._id, undefined, menu)}>
              修改
            </Button>
            <Divider type='vertical' />
            <Button type='link' size='small' onClick={onOpen(tenant._id, menu._id)}>
              添加子级菜单
            </Button>
            <Divider type='vertical' />
            <Popconfirm title='确认删除当前条目？' okText='确认' cancelText='取消' onConfirm={onDelete(menu._id)}>
              <Button type='link' size='small' danger>
                删除
              </Button>
            </Popconfirm>
          </Space>
        ),
        width: 100
      }
    ])

    // 筛选菜单数据
    const menus = menuTrees.find((menuTree) => menuTree.tenant === tenant._id)?.nodes || []

    return <Table rowKey='_id' columns={menuColumns} dataSource={menus} pagination={false} bordered={true} />
  }

  const onFetch = async () => {
    // 获取租户的数据
    const tenantRes = await getTenants()
    setTenants(tenantRes.data || [])

    // 获取租户的菜单树
    const menuTreesRes = await getMenuTrees(tenantRes.data?.map((tenant) => tenant._id) || [])
    setMenuTrees(menuTreesRes.data || [])
  }

  useEffect(() => {
    onFetch()
  }, [])

  /**
   * 抽屉关闭事件
   */
  const onClose = () => {
    setIsOpened(false)
  }

  /**
   * 抽屉打开事件
   */
  const onOpen =
    (tenantId: string, parentId?: string, menuTreeNode: MenuTreeNode = getInitialSingleton()) =>
    () => {
      // 重置state
      setMenuTreeNode(menuTreeNode)
      setTenantId(tenantId)
      setParentId(parentId)
      setIsOpened(true)
    }

  /**
   * 抽屉提交事件
   */
  const onSubmit = () => {
    formRef.current?.submit()
  }

  /**
   * 抽屉提交完成后的回调事件
   */
  const onSubmitted = () => {
    onClose()
    onFetch()
  }

  /**
   * 删除菜单事件
   */
  const onDelete = (_id: string) => {
    return async () => {
      responseNotification(await remove(_id))
      // 删除成功后回调，刷新数据
      onFetch()
    }
  }

  return (
    <>
      <Table rowKey='_id' columns={tenantColumns} dataSource={tenants} bordered={true} expandable={{ expandedRowRender }} pagination={false} />

      <Singleton title='菜单' isOpened={isOpened} onClose={onClose} onSubmit={onSubmit}>
        <Menu tenantId={tenantId} parentId={parentId} singleton={menuTreeNode} ref={formRef} onSubmitted={onSubmitted} />
      </Singleton>
    </>
  )
}

export default Menus
