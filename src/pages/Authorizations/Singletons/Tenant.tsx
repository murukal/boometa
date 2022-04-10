// react
import { forwardRef } from 'react'
// antd
import { Checkbox, Collapse, Form } from 'antd'
import type { FormInstance } from 'antd'
// project
import { useQuery } from '@apollo/client'
import { AUTHORIZATION_ACTIONS, AUTHORIZATION_RESOURCES } from '~/apis/auth'
import type { SingletonProps } from '~/components/Singleton'
import type { AuthorizationNode } from '~/typings/auth'

const { Panel } = Collapse

const Tenant = forwardRef<FormInstance, SingletonProps<AuthorizationNode>>((props, ref) => {
  const { data: resource } = useQuery(AUTHORIZATION_RESOURCES)
  const { data: actions } = useQuery(AUTHORIZATION_ACTIONS)

  console.log('props====', props)

  /** 表单提交事件 */
  const onSubmit = async () => {}

  return (
    <Form onFinish={onSubmit} ref={ref}>
      <Collapse>
        {resource?.authorizationResources.map((resource) => {
          const authorizedActions =
            props.singleton.children.find((authorizedResource) => authorizedResource.code === resource.code)
              ?.children || []

          console.log('authorizedActions=====', authorizedActions)

          return (
            <Panel key={resource.code} header={resource.name}>
              {actions?.authorizationActions.map((action) => (
                <Checkbox
                  key={action.code}
                  checked={authorizedActions.some((authorizedAction) => authorizedAction.code === action.code)}
                >
                  {action.name}
                </Checkbox>
              ))}
            </Panel>
          )
        })}
      </Collapse>
    </Form>
  )
})

export default Tenant
