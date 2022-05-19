// react
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
// antd
import { Checkbox, Collapse, Form, Spin } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import type { FormInstance, CheckboxOptionType } from 'antd'
import type { CheckboxValueType } from 'antd/lib/checkbox/Group'
// third
import { cloneDeep } from 'lodash'
// project
import { useQuery } from '@apollo/client'
import { AUTHORIZATION_ACTIONS, setAuthorizations } from '~/apis/boomemory/auth'
import { ResourceCode } from '~/pages/boomemory/Authorizations'
import { resultNotification } from '~/utils/notification'
import type { Authorized, ExtraProps } from '.'
import type { SingletonProps } from '..'

const { Panel } = Collapse
const { Group } = Checkbox

const Tenant = forwardRef<FormInstance, SingletonProps<Authorized[], ExtraProps>>((props, ref) => {
  const [authorizeds, setAuthorizeds] = useState<Authorized[]>([])
  const [actionOptions, setActionOptions] = useState<CheckboxOptionType[]>([])

  const [form] = useForm()

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

  /**
   * panel缓存渲染
   */
  const panels = useMemo(() => {
    return props.extraProps?.resources?.reduce<{
      activeKeys: string[]
      nodes: ReactNode[]
    }>(
      (prev, resource) => {
        prev.activeKeys.push(resource.code)

        prev.nodes.push(
          <Panel key={resource.code} header={resource.name} showArrow={false}>
            <Group
              options={actionOptions}
              value={authorizeds.find((authorized) => authorized.resourceCode === resource.code)?.actionCodes}
              onChange={onActionToggle(resource.code)}
            />
          </Panel>
        )

        return prev
      },
      {
        activeKeys: [],
        nodes: []
      }
    )
  }, [props.extraProps?.resources, actionOptions, authorizeds])

  /**
   * ref事件
   */
  useImperativeHandle(ref, () => ({
    ...form,
    /**
     * 重置表单
     */
    resetFields: () => {
      setAuthorizeds(cloneDeep(props.singleton))
    }
  }))

  /**
   * 初始化
   */
  useEffect(() => {
    setAuthorizeds(cloneDeep(props.singleton))
  }, [props.singleton])

  /**
   * 表单提交事件
   */
  const onSubmit = async () => {
    const result = props.extraProps?.tenantCode
      ? await setAuthorizations(props.extraProps?.tenantCode, authorizeds)
      : undefined
    resultNotification(result)
    props.onSubmitted(result)
  }

  return (
    <Form onFinish={onSubmit} form={form} ref={ref}>
      <Spin spinning={isActionLoading}>
        <Collapse activeKey={panels?.activeKeys} collapsible='disabled'>
          {panels?.nodes}
        </Collapse>
      </Spin>
    </Form>
  )
})

export default Tenant
