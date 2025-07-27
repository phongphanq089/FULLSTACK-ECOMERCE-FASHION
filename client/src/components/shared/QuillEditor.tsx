/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useRef } from 'react'

interface EditorJSComponentProps {
  holderId: string
  initialData?: any
}

export default function EditorJSComponent({
  holderId,
  initialData,
}: EditorJSComponentProps) {
  const ref = useRef<any>(null)

  useEffect(() => {
    const init = async () => {
      const EditorJS = (await import('@editorjs/editorjs')).default
      const Header = (await import('@editorjs/header')).default
      const Paragraph = (await import('@editorjs/paragraph')).default
      const List = (await import('@editorjs/list')).default
      const Table = (await import('@editorjs/table')).default

      if (!ref.current) {
        const editor = new EditorJS({
          holder: holderId,
          tools: {
            header: Header,
            paragraph: Paragraph,
            list: List,
            table: Table,
          },
          data: initialData || { blocks: [] },
          onReady() {
            ref.current = editor
          },
        })
      }
    }

    init()

    return () => {
      if (ref.current?.destroy) {
        ref.current.destroy()
        ref.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holderId])

  return <div id={holderId} className='shadow py-5 px-[50px] md:px-[90px] ' />
}
