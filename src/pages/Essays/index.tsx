// router
import { useNavigate } from 'react-router-dom'
// antd
import { Card, Table } from 'antd'
// project
import Toolbar from '../../components/Toolbar'
import { getColumns } from './assets'
import { getTableRowHandler, onTableChange, useTableQuery } from '../../utils/table'
import { ESSAYS, remove } from '../../apis/essay'

const Essays = () => {
  const navigate = useNavigate()

  const columns = getColumns([
    {
      title: '操作',
      width: 100,
      align: 'center',
      render: (value, essay) =>
        getTableRowHandler([
          {
            label: '修改',
            onClick: onNavigate(essay.id)
          },
          {
            label: '删除',
            onClick: onDelete(essay.id),
            danger: true,
            popconfirmProps: {
              title: '确认删除当前条目？',
              okText: '确认',
              cancelText: '取消'
            }
          }
        ])
    }
  ])

  /** hooks获取数据 */
  const { data, isLoading, pagination, refetch } = useTableQuery(ESSAYS)

  // 删除文章
  const onDelete = (id: number) => async () => {
    const res = await remove(id)
    res.data && refetch()
  }

  const onNavigate =
    (id = 0) =>
    () => {
      navigate(`/essay${id ? `/${id}` : ''}`)
    }

  return (
    <Card>
      <Toolbar onAdd={onNavigate()} />

      <Table
        rowKey='id'
        dataSource={data?.essays.items}
        columns={columns}
        bordered
        pagination={pagination}
        onChange={onTableChange}
        loading={isLoading}
      />
    </Card>
  )
}

export default Essays
