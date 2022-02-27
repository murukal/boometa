// react
import { createRef, useEffect, useState } from 'react'
// third
import { EditorState, basicSetup } from '@codemirror/basic-setup'
import { EditorView } from '@codemirror/view'
import { markdown } from '@codemirror/lang-markdown'
import { StateField } from '@codemirror/state'
// project
import type { Props } from './assets'

export const Editor = (props: Props) => {
  const [editor, setEditor] = useState<EditorView>()

  const ref = createRef<HTMLDivElement>()

  useEffect(() => {
    // 挂载之前保证editor对象已经被清除
    editor?.destroy()

    const height = props.height || ref.current?.clientHeight

    const theme = EditorView.theme(
      {
        '&': {
          height: height ? `${height}px` : null,
          color: 'white',
          backgroundColor: '#034'
        },
        '.cm-scroller': { overflow: 'auto' },
        '.cm-content': {
          caretColor: '#0e9'
        },
        '&.cm-focused .cm-selectionBackground, ::selection': {
          backgroundColor: '#074'
        },
        '.cm-gutters': {
          backgroundColor: '#045',
          color: '#ddd',
          border: 'none'
        }
      },
      {
        dark: true
      }
    )

    if (ref.current) {
      // 生成变更的监听事件
      const onChange = StateField.define({
        create: () => null,
        update: (value, transaction) => {
          // 事务发生变更
          if (transaction.docChanged) {
            // 调用的变更事件
            props.onChange && props.onChange(transaction.newDoc.toString())
          }
          return null
        }
      })

      setEditor(
        new EditorView({
          state: EditorState.create({
            doc: props.value,
            extensions: [basicSetup, markdown(), theme, onChange]
          }),
          parent: ref.current
        })
      )
    }

    // 取消订阅
    return () => {
      editor?.destroy()
    }
  }, [props])

  return <div className={props.className} ref={ref} />
}

export default Editor
