// react
import { useMemo, useState } from 'react'
// antd
import { Button, Card } from 'antd'
import { CloseOutlined } from '@ant-design/icons/lib/icons'
import type { CardTabListType } from 'antd/lib/card'
//project
import Users from './Users'
import Authorizations from './Authorizations'
import { ROLE } from '~/apis/role'
import { createRef } from 'react'
import { useQuery } from '@apollo/client'
import type { Props } from '.'

const Roles4Auth = (props: Props) => {
  const tabs: CardTabListType[] = [
    { key: 'user', tab: '用户' },
    { key: 'authorization', tab: '授权' }
  ]

  const [isLoading, setIsLoading] = useState(false)
  const [isEditable, setIsEditable] = useState(false)

  /** hooks */
  const {
    data,
    refetch,
    loading: isQueryLoading
  } = useQuery(ROLE, {
    variables: {
      id: props.roleId
    }
  })

  const ref = createRef<any>()

  /** 获取授权页签下的按钮 */
  const tabBarExtraContent = useMemo(() => {
    if (props.actived !== 'authorization') return undefined
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
    refetch()
  }

  /** tab 变更 */
  const onTabChange = (key: string) => {
    setIsEditable(false)
    props.onTabChange && props.onTabChange(key)
  }

  return (
    <Card
      className={props.className}
      tabList={tabs}
      activeTabKey={props.actived}
      onTabChange={onTabChange}
      title={title}
      tabBarExtraContent={tabBarExtraContent}
      loading={isQueryLoading}
    >
      {/* 用户 */}
      {props.actived === 'user' && <Users roleId={props.roleId} userIds={data?.role.userIds || []} onSubmitted={onSubmitted} />}

      {/* 权限 */}
      {props.actived === 'authorization' && (
        <Authorizations
          ref={ref}
          roleId={props.roleId}
          isDisabled={!isEditable}
          onSubmit={onSubmit}
          onSubmitted={onSubmitted}
          authorizationIds={data?.role.authorizationIds || []}
        ></Authorizations>
      )}
    </Card>
  )
}

export default Roles4Auth
