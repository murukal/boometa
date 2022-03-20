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
import { resultNotification } from '../../../utils/notification'

const Users = (props: Props) => {
  const [userIds, setUserIds] = useState<number[]>([])
  const [isOpened, setIsOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  /** 授权用户 */
  const onSubmit = async () => {
    setIsLoading(true)

    // 提交事件
    const res = await update(props.roleId, {
      userIds
    })

    resultNotification(res)
    setIsLoading(false)

    if (res.data) {
      setUserIds([])
      setIsOpened(false)
      props.onSubmitted(res)
    }
  }

  /** 选择用户 */
  const onSelectChange = (userIds: Key[]) => {
    setUserIds(userIds as number[])
  }

  /** 弹窗关闭 */
  const onClose = () => setIsOpened(false)

  return (
    <>
      <Toolbar onAddUser={() => setIsOpened(true)} />
      <UserDataSet ids={props.userIds} />
      <Modal
        visible={isOpened}
        maskClosable={false}
        closable={false}
        onCancel={onClose}
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
