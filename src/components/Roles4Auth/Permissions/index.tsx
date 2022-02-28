// react
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
// antd
import { Tree } from 'antd'
// project
import { permissionTree, separator } from './assets'
import { update } from '../../../apis/role'
import { responseNotification } from '../../../utils/notification'
import type { Props, PermissionModel } from './assets'
import type { AbilityKey, Permission, PermissionKey } from '../../../typings/role'

const Permissions = forwardRef<any, Props>((props, ref) => {
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])
  const [permissions, setPermissions] = useState<Permission[]>([])

  /** 选择树节点 */
  const onCheck = ({ checked }: any) => {
    // 同步树的state
    setCheckedKeys(checked)

    // 生成 权限model
    const model = (checked as string[]).reduce<PermissionModel>((permissionModel, nodeKey) => {
      const [permissionKey, abilityKey] = nodeKey.split(separator) as [PermissionKey, AbilityKey]

      return Object.assign({}, permissionModel, {
        [permissionKey]: (permissionModel[permissionKey] || []).concat([abilityKey])
      })
    }, {})

    // model 转 数组
    setPermissions(
      (Object.keys(model) as PermissionKey[]).map((permissionKey) => {
        return {
          key: permissionKey,
          abilities: model[permissionKey] || []
        }
      })
    )
  }

  /** ref */
  useImperativeHandle(ref, () => ({
    /** 提交 */
    onSubmit: async () => {
      // 预回调
      props.onSubmit()
      // 展现消息
      responseNotification(
        await update(props.roleId, {
          permissions
        })
      )
      // 结束回调
      props.onSubmitted()
    }
  }))

  /** 渲染 已授权 */
  useEffect(() => {
    setCheckedKeys(
      props.permissions.reduce<string[]>((total, current) => {
        return total.concat(current.abilities.map((abilityKey) => `${current.key}${separator}${abilityKey}`))
      }, [])
    )
  }, [props.permissions])

  return (
    <Tree
      checkStrictly
      treeData={permissionTree}
      checkedKeys={checkedKeys}
      checkable
      disabled={props.isDisabled}
      onCheck={onCheck}
    />
  )
})

export default Permissions
