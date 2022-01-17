// react
import { useCallback, useEffect, useState } from 'react'
// antd
import { Button, Divider, Popconfirm, Space, Table } from 'antd'
// project
import { Blog as BlogType } from '../../typings/blog'
import { getColumns } from './assets'
import { getFetchHandler, getInitialPagination, getTableChangeHandler } from '../../utils/table'
import { getBlogs, remove } from '../../apis/blog'
import { responseNotification } from '../../utils/notification'
import Toolbar from '../../components/Toolbar'
import { useNavigate } from 'react-router-dom'

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([])
  const [pagination, setPagination] = useState(getInitialPagination)

  const navigate = useNavigate()

  const columns = getColumns([
    {
      title: '操作',
      width: 100,
      align: 'center',
      render: (value, blog) => (
        <Space>
          <Button type='link' onClick={onNavigate(blog._id)} size='small'>
            修改
          </Button>
          <Divider type='vertical' />
          <Popconfirm title='确认删除当前条目？' okText='确认' cancelText='取消' onConfirm={onDelete(blog._id)}>
            <Button type='link' danger size='small'>
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ])

  const onFetch = useCallback(
    async (currentPagination = pagination) => {
      const handler = getFetchHandler(getBlogs, {
        setPagination,
        setResults: setBlogs
      })

      handler({
        pagination: currentPagination
      })
    },
    [pagination]
  )

  const onTableChange = getTableChangeHandler<BlogType>(onFetch)

  // 渲染
  useEffect(() => {
    onFetch()
  }, [])

  // 删除博客
  const onDelete = (id: string) => async () => {
    const res = await remove(id)
    responseNotification(res)
    !res.code && onFetch(pagination)
  }

  const onNavigate =
    (id = '') =>
    () => {
      navigate(`/blog${id ? `/${id}` : ''}`)
    }

  return (
    <>
      <Toolbar onAdd={onNavigate()} />
      <Table rowKey='_id' dataSource={blogs} columns={columns} bordered pagination={pagination} onChange={onTableChange} />
    </>
  )
}

export default Blogs
