// antd
import { Table } from 'antd'
// project
import { useColumns } from '.'
import { useTableQuery } from '~/utils/table'
import { GET_USERS } from '~/apis/schemas/boomemory/user'
import type { Props } from '.'
import type { FilterInput } from '~/typings/boomemory/auth'

const Users = (props: Props) => {
  const columns = useColumns()

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
