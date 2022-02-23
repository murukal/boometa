// react
import { useEffect } from 'react'
// antd
import { Card, Table } from 'antd'
// project
import type { Essay as EssayType } from '../../typings/essay'
import { getColumns } from './assets'
import { getTableRowHandler, useTable } from '../../utils/table'
import { getEssays, remove } from '../../apis/essay'
import { responseNotification } from '../../utils/notification'
import Toolbar from '../../components/Toolbar'
import { useNavigate } from 'react-router-dom'

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
            onClick: onNavigate(essay._id)
          },
          {
            label: '删除',
            onClick: onDelete(essay._id),
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

  const {
    handlers: { onTableChange, onFetch },
    props: { results: essays, pagination, isLoading }
  } = useTable<EssayType>(getEssays)

  // 渲染
  useEffect(() => {
    onFetch()
  }, [])

  // 删除文章
  const onDelete = (id: string) => async () => {
    const res = await remove(id)
    responseNotification(res)
    !res.code && onFetch()
  }

  const onNavigate =
    (id = '') =>
    () => {
      navigate(`/essay${id ? `/${id}` : ''}`)
    }

  return (
    <Card>
      <Toolbar onAdd={onNavigate()} />

      <Table rowKey='_id' dataSource={essays} columns={columns} bordered pagination={pagination} onChange={onTableChange} loading={isLoading} />
    </Card>
  )
}

export default Essays
