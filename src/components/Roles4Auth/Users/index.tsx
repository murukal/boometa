// react
import { useState } from 'react'
import type { Key } from 'react'
// antd
import { Modal } from 'antd'
// project
import UserDataSet from '../../DataSet/Users'
import Toolbar from '../../Toolbar'
import { update } from '../../../apis/role'
import type { Props } from './assets'

const Users = (props: Props) => {
  const [userIds, setUserIds] = useState<number[]>([])
  const [isOpened, setIsOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  /** 授权用户 */
  const onSubmit = async () => {
    setIsLoading(true)

    // 提交事件
    const res = await update(props.roleId, {
      userIds: [...props.userIds, ...userIds]
    })

    setIsOpened(false)
    setIsLoading(false)

    props.onSubmitted(res)
  }

  /** 选择用户 */
  const onSelectChange = (userIds: Key[]) => {
    setUserIds(userIds as number[])
  }

  return (
    <>
      <Toolbar onAddUser={() => setIsOpened(true)} />
      <UserDataSet ids={props.userIds} />
      <Modal
        visible={isOpened}
        maskClosable={false}
        closable={false}
        onCancel={() => setIsOpened(false)}
        onOk={onSubmit}
        confirmLoading={isLoading}
      >
        <UserDataSet
          excludeUserIds={props.userIds}
          rowSelection={{
            selectedRowKeys: userIds,
            onChange: onSelectChange
          }}
        />
      </Modal>
    </>
  )
}

export default Users
