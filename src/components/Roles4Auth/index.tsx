// react
import { Key, useMemo } from 'react'
import { useCallback, useEffect, useState } from 'react'
// antd
import type { CardTabListType } from 'antd/lib/card'
import { Button, Card, Modal } from 'antd'
//project
import type { Props } from './assets'
import type { Role } from '../../typings/role'
import Users from '../DataSet/Users'
import Toolbar from '../Toolbar'
import { getRoleById, update } from '../../apis/role'
import { responseNotification } from '../../utils/notification'
import { getInitialSingleton } from '../Singleton/Role/assets'
import MenuTree from '../DataSet/MenuTree'

const Roles4Auth = (props: Props) => {
  const tabs: CardTabListType[] = [
    { key: 'user', tab: '用户' },
    { key: 'menu', tab: '授权' }
  ]
  const [role, setRole] = useState<Role>(getInitialSingleton())
  const [isSubmitterLoading, setIsSubmitterLoading] = useState(false)

  // user
  const [isUserSelectorOpened, setIsUserSelectorOpened] = useState(false)
  const [users, setUsers] = useState<string[]>([])

  // menu
  const [isMenuEditable, setIsMenuEditable] = useState(false)
  const [menus, setMenus] = useState<string[]>([])

  /** fetch函数 */
  const onFetch = useCallback(async () => {
    const res = await getRoleById(props.roleId)
    const role = res.data || getInitialSingleton()
    setRole(role)
    setUsers([])
    setMenus(role.menus)
  }, [props.roleId])

  // 数据渲染
  useEffect(() => {
    onFetch()
  }, [onFetch])

  /** 授权用户 */
  const onUserSubmit = async () => {
    setIsSubmitterLoading(true)

    // 提交事件
    const res = await update(props.roleId, {
      users: [...role.users, ...users]
    })

    setIsUserSelectorOpened(false)
    setIsSubmitterLoading(false)
    responseNotification(res)
    onFetch()
  }

  /** 授权菜单 */
  const onMenuSubmit = async () => {
    setIsSubmitterLoading(true)

    const res = await update(role._id, {
      menus
    })

    setIsSubmitterLoading(false)
    setIsMenuEditable(false)
    responseNotification(res)
    onFetch()
  }

  /** 选择用户 */
  const onUserSelectChange = (userIds: Key[]) => {
    setUsers(userIds as string[])
  }

  /** 获取授权页签下的按钮 */
  const tabBarExtraContent = useMemo(() => {
    if (props.actived !== 'menu') return undefined

    if (!isMenuEditable)
      return (
        <Button
          onClick={() => {
            setIsMenuEditable(true)
          }}
        >
          编辑
        </Button>
      )

    return (
      <Button type='primary' loading={isSubmitterLoading} onClick={onMenuSubmit}>
        保存
      </Button>
    )
  }, [props.actived, isMenuEditable, menus])

  /** 对菜单树进行授权过程中的回调 */
  const onMenuCheck = (keys: string[]) => {
    setMenus(keys)
  }

  return (
    <Card className={props.className} tabList={tabs} activeTabKey={props.actived} onTabChange={props.onTabChange} title={props.title} tabBarExtraContent={tabBarExtraContent}>
      {props.actived === 'user' && (
        <>
          <Toolbar onAddUser={() => setIsUserSelectorOpened(true)} />
          <Users ids={role.users} />
          <Modal visible={isUserSelectorOpened} maskClosable={false} closable={false} onCancel={() => setIsUserSelectorOpened(false)} onOk={onUserSubmit} confirmLoading={isSubmitterLoading}>
            <Users
              excludeIds={role.users}
              rowSelection={{
                selectedRowKeys: users,
                onChange: onUserSelectChange
              }}
            />
          </Modal>
        </>
      )}

      {props.actived === 'menu' && <MenuTree menus={menus} isDisable={!isMenuEditable} onCheck={onMenuCheck} />}
    </Card>
  )
}

export default Roles4Auth
