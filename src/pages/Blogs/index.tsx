// react
import { createRef, useCallback, useEffect, useState } from 'react'
// antd
import { Button, Divider, FormInstance, Popconfirm, Space, Table } from 'antd'
// project
import { Blog as BlogType } from '../../typings/blog'
import { getColumns } from './assets'
import { getFetchHandler, getInitialPagination, getTableChangeHandler } from '../../utils/table'
import { getBlogs, remove } from '../../apis/blog'
import Singleton from '../../components/Singleton'
import Blog from '../../components/Singleton/Blog'
import { responseNotification } from '../../utils/notification'
import Toolbar from '../../components/Toolbar'
import { getInitialSingleton } from '../../components/Singleton/Blog/assets'

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([])
  const [pagination, setPagination] = useState(getInitialPagination)
  const [isOpened, setIsOpened] = useState(false)
  const [blog, setBlog] = useState(getInitialSingleton())

  const formRef = createRef<FormInstance>()

  const columns = getColumns([
    {
      title: '操作',
      width: 100,
      align: 'center',
      render: (value, blog) => (
        <Space>
          <Button type='link' onClick={onOpen(blog)} size='small'>
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

  // 打开抽屉
  const onOpen =
    (blog = getInitialSingleton()) =>
    () => {
      setBlog(blog)
      setIsOpened(true)
    }

  const onClose = () => {
    setIsOpened(false)
  }

  // 删除博客
  const onDelete = (id: string) => async () => {
    const res = await remove(id)
    responseNotification(res)
    !res.code && onFetch(pagination)
  }

  const onSubmitted = () => {
    onFetch(pagination)
    onClose()
  }

  const onSubmit = () => {
    formRef.current?.submit()
  }

  return (
    <>
      <Toolbar onAdd={onOpen()} />

      <Table rowKey='_id' dataSource={blogs} columns={columns} bordered pagination={pagination} onChange={onTableChange} />

      <Singleton isOpened={isOpened} title='博客' onClose={onClose} onSubmit={onSubmit}>
        <Blog singleton={blog} onSubmitted={onSubmitted} ref={formRef} />
      </Singleton>
    </>
  )
}

export default Blogs
