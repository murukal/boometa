// react
import { useEffect } from 'react'
// antd
import { Card, Table } from 'antd'
// project
import type { Blog as BlogType } from '../../typings/blog'
import { getColumns } from './assets'
import { getTableRowHandler, useTable } from '../../utils/table'
import { getBlogs, remove } from '../../apis/blog'
import { responseNotification } from '../../utils/notification'
import Toolbar from '../../components/Toolbar'
import { useNavigate } from 'react-router-dom'

const Blogs = () => {
  const navigate = useNavigate()

  const columns = getColumns([
    {
      title: '操作',
      width: 100,
      align: 'center',
      render: (value, blog) =>
        getTableRowHandler([
          {
            label: '修改',
            onClick: onNavigate(blog._id)
          },
          {
            label: '删除',
            onClick: onDelete(blog._id),
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
    props: { results: blogs, pagination, isLoading }
  } = useTable<BlogType>(getBlogs)

  // 渲染
  useEffect(() => {
    onFetch()
  }, [])

  // 删除博客
  const onDelete = (id: string) => async () => {
    const res = await remove(id)
    responseNotification(res)
    !res.code && onFetch()
  }

  const onNavigate =
    (id = '') =>
    () => {
      navigate(`/blog${id ? `/${id}` : ''}`)
    }

  return (
    <Card>
      <Toolbar onAdd={onNavigate()} />

      <Table rowKey='_id' dataSource={blogs} columns={columns} bordered pagination={pagination} onChange={onTableChange} loading={isLoading} />
    </Card>
  )
}

export default Blogs
