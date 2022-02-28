// react
import { useState } from 'react'
import type { Key } from 'react'
// antd
import { Modal } from 'antd'
// project
import UserDataSet from '../../DataSet/Users'
import Toolbar from '../../Toolbar'
import { responseNotification } from '../../../utils/notification'
import { update } from '../../../apis/role'
import type { Props } from './assets'

const Users = (props: Props) => {
  const [users, setUsers] = useState<string[]>([])
  const [isOpened, setIsOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  /** 授权用户 */
  const onSubmit = async () => {
    setIsLoading(true)

    // 提交事件
    const res = await update(props.roleId, {
      users: [...props.users, ...users]
    })

    setIsOpened(false)
    setIsLoading(false)
    responseNotification(res)
  }

  /** 选择用户 */
  const onSelectChange = (userIds: Key[]) => {
    setUsers(userIds as string[])
  }

  return (
    <>
      <Toolbar onAddUser={() => setIsOpened(true)} />
      <UserDataSet ids={props.users} />
      <Modal visible={isOpened} maskClosable={false} closable={false} onCancel={() => setIsOpened(false)} onOk={onSubmit} confirmLoading={isLoading}>
        <UserDataSet
          excludeIds={props.users}
          rowSelection={{
            selectedRowKeys: users,
            onChange: onSelectChange
          }}
        />
      </Modal>
    </>
  )
}

export default Users
