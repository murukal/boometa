// react
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
// antd
import { Col, Input, Modal, Row, Tabs, Tag, Typography, Space, Button } from 'antd'
// project
import { metadatas, AntDIcons, MDIcons, MDIconKey, getIcon } from '.'
import type { Props, IconKey, AntDIconKey } from '.'

const { TabPane } = Tabs
const { CheckableTag } = Tag
const { Text } = Typography

export const IconSelector = (props: Props) => {
  const SettingOutlined = AntDIcons.SettingOutlined
  const [isOpened, setIsOpened] = useState(false)
  const [checked, setChecked] = useState<IconKey>()

  useEffect(() => {
    setChecked(props.value as IconKey)
  }, [props.value])

  const onOpen = () => {
    setIsOpened(true)
  }

  const onClose = () => {
    setIsOpened(false)
  }

  const onCheck = (icon: IconKey) => () => {
    setChecked(icon)
  }

  const CurrentChecked = useMemo(() => {
    // 值不存在，直接返回null
    if (!checked) return null
    // 匹配
    const Icon = AntDIcons[checked as AntDIconKey] || MDIcons[checked as MDIconKey]
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
      <Input addonAfter={<SettingOutlined onClick={onOpen} />} value={checked} onChange={onChange} />

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

    // <Select value={props.value} onChange={props.onChange} allowClear>
    //   {Object.keys(Icons).map((key) => {
    //     return (
    //       <Option key={key} value={key}>
    //         <div className='flex items-center'>
    //           {createElement(Icons[key as keyof typeof Icons])}
    //           <p className='ml-1 mb-0'>{key}</p>
    //         </div>
    //       </Option>
    //     )
    //   })}
    // </Select>
  )
}

export default IconSelector
