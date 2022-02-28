// react
import { useMemo } from 'react'
import { useCallback, useEffect, useState } from 'react'
// antd
import type { CardTabListType } from 'antd/lib/card'
import { Button, Card } from 'antd'
import { CloseOutlined } from '@ant-design/icons/lib/icons'
//project
import Users from './Users'
import { getRoleById } from '../../apis/role'
import { getInitialSingleton } from '../Singleton/Role/assets'
import type { Props } from './assets'
import type { Role } from '../../typings/role'
import Permissions from './Permissions'
import { createRef } from 'react'

const Roles4Auth = (props: Props) => {
  const tabs: CardTabListType[] = [
    { key: 'user', tab: '用户' },
    { key: 'menu', tab: '授权' }
  ]

  const [role, setRole] = useState<Role>(getInitialSingleton())
  const [isLoading, setIsLoading] = useState(false)
  const [isEditable, setIsEditable] = useState(false)

  const ref = createRef<any>()

  /** fetch函数 */
  const onFetch = useCallback(async () => {
    setRole((await getRoleById(props.roleId)).data || getInitialSingleton())
  }, [props.roleId])

  // 数据渲染
  useEffect(() => {
    onFetch()
  }, [onFetch])

  /** 获取授权页签下的按钮 */
  const tabBarExtraContent = useMemo(() => {
    if (props.actived !== 'menu') return undefined

    if (!isEditable) return <Button onClick={() => setIsEditable(true)}>编辑</Button>

    return (
      <Button
        type='primary'
        loading={isLoading}
        onClick={() => {
          ref.current.onSubmit()
        }}
      >
        保存
      </Button>
    )
  }, [props.actived, isEditable])

  /** 抬头 */
  const title = useMemo(() => {
    return (
      <div className='flex justify-between'>
        {props.title}
        <Button shape='circle' type='link' icon={<CloseOutlined />} danger onClick={() => props.onClose && props.onClose()} />
      </div>
    )
  }, [props.title, props.onClose])

  /** 提交的预回调 */
  const onSubmit = () => {
    setIsLoading(true)
  }

  /** 提交结束的回调 */
  const onSubmitted = () => {
    setIsLoading(false)
    setIsEditable(false)
    onFetch()
  }

  return (
    <Card
      className={props.className}
      tabList={tabs}
      activeTabKey={props.actived}
      onTabChange={props.onTabChange}
      title={title}
      tabBarExtraContent={tabBarExtraContent}
    >
      {props.actived === 'user' ? (
        <Users roleId={role._id} users={role.users} />
      ) : (
        <Permissions ref={ref} roleId={role._id} isDisabled={!isEditable} onSubmit={onSubmit} onSubmitted={onSubmitted} />
      )}
    </Card>
  )
}

export default Roles4Auth
