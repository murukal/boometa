// react
import { useState } from 'react'
import type { Key } from 'react'
// antd
import { Card, Table, Tree } from 'antd'
// third
import { useQuery } from '@apollo/client'
// project
import { AUTHORIZATION_ACTIONS, AUTHORIZATION_RESOURCES, AUTHORIZATION_TREE } from '~/apis/auth'
import Singleton from '~/components/Singleton'
import { getActionColumns, getResourceColumns } from '.'
import Authorization from './Singletons'
import type { Authorized, ExtraProps } from './Singletons'
import type { AuthorizationNode } from '~/typings/auth'

const Authorizations = () => {
  const [isAuthorizationOpened, setIsAuthorizationOpened] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([])
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])
  const [authorizeds, setAuthorizeds] = useState<Authorized[]>([])
  const [extraProps, setExtraProps] = useState<ExtraProps>()

  /**
   * 权限树
   */
  const {
    data: authorizationTree,
    refetch,
    loading: isAuthorizationTreeLoading
  } = useQuery(AUTHORIZATION_TREE, {
    onCompleted: (data) => {
      setExpandedKeys(
        data.authorizationTree.flatMap((authorizationNode) => {
          const keys = authorizationNode.children.map((resourceNode) => resourceNode.key)
          authorizationNode.key && keys.push(authorizationNode.key)
          return keys
        })
      )
    }
  })

  /**
   * 权限资源
   */
  const { data: resources, loading: isResourceLoading } = useQuery(AUTHORIZATION_RESOURCES)

  /**
   * 权限操作
   */
  const { data: actions, loading: isActionLoading } = useQuery(AUTHORIZATION_ACTIONS)

  /**
   * 树节点的选中事件
   */
  const onSelect = (selectedKeys: Key[], { selectedNodes }: { selectedNodes: AuthorizationNode[] }) => {
    setSelectedKeys(selectedKeys)

    const node = selectedNodes.at(0)

    // 节点不存在
    if (!node) return
    // 非租户节点不处理
    if (!(node.__typename === 'AuthorizationNode')) return

    setAuthorizeds(
      node.children?.map((resourceNode) => ({
        resourceCode: resourceNode.code,
        actionCodes: resourceNode.children.map((actionNode) => actionNode.code)
      })) || []
    )
    setExtraProps({
      tenantCode: node.code,
      resources: resources?.authorizationResources
    })
    setIsAuthorizationOpened(true)
  }

  /**
   * 抽屉关闭事件
   */
  const onClose = () => {
    setIsAuthorizationOpened(false)
    setSelectedKeys([])
  }

  /**
   * 提交后的回调
   */
  const onSubmitted = () => {
    onClose()
    refetch()
  }

  return (
    <div
      style={{
        height: '100%',
        display: 'grid',
        grid: '"authorizations resources" "authorizations actions"',
        gap: '12px'
      }}
    >
      <Card
        title='分配权限'
        style={{
          gridArea: 'authorizations'
        }}
        loading={isAuthorizationTreeLoading}
      >
        <Tree treeData={authorizationTree?.authorizationTree} selectedKeys={selectedKeys} onSelect={onSelect} expandedKeys={expandedKeys} />

        <Singleton
          title='分配权限'
          isOpened={isAuthorizationOpened}
          singleton={authorizeds}
          singletonComponent={Authorization}
          extraProps={extraProps}
          onClose={onClose}
          onSubmitted={onSubmitted}
        />
      </Card>

      <Card
        style={{
          gridArea: 'resources'
        }}
        title='权限资源'
      >
        <Table
          rowKey='code'
          bordered={true}
          dataSource={resources?.authorizationResources}
          columns={getResourceColumns()}
          loading={isResourceLoading}
          pagination={{
            pageSize: 4
          }}
        />
      </Card>

      <Card
        style={{
          gridArea: 'actions'
        }}
        title='权限操作'
      >
        <Table
          rowKey='code'
          bordered={true}
          dataSource={actions?.authorizationActions}
          columns={getActionColumns()}
          loading={isActionLoading}
          pagination={{
            pageSize: 4
          }}
        />
      </Card>
    </div>
  )
}

export default Authorizations
