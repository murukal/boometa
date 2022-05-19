// react
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import type { Key } from 'react'
// antd
import { Tree } from 'antd'
// project
import { update } from '~/apis/role'
import { useQuery } from '@apollo/client'
import { AUTHORIZATION_TREE } from '~/apis/boomemory/auth'
import type { Props } from '.'
import { AuthorizationNode } from '~/typings/auth'
import { resultNotification } from '~/utils/notification'

const Authorizations = forwardRef<any, Props>((props, ref) => {
  const [checkedKeys, setCheckedKeys] = useState<number[]>([])
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([])
  const [tree, setTree] = useState<AuthorizationNode[]>([])

  /**
   * 请求权限树
   */
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

  /**
   * 选择树节点
   */
  const onCheck = ({ checked }: any) => {
    setCheckedKeys(checked)
  }

  /**
   * 事件拦截
   */
  useImperativeHandle(
    ref,
    () => ({
      /** 提交 */
      onSubmit: async () => {
        // 预回调
        props.onSubmit()
        // 请求
        const result = await update(props.roleId, {
          authorizationIds: checkedKeys
        })
        resultNotification(result)
        // 结束回调
        props.onSubmitted(result.data?.updateRole)
      }
    }),
    [checkedKeys]
  )

  /**
   * 渲染
   */
  useEffect(() => {
    setCheckedKeys(props.authorizationIds)
  }, [props.authorizationIds])

  /**
   * 节点展开或者收起
   */
  const onExpand = (expandedKeys: Key[]) => {
    setExpandedKeys(expandedKeys)
  }

  return (
    <Tree
      checkStrictly
      treeData={tree}
      checkedKeys={checkedKeys}
      checkable
      disabled={props.isDisabled}
      onCheck={onCheck}
      expandedKeys={expandedKeys}
      onExpand={onExpand}
    />
  )
})

export default Authorizations
