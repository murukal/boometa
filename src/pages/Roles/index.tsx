// react
import { createRef, useEffect, useState } from 'react'
// antd
import type { FormInstance } from 'antd'
import { Card, Table } from 'antd'
// project
import type { Role as RoleType } from '../../typings/role'
import type { AuthType } from '../../components/Roles4Auth/assets'
import { getTableRowHandler, useTable } from '../../utils/table'
import { getColumns } from './assets'
import { getRoles } from '../../apis/role'
import Singleton from '../../components/Singleton'
import Role from '../../components/Singleton/Role'
import { getInitialSingleton } from '../../components/Singleton/Role/assets'
import Toolbar from '../../components/Toolbar'
import Roles4Auth from '../../components/Roles4Auth'

const Roles = () => {
  const [role, setRole] = useState(getInitialSingleton())
  const [isOpened, setIsOpened] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [actived, setActived] = useState<AuthType>('user')

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
            onClick: onShow(role, 'menu')
          },
          {
            label: '用户',
            onClick: onShow(role, 'user')
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

  /** 展现右侧数据卡片 */
  const onShow = (role: RoleType, actived: AuthType) => () => {
    setRole(role)
    setActived(actived)
    setIsShow(true)
  }

  /** 页签变更 */
  const onTabChange = (actived: string) => {
    setActived(actived as AuthType)
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

      {isShow && <Roles4Auth className='w-1/2 overflow-auto' roleId={role._id} title={role.name} actived={actived} onTabChange={onTabChange} />}
    </div>
  )
}

export default Roles
