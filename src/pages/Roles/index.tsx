// react
import { createRef, useEffect, useState } from 'react'
// antd
import type { FormInstance } from 'antd'
import type { CardTabListType } from 'antd/lib/card'
import { Card, Table } from 'antd'
// project
import type { Role as RoleType } from '../../typings/role'
import { getTableRowHandler, useTable } from '../../utils/table'
import { getColumns } from './assets'
import { getRoles } from '../../apis/role'
import Singleton from '../../components/Singleton'
import Role from '../../components/Singleton/Role'
import { getInitialSingleton } from '../../components/Singleton/Role/assets'
import Toolbar from '../../components/Toolbar'
import Users from '../Users'

const Roles = () => {
  const [role, setRole] = useState(getInitialSingleton())
  const [isOpened, setIsOpened] = useState(false)

  const [isShow, setIsShow] = useState(false)
  const [actived, setActived] = useState('user')

  const ref = createRef<FormInstance>()

  const columns = getColumns([
    {
      title: '操作',
      width: 100,
      align: 'center',
      render: (value, role) =>
        getTableRowHandler([
          {
            label: '修改',
            onClick: onOpen(role)
          },
          {
            label: '授权',
            onClick: onShow('auth')
          },
          {
            label: '用户',
            onClick: onShow('user')
          }
        ])
    }
  ])

  const {
    handlers: { onFetch, onTableChange },
    props: { results: roles, pagination, isLoading }
  } = useTable<RoleType>(getRoles)

  const onOpen =
    (role = getInitialSingleton()) =>
    () => {
      setRole(role)
      setIsOpened(true)
    }

  const onClose = () => {
    setIsOpened(false)
  }

  const onSubmit = () => {
    ref.current?.submit()
  }

  const onSubmitted = () => {
    onFetch()
    onClose()
  }

  const onShow = (key: string) => () => {
    onTabChange(key)
    setIsShow(true)
  }

  const tabs: CardTabListType[] = [
    { key: 'user', tab: '用户' },
    { key: 'auth', tab: '授权' }
  ]

  const onTabChange = (key: string) => {
    setActived(key)
  }

  useEffect(() => {
    onFetch()
  }, [])

  return (
    <div className='flex'>
      <Card
        className='overflow-auto'
        style={{
          width: isShow ? '50%' : '100%',
          marginRight: isShow ? '6px' : '0'
        }}
      >
        <Toolbar onAdd={onOpen()} />

        <Table rowKey='_id' columns={columns} dataSource={roles} bordered={true} pagination={pagination} onChange={onTableChange} loading={isLoading} />

        <Singleton title='角色' isOpened={isOpened} onClose={onClose} onSubmit={onSubmit}>
          <Role singleton={role} ref={ref} onSubmitted={onSubmitted} />
        </Singleton>
      </Card>

      {isShow && (
        <Card className='w-1/2 ml-1.5' tabList={tabs} activeTabKey={actived} onTabChange={onTabChange}>
          {actived === 'user' && <Users ids={role.users} isSetting />}
        </Card>
      )}
    </div>
  )
}

export default Roles
