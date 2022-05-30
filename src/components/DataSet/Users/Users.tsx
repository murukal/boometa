// antd
import { Table } from 'antd'
// project
import { getColumns } from '.'
import { useTableQuery } from '~/utils/table'
import { GET_USERS } from '~/apis/boomemory/auth'
import type { Props } from '.'
import type { FilterInput } from '~/typings/boomemory/auth'

const Users = (props: Props) => {
  const columns = getColumns()

  const { data, isLoading, pagination, onTableChange } = useTableQuery<FilterInput>(GET_USERS, {
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
