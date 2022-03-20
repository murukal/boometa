// antd
import { Table } from 'antd'
// project
import { getColumns } from './assets'
import { onTableChange, useTableQuery } from '../../../utils/table'
import { GET_USERS } from '../../../apis/auth'
import type { Props } from './assets'
import type { FilterInput } from '../../../typings/user'

const Users = (props: Props) => {
  const columns = getColumns()

  const { data, isLoading, pagination } = useTableQuery<FilterInput>(GET_USERS, {
    filterInput: {
      ids: props.ids,
      excludeIds: props.excludeUserIds
    }
  })

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
