// react
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
// antd
import { Tree } from 'antd'
// project
import { update } from '~/apis/role'
import { useQuery } from '@apollo/client'
import { AUTHORIZATION_TREE } from '~/apis/auth'
import type { Props } from '.'
import { AuthorizationNode } from '~/typings/auth'

const Authorizations = forwardRef<any, Props>((props, ref) => {
  const [checkedKeys, setCheckedKeys] = useState<number[]>([])
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])
  const [tree, setTree] = useState<AuthorizationNode[]>([])

  /** hooks */
  useQuery(AUTHORIZATION_TREE, {
    onCompleted: (data) => {
      const treeProfile = data.authorizationTree.reduce<{
        treeData: AuthorizationNode[]
        expandedKeys: string[]
      }>(
        (prev, current) => {
          // 生成树节点
          const node = {
            ...current,
            checkable: false,
            children: current.children.map((resourceNode) => {
              // 填充展开节点
              prev.expandedKeys.push(resourceNode.key)

              return {
                ...resourceNode,
                checkable: false,
                children: resourceNode.children.map((actionNode) => {
                  return {
                    ...actionNode,
                    checkable: true
                  }
                })
              }
            })
          }

          // 填充展开节点
          prev.expandedKeys.push(node.key)
          // 填充树节点
          prev.treeData.push(node)

          return prev
        },
        {
          treeData: [],
          expandedKeys: []
        }
      )

      setTree(treeProfile.treeData)
      setExpandedKeys(treeProfile.expandedKeys)
    }
  })

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

  return (
    <Tree
      checkStrictly
      treeData={tree}
      checkedKeys={checkedKeys}
      checkable
      disabled={props.isDisabled}
      onCheck={onCheck}
      expandedKeys={expandedKeys}
    />
  )
})

export default Authorizations
