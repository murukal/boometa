// npm
import path from 'path-browserify'
// react
import { useState, forwardRef, useEffect, ChangeEvent } from 'react'
// antd
import { Col, Form, FormInstance, Input, InputNumber, Row, Select } from 'antd'
// project
import { MenuTreeNode, UpdateMenu } from '../../../typings/menu'
import { create, update } from '../../../apis/menu'
import { responseNotification } from '../../../utils/notification'
import IconSelector from '../../IconSelector'

export interface Props {
  tenantId: string
  parentId?: string
  singleton?: MenuTreeNode
  onSubmitted?: Function
}

const Menu = forwardRef<FormInstance, Props>((props, formRef) => {
  const [description, setDescription] = useState('')
  const [sort, setSort] = useState(0)
  const [componentPath, setComponentPath] = useState('')
  const [icon, setIcon] = useState('')
  const [to, setTo] = useState('')

  useEffect(() => {
    setDescription(props.singleton?.description || '')
    setSort(props.singleton?.sort || 0)
    setComponentPath(props.singleton?.componentPath || '')
    setIcon(props.singleton?.icon || '')
    setTo(props.singleton?.to || '')
  }, [props.singleton])

  /**
   * 组件的路径
   */
  const componentPaths = require
    .context('../../../pages/', true, /tsx$/)
    .keys()
    .map((componentPath) => {
      const actualPath = path.join('pages', path.dirname(componentPath), path.basename(componentPath, '.tsx'))

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
      update: () => update(props.singleton?._id as string, menu)
    }

    // 提交表单
    const handler = handlerMap[props.singleton?._id ? 'update' : 'create']
    const res = await handler()
    responseNotification(res)
    !res.code && props.onSubmitted && props.onSubmitted()
  }

  return (
    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onFinish={onSubmit} ref={formRef}>
      <Row>
        <Col span={24}>
          <Form.Item label='菜单描述'>
            <Input onChange={onDescriptionChange} value={description} />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item label='菜单排序码'>
            <InputNumber className='w-full' onChange={onSortChange} value={sort} />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item label='菜单组件路径'>
            <Select onChange={onComponentPathChange} options={componentPaths} value={componentPath} />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item label='菜单路由'>
            <Input onChange={onToChange} value={to} />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item label='菜单图标'>
            <IconSelector value={icon} onChange={onIconChange} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
})

export default Menu
