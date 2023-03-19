'use client';
import { url } from 'inspector';
import { useState, createContext, useContext } from 'react'
import FilePreview from './filePreview';
import { FileContext } from '../app/context';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] =  useState<Blob | null>(null)
  const fileContext = useContext(FileContext)

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement> ) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
        setSelectedFile(selectedFile)
        console.log(URL.createObjectURL(selectedFile))
        fileContext?.setPreviewUrl(URL.createObjectURL(selectedFile))
    }
   
  }

  const handleUpload = () => {
    // TODO: Implement file upload logic
  }

  return (
    <div className="max-w-sm mx-auto mt-6 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Select a file
          </div>
          <input type="file" onChange={handleFileInput} />
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 mt-4 rounded"
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  )
}

export default FileUpload