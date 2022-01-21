// react
import { useState, useEffect, useCallback, useContext } from 'react'
// antd
import { Card, Table } from 'antd'
// project
import type { User as UserType } from '../../typings/user'
import type { Props } from './assets'
import { getColumns } from './assets'
import { getFetchHandler, getInitialPagination, getTableChangeHandler } from '../../utils/table'
import { getUsers } from '../../apis/account'
import { QueryParams } from '../../typings/api'

const Users = (props: Props) => {
  const [users, setUsers] = useState<UserType[]>([])
  const [pagination, setPagination] = useState(getInitialPagination())

  const columns = getColumns()

  const onFetch = useCallback((query: QueryParams = {}) => {
    console.log('query', query)

    const handler = getFetchHandler(getUsers, {
      setResults: setUsers,
      setPagination
    })

    handler()
  }, [])

  const onTableChange = getTableChangeHandler<UserType>(onFetch)

  // 初始化渲染
  useEffect(() => {
    onFetch()
  }, [])

  return (
    <Card>
      <Table rowKey='_id' columns={columns} dataSource={users} bordered={true} pagination={pagination} onChange={onTableChange} />
    </Card>
  )
}

export default Users
