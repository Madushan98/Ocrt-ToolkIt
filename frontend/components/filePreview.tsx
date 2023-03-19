'use client'
import { useState, useContext, useEffect } from 'react'
import { FileContext } from '../app/context'


const FilePreview = () => {
    const fileContext = useContext(FileContext)

    return (
        <div style={{ paddingTop: '2rem' }}>
          {fileContext?.previewUrl ? (
            <img
              className="h-48 w-full object-cover md:h-full md:w-60"
              src={fileContext?.previewUrl}
              alt="File Preview"
            />
          ) : (
            <div className="h-48 w-full bg-gray-100 flex justify-center items-center">
              <span className="text-gray-500">No file selected</span>
            </div>
          )}
        </div>
      )
    }


export default FilePreview