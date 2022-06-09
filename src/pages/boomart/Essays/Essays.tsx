// router
import { useNavigate } from 'react-router-dom'
// antd
import { Card, Table } from 'antd'
// project
import Toolbar from '~/components/Toolbar'
import { useColumns } from '.'
import { getTableRowHandler, useTableQuery } from '~/utils/table'
import { ESSAYS, remove } from '~/apis/boomart/essay'
import { AppID } from '~/assets'

const Essays = () => {
  const navigate = useNavigate()

  const columns = useColumns([
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

  /**
   * hooks获取数据
   */
  const { data, isLoading, pagination, refetch, onTableChange } = useTableQuery(ESSAYS, undefined, {
    fetchPolicy: 'no-cache',
    context: {
      appId: AppID.Boomart
    }
  })

  /**
   * 删除文章
   */
  const onDelete = (id: number) => async () => {
    const res = await remove(id)
    res.data?.removeEssay && refetch()
  }

  /**
   * 跳转文章详情
   */
  const onNavigate = (id?: number) => () => {
    if (id) {
      navigate(`/essay/${id}`)
    } else {
      navigate(`/essay`)
    }
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
