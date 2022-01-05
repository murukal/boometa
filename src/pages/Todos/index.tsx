// react
import { createRef, useState, useEffect } from 'react'
// antd
import { Button, Divider, FormInstance, Popconfirm, Space, Table } from 'antd'
// project
import { getColumns } from './assets'
import { Todo as TodoType, Todos as TodosType } from '../../typings/todo'
import { getTodos, remove } from '../../apis/todo'
import { responseNotification } from '../../utils/notification'
import Singleton from '../../components/Singleton'
import Toolbar from '../../components/Toolbar'
import Todo from '../../components/Singleton/Todo'
import { getFetchHandler, getInitialPagination, getTableChangeHandler } from '../../utils/table'

const Todos = () => {
  const [todo, setTodo] = useState<TodoType>()
  const [todos, setTodos] = useState<TodosType>([])
  const [isOpened, setIsOpened] = useState(false)
  const formRef = createRef<FormInstance>()
  const [pagination, setPagination] = useState(getInitialPagination())
  const columns = getColumns([
    {
      title: '操作',
      align: 'center',
      render: (text, todo) => (
        <Space>
          <Button type='link' size='small' onClick={onOpen(todo)}>
            修改
          </Button>
          <Divider type='vertical' />
          <Popconfirm title='确认删除当前条目？' okText='确认' cancelText='取消' onConfirm={onDelete(todo._id)}>
            <Button type='link' size='small' danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
      width: 100
    }
  ])

  const onFetch = getFetchHandler(getTodos, {
    setResults: setTodos,
    setPagination
  })

  const onOpen = (todo?: TodoType) => () => {
    setTodo(todo)
    setIsOpened(true)
  }

  const onDelete = (id: string) => async () => {
    const res = await remove(id)
    responseNotification(res)
    !res.code && onFetch()
  }

  const onClose = () => {
    setIsOpened(false)
  }

  const onSubmit = () => {
    formRef.current?.submit()
  }

  const onSubmitted = () => {
    onClose()
    onFetch()
  }

  const onTableChange = getTableChangeHandler(onFetch)

  useEffect(() => {
    onFetch()
  }, [])

  return (
    <>
      <Toolbar onAdd={onOpen()} />

      <Table rowKey='_id' columns={columns} dataSource={todos} bordered={true} pagination={pagination} onChange={onTableChange} />

      <Singleton title='待办事项' isOpened={isOpened} onClose={onClose} onSubmit={onSubmit}>
        <Todo singleton={todo} ref={formRef} onSubmitted={onSubmitted} />
      </Singleton>
    </>
  )
}

export default Todos
