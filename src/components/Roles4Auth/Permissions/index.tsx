// react
import { forwardRef, useImperativeHandle, useState } from 'react'
import type { Key } from 'react'
// antd
import { Tree } from 'antd'
// project
import { permissionTree } from './assets'
import { update } from '../../../apis/role'
import { responseNotification } from '../../../utils/notification'
import type { Props } from './assets'
import type { Permission } from '../../../typings/role'

const Permissions = forwardRef<any, Props>((props, ref) => {
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])
  const [permissions] = useState<Permission[]>([])

  /** 选择树节点 */
  const onCheck = (
    checked:
      | {
          checked: Key[]
          halfChecked: Key[]
        }
      | Key[]
  ) =>
    setCheckedKeys(
      (
        checked as {
          checked: Key[]
          halfChecked: Key[]
        }
      ).checked as string[]
    )

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

  return <Tree checkStrictly treeData={permissionTree} checkedKeys={checkedKeys} checkable disabled={props.isDisabled} onCheck={onCheck} />
})

export default Permissions
