// react
import { useEffect } from 'react'
// antd
import { Table } from 'antd'
// project
import type { User as UserType } from '../../../typings/user'
import type { Props } from './assets'
import type { QueryOptions } from '../../../typings/api'
import { getColumns } from './assets'
import { useTable } from '../../../utils/table'
import { getUsers } from '../../../apis/account'

const Users = (props: Props) => {
  const columns = getColumns()

  const {
    handlers: { onFetch, onTableChange },
    props: { results: users, pagination, isLoading }
  } = useTable<UserType>(async (query: QueryOptions) => {
    // ids存在入参时，但数组长度为0
    if (props.ids && !props.ids.length)
      return {
        code: 0,
        data: []
      }

    // 其余场景请求后端数据
    // 固定筛选条件的注入
    return await getUsers({
      ...query,
      _id: {
        $in: props.ids,
        $nin: props.excludeIds
      }
    })
  })

  // 初始化渲染
  useEffect(() => {
    onFetch()
  }, [props.ids, props.excludeIds])

  return (
    <Table
      rowSelection={props.rowSelection}
      rowKey='_id'
      columns={columns}
      dataSource={users}
      bordered={true}
      pagination={pagination}
      onChange={onTableChange}
      loading={isLoading}
    />
  )
}

export default Users
