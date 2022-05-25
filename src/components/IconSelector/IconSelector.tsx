// react
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
// antd
import { Col, Input, Modal, Row, Tabs, Tag, Typography, Space, Button } from 'antd'
// project
import { metadatas, Icons, getIcon } from '.'
import type { Props, IconKey } from '.'

const { TabPane } = Tabs
const { CheckableTag } = Tag
const { Text } = Typography

export const IconSelector = (props: Props) => {
  const SettingOutlined = Icons.SettingOutlined
  const [isOpened, setIsOpened] = useState(false)
  const [checked, setChecked] = useState<IconKey>()

  useEffect(() => {
    setChecked(props.value as IconKey)
  }, [props.value])

  /**
   * 打开弹窗
   */
  const onOpen = () => {
    if (props.type === 'ant-design') {
      setIsOpened(true)
    } else {
      window.open('https://materialdesignicons.com/')
    }
  }

  /**
   * 关闭弹窗
   */
  const onClose = () => {
    setIsOpened(false)
  }

  /**
   * 选择图标
   */
  const onCheck = (icon: IconKey) => () => {
    setChecked(icon)
  }

  const CurrentChecked = useMemo(() => {
    // 值不存在，直接返回null
    if (!checked) return null
    // 匹配
    const Icon = Icons[checked]
    // 按钮不存在
    if (!Icon) return null
    // 返回UI
    return (
      <Icon
        style={{
          fontSize: 24
        }}
      />
    )
  }, [checked])

  /**
   * 对话框确认
   */
  const onSubmit = () => {
    props.onChange && props.onChange(checked)
    onClose()
  }

  /**
   * 输入
   */
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.value as IconKey)
    props.onChange && props.onChange(e.target.value)
  }

  return (
    <>
      <Input addonAfter={<SettingOutlined onClick={onOpen} />} value={props.value} onChange={onChange} />

      <Modal
        visible={isOpened}
        onCancel={onClose}
        closable={false}
        width={800}
        footer={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Text>当前选择：</Text>
              {CurrentChecked}
            </div>

            <Space>
              <Button onClick={onClose}>取消</Button>
              <Button type='primary' onClick={onSubmit}>
                确认
              </Button>
            </Space>
          </div>
        }
      >
        <Tabs>
          {metadatas.map((metadata, index) => (
            <TabPane
              tab={metadata.title}
              key={index}
              style={{
                maxHeight: 500,
                overflowY: 'scroll'
              }}
            >
              <Row gutter={[0, 4]}>
                {metadata.icons?.map((icon) => {
                  const Icon = getIcon(icon)

                  return (
                    <Col
                      key={icon}
                      span={3}
                      style={{
                        textAlign: 'center'
                      }}
                    >
                      <CheckableTag
                        checked={(checked || props.value) === icon}
                        onClick={onCheck(icon)}
                        style={{
                          padding: 4
                        }}
                      >
                        <Icon
                          style={{
                            fontSize: 32
                          }}
                        />
                      </CheckableTag>
                    </Col>
                  )
                })}
              </Row>
            </TabPane>
          ))}
        </Tabs>
      </Modal>
    </>
  )
}

export default IconSelector
