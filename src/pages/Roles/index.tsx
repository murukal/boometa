// react
import { createRef, useCallback, useEffect, useState } from 'react'
// antd
import type { FormInstance } from 'antd'
import { Table } from 'antd'
// project
import type { Role as RoleType } from '../../typings/role'
import { getFetchHandler, getInitialPagination, getTableChangeHandler, getTableRowHandler } from '../../utils/table'
import { getColumns } from './assets'
import { getRoles } from '../../apis/role'
import Singleton from '../../components/Singleton'
import Role from '../../components/Singleton/Role'
import { getInitialSingleton } from '../../components/Singleton/Role/assets'
import Toolbar from '../../components/Toolbar'

const Roles = () => {
  const [roles, setRoles] = useState<RoleType[]>([])
  const [role, setRole] = useState(getInitialSingleton())
  const [pagination, setPagination] = useState(getInitialPagination())
  const [isOpened, setIsOpened] = useState(false)

  const ref = createRef<FormInstance>()

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
          }
        ])
    }
  ])

  const onFetch = useCallback(async () => {
    const handler = getFetchHandler(getRoles, {
      setResults: setRoles,
      setPagination
    })

    handler()
  }, [])

  const onTableChange = getTableChangeHandler<RoleType>(onFetch)

  const onOpen =
    (role = getInitialSingleton()) =>
    () => {
      setRole(role)
      setIsOpened(true)
    }

  const onClose = () => {
    setIsOpened(false)
  }

  const onSubmit = () => {
    ref.current?.submit()
  }

  const onSubmitted = () => {
    onFetch()
    onClose()
  }

  useEffect(() => {
    onFetch()
  }, [])

  return (
    <>
      <Toolbar onAdd={onOpen()} />

      <Table rowKey='_id' columns={columns} dataSource={roles} bordered={true} pagination={pagination} onChange={onTableChange} />

      <Singleton title='角色' isOpened={isOpened} onClose={onClose} onSubmit={onSubmit}>
        <Role singleton={role} ref={ref} onSubmitted={onSubmitted} />
      </Singleton>
    </>
  )
}

export default Roles
