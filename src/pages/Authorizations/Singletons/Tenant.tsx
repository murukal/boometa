// react
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'
// antd
import { Checkbox, Collapse, Form, Spin } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import type { FormInstance, CheckboxOptionType } from 'antd'
import type { CheckboxValueType } from 'antd/lib/checkbox/Group'
// third
import { cloneDeep } from 'lodash'
// project
import { useQuery } from '@apollo/client'
import { AUTHORIZATION_ACTIONS, AUTHORIZATION_RESOURCES, setAuthorizations } from '~/apis/auth'
import { Authorized } from '.'
import { ResourceCode } from '..'
import type { SingletonProps } from '~/components/Singleton'
import type { AuthorizationNode } from '~/typings/auth'
import { resultNotification } from '~/utils/notification'

const { Panel } = Collapse
const { Group } = Checkbox

const Tenant = forwardRef<FormInstance, SingletonProps<AuthorizationNode>>((props, ref) => {
  const [authorizeds, setAuthorizeds] = useState<Authorized[]>([])
  const [activeKeys, setActiveKeys] = useState<string[]>([])
  const [actionOptions, setActionOptions] = useState<CheckboxOptionType[]>([])

  const [form] = useForm()

  const { data: resource, loading: isResourceLoading } = useQuery(AUTHORIZATION_RESOURCES, {
    onCompleted: (data) => {
      setActiveKeys(data.authorizationResources.map((resource) => resource.code))
    }
  })

  const { loading: isActionLoading } = useQuery(AUTHORIZATION_ACTIONS, {
    onCompleted: (data) => {
      setActionOptions(
        data.authorizationActions.map((action) => ({
          label: action.name,
          value: action.code
        }))
      )
    }
  })

  /**
   * 初始化的权限分配
   */
  const initialAuthorizeds = useMemo(() => {
    return props.singleton.children.map((resource) => ({
      resourceCode: resource.code,
      actionCodes: resource.children.map((action) => action.code)
    }))
  }, [props.singleton.children])

  /**
   * ref事件
   */
  useImperativeHandle(ref, () => ({
    ...form,
    /**
     * 重置表单
     */
    resetFields: () => {
      setAuthorizeds(cloneDeep(initialAuthorizeds))
    }
  }))

  /**
   * 初始化
   */
  useEffect(() => {
    setAuthorizeds(cloneDeep(initialAuthorizeds))
  }, [initialAuthorizeds])

  /**
   * 表单提交事件
   */
  const onSubmit = async () => {
    const result = props.singleton.code ? await setAuthorizations(props.singleton.code, authorizeds) : undefined
    resultNotification(result)
    props.onSubmitted(result)
  }

  /**
   * 更改权限
   */
  const onActionToggle = (resourceCode: ResourceCode) => (actionCodes: Array<CheckboxValueType>) => {
    setAuthorizeds((authorizeds) => {
      const resource = authorizeds.find((authorized) => authorized.resourceCode === resourceCode)
      if (resource) {
        resource.actionCodes = actionCodes as []
      } else {
        authorizeds.push({
          resourceCode,
          actionCodes: actionCodes as []
        })
      }
      return cloneDeep(authorizeds)
    })
  }

  return (
    <Form onFinish={onSubmit} form={form} ref={ref}>
      <Spin spinning={isActionLoading || isResourceLoading}>
        <Collapse activeKey={activeKeys} collapsible='disabled'>
          {resource?.authorizationResources.map((resource) => {
            return (
              <Panel key={resource.code} header={resource.name} showArrow={false}>
                <Group
                  options={actionOptions}
                  value={authorizeds.find((authorized) => authorized.resourceCode === resource.code)?.actionCodes}
                  onChange={onActionToggle(resource.code)}
                />
              </Panel>
            )
          })}
        </Collapse>
      </Spin>
    </Form>
  )
})

export default Tenant
