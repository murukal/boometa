// antd
import { Table } from 'antd'
import { useCallback, useEffect, useState } from 'react'
// project
import { Role as RoleType } from '../../typings/role'
import { getFetchHandler, getInitialPagination } from '../../utils/table'
import { getColumns } from './assets'
import { getRoles } from '../../apis/role'

const Roles = () => {
  const [roles, setRoles] = useState<RoleType[]>([])
  const [pagination, setPagination] = useState(getInitialPagination())

  const columns = getColumns()

  const onFetch = useCallback(async () => {
    const handler = getFetchHandler(getRoles, {
      setResults: setRoles,
      setPagination
    })

    handler()
  }, [])

  useEffect(() => {
    onFetch()
  }, [])

  return (
    <>
      <Table rowKey='_id' columns={columns} dataSource={roles} bordered={true} pagination={pagination} />
    </>
  )
}

export default Roles
