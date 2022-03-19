// antd
import { Table } from 'antd'
// project
import { getColumns } from './assets'
import { onTableChange, useTableQuery } from '../../../utils/table'
import { GET_USERS } from '../../../apis/auth'
import type { Props } from './assets'

const Users = (props: Props) => {
  const columns = getColumns()

  const { data, isLoading, pagination } = useTableQuery(GET_USERS)

  return (
    <Table
      rowSelection={props.rowSelection}
      rowKey='id'
      columns={columns}
      dataSource={data?.users.items}
      bordered={true}
      pagination={pagination}
      onChange={onTableChange}
      loading={isLoading}
    />
  )
}

export default Users
