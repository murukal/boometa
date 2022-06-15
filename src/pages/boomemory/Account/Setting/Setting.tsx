import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, Input, Row, Upload } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { State } from '~/redux'
import { User } from '~/typings/boomemory/user'
import { customRequest, getValueFromEvent } from '~/utils/upload'

const { Item } = Form

const Setting = () => {
  const user = useSelector<State, User | undefined>((state) => state.userProfile.user)
  const [form] = useForm()

  useEffect(() => {
    form.setFieldsValue(user)
  }, [])

  /**
   * 基本信息保存
   */
  const onBaseSave = () => {}

  return (
    <>
      <Card
        title='基本信息'
        style={{
          marginBottom: 16
        }}
        extra={
          <Button onClick={onBaseSave} type='primary'>
            保存
          </Button>
        }
      >
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Row gutter={[32, 8]}>
            <Col
              span={12}
              style={{
                borderRight: '1px solid #e8e8e8'
              }}
            >
              <Row>
                <Col span={24}>
                  <Item label='用户名' name='username'>
                    <Input />
                  </Item>
                </Col>

                <Col span={24}>
                  <Item label='邮箱' name='email'>
                    <Input disabled />
                  </Item>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <Item label='头像' name='fileList' valuePropName='fileList' getValueFromEvent={getValueFromEvent}>
                    <Upload listType='picture-card' customRequest={customRequest}>
                      <PlusOutlined />
                    </Upload>
                  </Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card title='登录方式'></Card>
    </>
  )
}

export default Setting
