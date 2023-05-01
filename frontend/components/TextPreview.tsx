import React, { useRef } from 'react'
import CloseButton from './CloseButton'
import { TextArea } from '../model/model'
import jsPDF from 'jspdf'
import ActionButton from './ActionButton'

export default function TextPreview({textAreaResult}:TextArea) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const downloadPDF = () => {
        if (textAreaResult) {
            const pdf = new jsPDF()
              pdf.text(textAreaResult,20, 20, {align:'left'} );
              pdf.save('textarea.pdf')
          }
      }

  return (
        <>
            <textarea ref={textareaRef} value={textAreaResult} readOnly className='relative w-full h-full rounded-lg p-1 text-justify'>
            </textarea>
            <div className='absolute top-6 right-6'>
                {textAreaResult && <ActionButton title='Download PDF' rotate='90' nextOnClick={()=>downloadPDF()}></ActionButton>}
            </div>
        </>
  )
}
