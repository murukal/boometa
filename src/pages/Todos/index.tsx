// react
import { useState, useEffect } from 'react'
// antd
import { Card, Table } from 'antd'
// project
import type { Todo as TodoType } from '../../typings/todo'
import { getColumns } from './assets'
import { getTodos, remove } from '../../apis/todo'
import { responseNotification } from '../../utils/notification'
import Singleton from '../../components/Singleton'
import Toolbar from '../../components/Toolbar'
import Todo from '../../components/Singleton/Todo'
import { getTableRowHandler, useTable } from '../../utils/table'
import { getInitialSingleton } from '../../components/Singleton/Todo/assets'

const Todos = () => {
  const [todo, setTodo] = useState<TodoType>(getInitialSingleton())
  const [isOpened, setIsOpened] = useState(false)

  const columns = getColumns([
    {
      title: '操作',
      align: 'center',
      render: (text, todo) =>
        getTableRowHandler([
          {
            label: '修改',
            onClick: onOpen(todo)
          },
          {
            label: '删除',
            onClick: onDelete(todo._id),
            danger: true,
            popconfirmProps: {
              okText: '确认',
              cancelText: '取消',
              title: '确认删除当前条目？'
            }
          }
        ]),
      width: 100
    }
  ])

  const {
    handlers: { onFetch, onTableChange },
    props: { results: todos, pagination, isLoading }
  } = useTable<TodoType>(getTodos)

  const onOpen =
    (todo: TodoType = getInitialSingleton()) =>
    () => {
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

  const onSubmitted = () => {
    onClose()
    onFetch()
  }

  useEffect(() => {
    onFetch()
  }, [])

  return (
    <Card>
      <Toolbar onAdd={onOpen()} />

      <Table
        rowKey='_id'
        columns={columns}
        dataSource={todos}
        bordered={true}
        pagination={pagination}
        onChange={onTableChange}
        loading={isLoading}
      />

      <Singleton
        title='待办事项'
        isOpened={isOpened}
        onClose={onClose}
        singleton={todo}
        singletonComponent={Todo}
        onSubmitted={onSubmitted}
      />
    </Card>
  )
}

export default Todos
