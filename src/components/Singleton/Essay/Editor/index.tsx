// third
import { EditorState, basicSetup } from '@codemirror/basic-setup'
import { EditorView } from '@codemirror/view'
import { markdown } from '@codemirror/lang-markdown'
import { createRef, useEffect, useState } from 'react'
// project
import type { Props } from './assets'

export const Editor = (props: Props) => {
  const [editor, setEditor] = useState<EditorView>()

  const ref = createRef<HTMLDivElement>()

  useEffect(() => {
    const theme = EditorView.theme(
      {
        '&': { height: `${ref.current?.clientHeight}px` || null, color: 'white', backgroundColor: '#034' },
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

    ref.current &&
      setEditor(
        new EditorView({
          state: EditorState.create({ extensions: [basicSetup, markdown(), theme] }),
          parent: ref.current
        })
      )

    // 取消订阅
    return () => {
      editor?.destroy()
    }
  }, [])

  return <div className='h-full' ref={ref} />
}

export default Editor
