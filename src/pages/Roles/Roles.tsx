// react
import { useState } from 'react'
// antd
import { Card, Table } from 'antd'
// project
import { getTableRowHandler, useTableQuery } from '~/utils/table'
import { getColumns } from '.'
import { remove, ROLES } from '~/apis/boomemory/role'
import Singleton from '~/components/Singleton'
import Role from '~/components/Singleton/Role'
import { getInitialSingleton } from '~/components/Singleton/Role'
import Toolbar from '~/components/Toolbar'
import Roles4Auth from '~/components/Roles4Auth'
import type { Role as RoleType } from '~/typings/role'
import type { AuthType } from '~/components/Roles4Auth'

const Roles = () => {
  const [role, setRole] = useState(getInitialSingleton())
  const [isOpened, setIsOpened] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [actived, setActived] = useState<AuthType>('user')

  const columns = getColumns([
    {
      title: '操作',
      width: 100,
      align: 'center',
      render: (value, role) =>
        getTableRowHandler([
          {
            label: '修改',
            onClick: onOpen(role)
          },
          {
            label: '授权',
            onClick: onShow(role, 'authorization')
          },
          {
            label: '用户',
            onClick: onShow(role, 'user')
          },
          {
            label: '删除',
            danger: true,
            onClick: onDelete(role.id),
            popconfirmProps: {
              title: '确认删除当前条目？',
              okText: '确认',
              cancelText: '取消'
            }
          }
        ])
    }
  ])

  /**
   * 表格数据
   */
  const { data, isLoading, pagination, refetch, onTableChange } = useTableQuery(ROLES)

  const onOpen =
    (role = getInitialSingleton()) =>
    () => {
      onAuthClose()
      setRole(role)
      setIsOpened(true)
    }

  const onClose = () => {
    setIsOpened(false)
  }

  const onSubmitted = () => {
    refetch()
    onClose()
  }

  /**
   * 展现右侧数据卡片
   */
  const onShow = (role: RoleType, actived: AuthType) => () => {
    setRole(role)
    setActived(actived)
    setIsShow(true)
  }

  /**
   * 页签变更
   */
  const onTabChange = (actived: string) => {
    setActived(actived as AuthType)
  }

  /**
   * 删除角色
   */
  const onDelete = (id: number) => async () => {
    onAuthClose()
    const res = await remove(id)
    res.data?.removeRole && refetch()
  }

  /**
   * 右侧功能页面关闭
   */
  const onAuthClose = () => {
    setIsShow(false)
  }

  return (
    <div className='flex'>
      <Card
        style={{
          width: isShow ? '50%' : '100%',
          marginRight: isShow ? '6px' : '0'
        }}
      >
        <Toolbar onAdd={onOpen()} />

        <Table
          rowKey='id'
          columns={columns}
          dataSource={data?.roles.items}
          bordered={true}
          pagination={pagination}
          onChange={onTableChange}
          loading={isLoading}
        />

        <Singleton
          title='角色'
          isOpened={isOpened}
          onClose={onClose}
          onSubmitted={onSubmitted}
          singleton={role}
          singletonComponent={Role}
        />
      </Card>

      {isShow && (
        <Roles4Auth
          className='w-1/2'
          roleId={role.id}
          title={role.name}
          actived={actived}
          onTabChange={onTabChange}
          onClose={onAuthClose}
        />
      )}
    </div>
  )
}

export default Roles
