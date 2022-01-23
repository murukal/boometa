// npm
import path from 'path-browserify'
// react
import { ChangeEvent } from 'react'
import { useState, forwardRef, useEffect } from 'react'
// antd
import type { FormInstance } from 'antd'
import { Form, Input, InputNumber, Select } from 'antd'
// project
import type { UpdateMenu } from '../../../typings/menu'
import type { Props } from './assets'
import { create, update } from '../../../apis/menu'
import { responseNotification } from '../../../utils/notification'
import IconSelector from '../../IconSelector'
import { getInitialSingleton } from './assets'
import { DictionaryEnum } from '../../../typings/dictionaryEnum'

const Menu = forwardRef<FormInstance, Props>((props, ref) => {
  const singleton = getInitialSingleton()

  const [description, setDescription] = useState(singleton.description)
  const [sort, setSort] = useState(singleton.sort)
  const [componentPath, setComponentPath] = useState(singleton.componentPath)
  const [icon, setIcon] = useState(singleton.icon)
  const [to, setTo] = useState(singleton.to)
  const [permission, setPermission] = useState(singleton.permission)

  const [permissions, setPermissions] = useState<Array<Pick<DictionaryEnum, 'code' | 'description'>>>([])

  useEffect(() => {
    setDescription(props.singleton.description)
    setSort(props.singleton.sort)
    setComponentPath(props.singleton.componentPath)
    setIcon(props.singleton.icon)
    setTo(props.singleton.to)
    setPermission(props.singleton.permission)
  }, [props.singleton])

  useEffect(() => {
    setPermissions([
      {
        code: '12321',
        description: '1231Ï2'
      }
    ])
  }, [])

  /**
   * 组件的路径
   */
  const componentPaths = require
    .context('../../../pages/', true, /tsx$/)
    .keys()
    .map((componentPath) => {
      const actualPath = path.join('pages', path.dirname(componentPath))

      return {
        label: actualPath,
        value: actualPath
      }
    })

  /**
   * 菜单描述变更
   * @param e
   */
  const onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  /**
   * 排序码变更
   * @param value
   */
  const onSortChange = (value: number) => {
    setSort(value)
  }

  /**
   * 菜单路由发生变更
   */
  const onToChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTo(e.target.value)
  }

  /**
   * 菜单组件路径变更
   */
  const onComponentPathChange = (value: string) => {
    setComponentPath(value)
  }

  /**
   * 图标发生变更
   */
  const onIconChange = (value: string) => {
    setIcon(value)
  }

  /** 选择权限 */
  const onPermissionChange = (value: Array<string>) => {
    setPermission(value)
  }

  /**
   * 表单提交事件
   */
  const onSubmit = async () => {
    const menu: UpdateMenu = {
      description,
      componentPath,
      to,
      sort,
      parent: props.parentId,
      icon
    }

    const handlerMap = {
      create: () =>
        create({
          ...menu,
          tenant: props.tenantId
        }),
      update: () => update(props.singleton._id as string, menu)
    }

    // 提交表单
    const handler = handlerMap[props.singleton._id ? 'update' : 'create']
    const res = await handler()
    responseNotification(res)
    !res.code && props.onSubmitted && props.onSubmitted()
  }

  return (
    <Form labelCol={{ span: 6 }} onFinish={onSubmit} ref={ref}>
      <Form.Item label='菜单描述'>
        <Input onChange={onDescriptionChange} value={description} />
      </Form.Item>

      <Form.Item label='菜单排序码'>
        <InputNumber className='w-full' onChange={onSortChange} value={sort} />
      </Form.Item>

      <Form.Item label='菜单组件路径'>
        <Select onChange={onComponentPathChange} options={componentPaths} value={componentPath} />
      </Form.Item>

      <Form.Item label='菜单路由'>
        <Input onChange={onToChange} value={to} />
      </Form.Item>

      <Form.Item label='菜单图标'>
        <IconSelector value={icon} onChange={onIconChange} />
      </Form.Item>

      <Form.Item label='菜单权限通行证'>
        <Select
          mode='multiple'
          allowClear
          value={permission}
          onChange={onPermissionChange}
          options={permissions}
          fieldNames={{
            label: 'description',
            value: 'code'
          }}
        />
      </Form.Item>
    </Form>
  )
})

export default Menu
