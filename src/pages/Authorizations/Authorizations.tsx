// react
import { useState } from 'react'
import type { Key } from 'react'
// antd
import { Card, Drawer, Tree } from 'antd'
import type { EventDataNode } from 'antd/lib/tree'
// third
import { useQuery } from '@apollo/client'
// project
import { AUTHORIZATION_TREE } from '~/apis/auth'
import Singleton from '~/components/Singleton'
import { Tenant } from './Singletons'
import type { AuthorizationNode, NodeType } from '~/typings/auth'

const Authorizations = () => {
  const [isTenantDrawerOpened, setIsTenantDrawerOpened] = useState(false)
  const [isResourceDrawerOpened, setIsResourceDrawerOpened] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([])
  const [authorizationNode, setAuthorizationNode] = useState<AuthorizationNode>()

  const { data } = useQuery(AUTHORIZATION_TREE)

  /**
   * 树节点的选中事件
   */
  const onSelect = (
    selectedKeys: Key[],
    { node }: { node: EventDataNode & { __typename?: NodeType; code?: string } }
  ) => {
    setSelectedKeys(selectedKeys)

    if (node.__typename === 'AuthorizationNode') {
      setAuthorizationNode({
        children: node.children as []
      })
      setIsTenantDrawerOpened(true)
    } else if (node.__typename === 'ResourceNode') {
      setIsResourceDrawerOpened(true)
    }
  }

  /**
   * 抽屉关闭事件
   */
  const onClose = () => {
    isTenantDrawerOpened && setIsTenantDrawerOpened(false)
    isResourceDrawerOpened && setIsResourceDrawerOpened(false)
    setSelectedKeys([])
  }

  return (
    <Card>
      <Tree treeData={data?.authorizationTree} selectedKeys={selectedKeys} onSelect={onSelect} />

      <Singleton
        isOpened={isTenantDrawerOpened}
        singleton={authorizationNode as AuthorizationNode}
        singletonComponent={Tenant}
      />

      <Drawer visible={isResourceDrawerOpened} onClose={onClose}></Drawer>
    </Card>
  )
}

export default Authorizations
