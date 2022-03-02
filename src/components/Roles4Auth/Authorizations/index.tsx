// react
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
// antd
import { Tree } from 'antd'
// project
import { permissionTree } from './assets'
import { update } from '../../../apis/role'
import { responseNotification } from '../../../utils/notification'
import type { Props } from './assets'

const Permissions = forwardRef<any, Props>((props, ref) => {
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])

  /** 选择树节点 */
  const onCheck = ({ checked }: any) => {
    // 同步树的state
    setCheckedKeys(checked)
  }

  /** ref */
  useImperativeHandle(
    ref,
    () => ({
      /** 提交 */
      onSubmit: async () => {
        // 预回调
        props.onSubmit()
        // 展现消息
        responseNotification(
          await update(props.roleId, {
            authorizations: checkedKeys
          })
        )
        // 结束回调
        props.onSubmitted()
      }
    }),
    [checkedKeys]
  )

  /** 渲染 已授权 */
  useEffect(() => {
    setCheckedKeys(props.authorizations)
  }, [props.authorizations])

  return <Tree checkStrictly treeData={permissionTree} checkedKeys={checkedKeys} checkable disabled={props.isDisabled} onCheck={onCheck} />
})

export default Permissions
