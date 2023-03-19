'use client'
import { useState, useContext, useEffect } from 'react'
import { FileContext } from '../app/context'


const FilePreview = () => {
    const fileContext = useContext(FileContext)
    const [hovered, setHovered] = useState(false)

    const handleHover = () => {
        setHovered(true)
    }

    const handleLeave = () => {
        setHovered(false)
    }

    return (
        <div style={{ paddingTop: '2rem' }}
            className={`relative overflow-hidden ${hovered ? 'shadow-xl' : 'shadow-md'}`}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
        >
            <div className="flex">
                <div className="w-1/2 border-r border-gray-300">
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
                <div className="w-1/2">
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
            </div>

        </div>
    )
}


export default FilePreview