// project
import type { Menu } from '../typings/menu'

/**
 * 递归函数
 */
const group = ([parents, children]: [Menu[], Menu[]]) => {
  // 递归终止
  if (!children.length) return parents

  if (parents.length) {
    parents = parents.map((parent) => {
      const currentChildren: Menu[] = []

      children = children.filter((menu) => {
        const isChild = menu.parentId === parent.id
        isChild && currentChildren.push(menu)
        return !isChild
      })

      // 递归
      return {
        ...parent,
        children: currentChildren.length ? group([currentChildren, children]) : undefined
      }
    })
  } else {
    children = children.filter((menu) => {
      const isChild = !!menu.parentId
      !isChild && parents.push(menu)
      return isChild
    })

    // 递归
    if (children.length) {
      parents = group([parents, children])
    }
  }

  return parents
}

/**
 * 菜单树
 */
export const getMenuTreeFromMenus = (menus?: Menu[]) => {
  return group([[], menus || []])
}
