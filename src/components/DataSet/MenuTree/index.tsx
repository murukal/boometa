// react
import { Key, useMemo } from 'react'
import { useEffect, useState } from 'react'
// antd
import { Tree } from 'antd'
import { getTenants } from '../../../apis/tenant'
import { getMenuTrees } from '../../../apis/menu'
// project
import type { Props, TreeDataType } from './assets'

const MenuTree = (props: Props) => {
  const [treeData, setTreeData] = useState<TreeDataType[]>([])

  const onFetch = async () => {
    // 请求租户数据
    const tenantsRes = await getTenants()
    const tenants = tenantsRes.data || []
    const menuTreesRes = await getMenuTrees(tenants.map((tenant) => tenant._id))
    const menuTrees = menuTreesRes.data || []

    // 生成树
    const results: TreeDataType[] = menuTrees.map((menuTree) => {
      const tenant = tenants.find((tenant) => tenant._id === menuTree.tenant)

      return {
        _id: menuTree.tenant,
        children: menuTree.nodes,
        description: tenant?.description
      }
    })

    setTreeData(results)
  }

  const onCheck = (checkedKeys: Key[] | { checked: Key[]; halfChecked: Key[] }) => {
    props.onCheck && props.onCheck(checkedKeys as string[])
  }

  // 避免渲染报错
  const checkedKeys = useMemo(() => {
    if (!treeData.length) return []
    return props.menus
  }, [props.menus, treeData])

  // 初次渲染请求数据
  useEffect(() => {
    onFetch()
  }, [])

  return (
    <Tree
      fieldNames={{
        title: 'description',
        key: '_id'
      }}
      treeData={treeData as []}
      checkedKeys={checkedKeys}
      checkable
      disabled={props.isDisable}
      onCheck={onCheck}
    />
  )
}

export default MenuTree
