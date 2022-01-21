// react
import { useEffect } from 'react'
// antd
import { Card, Table } from 'antd'
// project
import type { User as UserType } from '../../typings/user'
import type { Props } from './assets'
import type { QueryOptions } from '../../typings/api'

import { getColumns } from './assets'
import { useTable } from '../../utils/table'
import { getUsers } from '../../apis/account'
import Toolbar from '../../components/Toolbar'

const Users = (props: Props) => {
  const columns = getColumns()

  const {
    handlers: { onFetch, onTableChange },
    props: { results: users, pagination, isLoading }
  } = useTable<UserType>(async (query: QueryOptions) => {
    // setting的场景下，ids不存在或者数组长度为空时，均代表不需要取数。默认为空
    if (props.isSetting && (!props.ids || !props.ids.length))
      return {
        data: []
      }

    // 其余场景请求后端数据
    // 固定筛选条件的注入
    return await getUsers({
      ...query,
      _id: {
        $in: props.ids
      }
    })
  })

  // 初始化渲染
  useEffect(() => {
    onFetch()
  }, [])

  return (
    <Card className='overflow-auto'>
      {props.isSetting && <Toolbar onAddUser={() => {}} />}

      <Table rowKey='_id' columns={columns} dataSource={users} bordered={true} pagination={pagination} onChange={onTableChange} loading={isLoading} />
    </Card>
  )
}

export default Users
