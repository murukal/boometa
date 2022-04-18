// react
import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
// router
import { useParams, useNavigate } from 'react-router-dom'
// antd
import { Input, Button, Drawer, Collapse, Form, Select, Upload, notification } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { SaveFilled, AlignRightOutlined, PlusOutlined } from '@ant-design/icons'
// third
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useQuery } from '@apollo/client'
// project
import Editor from '~/components/Beeeditor'
import styles from './Essay.module.css'
import { TAGS } from '~/apis/tag'
import { customRequest, getUploadParam, getValueFromEvent } from '~/utils/upload'
import type { FormValues } from '.'
import type { CreateEssayInput } from '~/typings/essay'
import { create, getEssay, update } from '~/apis/essay'

const { Panel } = Collapse
const { Item } = Form

const Essay = () => {
  const [title, setTitle] = useState('')
  const [isOpened, setIsOpened] = useState(false)
  const [initialValues, setInitialValues] = useState<FormValues>()
  const [initialContent, setInitialContent] = useState<string>()

  const urlParams = useParams()
  const navigate = useNavigate()
  const [form] = useForm<FormValues>()
  const { data } = useQuery(TAGS)

  /**
   * 初始渲染
   */
  useEffect(() => {
    urlParams.id &&
      getEssay(Number(urlParams.id)).then(({ data }) => {
        const essay = data?.essay

        setInitialValues(
          essay && {
            tagIds: essay.tagIds,
            fileList: getUploadParam({
              id: essay.id,
              name: essay.title,
              url: essay.cover
            })?.fileList
          }
        )
        setTitle(essay?.title || '')
        setInitialContent(essay?.content || '')

        // 重置表单
        form.resetFields()
      })
  }, [])

  /**
   * 保存按钮
   */
  const SaveButton = () => {
    const [editor] = useLexicalComposerContext()

    const onSave = async () => {
      const isValidated = await form
        .validateFields()
        .catch(({ errorFields }: { errorFields: { errors: string[] }[] }) => {
          const message = errorFields.at(0)?.errors?.at(0)

          // 报错
          message &&
            notification.error({
              message: '辅助信息缺失',
              description: message
            })

          return false
        })

      if (!isValidated) return

      // 处理需要提交的数据
      const formValues = form.getFieldsValue()
      const params: CreateEssayInput = {
        title,
        content: JSON.stringify(editor.getEditorState().toJSON()),
        cover: formValues.fileList?.at(0)?.response?.data || '',
        tagIds: formValues.tagIds
      }

      const handlers = {
        create: () => create(params),
        update: () => {
          if (!urlParams.id) return
          return update(Number(urlParams.id), params)
        }
      }

      const result = await handlers[urlParams.id ? 'update' : 'create']()
      // 路由跳转到文章列表
      result?.data && navigate('/essays')
    }

    return (
      <Button
        type='primary'
        shape='circle'
        icon={<SaveFilled />}
        size='large'
        className={styles['button-save']}
        onClick={onSave}
      />
    )
  }

  /**
   * 打开辅助面板按钮
   */
  const HelpButton = () => {
    const onOpen = () => {
      setIsOpened(true)
    }

    return (
      <Button
        shape='circle'
        icon={<AlignRightOutlined />}
        size='large'
        className={styles['button-help']}
        onClick={onOpen}
      />
    )
  }

  /**
   * 修改标题
   */
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  return (
    <>
      <Editor defaultValue={initialContent}>
        <Input placeholder='请输入标题' className={styles.title} value={title} onChange={onTitleChange} />

        <HelpButton />
        <SaveButton />
      </Editor>

      <Drawer
        title='辅助面板'
        visible={isOpened}
        onClose={() => {
          setIsOpened(false)
        }}
        width={500}
        forceRender
      >
        <Collapse defaultActiveKey={['1']}>
          <Panel header='额外信息' key='1'>
            <Form form={form} initialValues={initialValues}>
              <Item
                label='文章封面'
                name='fileList'
                labelCol={{ span: 6 }}
                valuePropName='fileList'
                getValueFromEvent={getValueFromEvent}
              >
                <Upload listType='picture-card' customRequest={customRequest}>
                  <PlusOutlined />
                </Upload>
              </Item>

              <Item
                label='文章标签'
                name='tagIds'
                labelCol={{ span: 6 }}
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Select
                  mode='multiple'
                  options={data?.tags.items?.map((tag) => ({
                    value: tag.id,
                    label: tag.name
                  }))}
                />
              </Item>
            </Form>
          </Panel>
          <Panel header='填写帮助' key='2'>
            <p>待完善</p>
          </Panel>
        </Collapse>
      </Drawer>
    </>
  )
}

export default Essay
