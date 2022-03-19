// react
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
// antd
import { Tree } from 'antd'
// project
import { permissionTree } from './assets'
import { update } from '../../../apis/role'
import type { Props } from './assets'

const Permissions = forwardRef<any, Props>((props, ref) => {
  const [checkedKeys, setCheckedKeys] = useState<number[]>([])

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
        // 请求
        await update(props.roleId, {
          authorizationIds: checkedKeys
        })
        // 结束回调
        props.onSubmitted()
      }
    }),
    [checkedKeys]
  )

  /** 渲染 已授权 */
  useEffect(() => {
    setCheckedKeys(props.authorizationIds)
  }, [props.authorizationIds])

  return <Tree checkStrictly treeData={permissionTree} checkedKeys={checkedKeys} checkable disabled={props.isDisabled} onCheck={onCheck} />
})

export default Permissions
