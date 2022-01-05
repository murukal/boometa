// react
import { useState, useEffect } from 'react'
// antd
import { Table } from 'antd'
// project
import { getColumns } from './assets'
import { Users as UsersType } from '../../typings/user'
import { getFetchHandler, getInitialPagination, getTableChangeHandler } from '../../utils/table'
import { getUsers } from '../../apis/account'

const Users = () => {
  const [users, setUsers] = useState<UsersType>([])
  const [pagination, setPagination] = useState(getInitialPagination())
  const columns = getColumns()

  const onFetch = getFetchHandler(getUsers, {
    setResults: setUsers,
    setPagination
  })

  const onTableChange = getTableChangeHandler(onFetch)

  // 初始化渲染
  useEffect(() => {
    onFetch()
  }, [])

  return (
    <>
      <Table rowKey='_id' columns={columns} dataSource={users} bordered={true} pagination={pagination} onChange={onTableChange} />
    </>
  )
}

export default Users
