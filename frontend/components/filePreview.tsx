'use client'
import { useState, useContext, useEffect } from 'react'
import { FileContext } from '../app/context'


const FilePreview = () => {
    const fileContext = useContext(FileContext)
    const [selectedFile, setSelectedFile] =  useState<Blob | null>(null)
    const [hovered, setHovered] = useState(false)
    const [isDragging, setIsDragging] = useState(false);

    const handleHover = () => {
        setHovered(true)
    }

    const handleLeave = () => {
        setHovered(false)
    }
   
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            setSelectedFile(selectedFile);
            console.log(URL.createObjectURL(file));
            fileContext?.setPreviewUrl(URL.createObjectURL(file));
        }
    };

    return (
        <div
            className={`relative overflow-hidden ${hovered ? 'shadow-xl' : 'shadow-md'} mt-8`}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
        >
            <div className="flex bg-gray-100 rounded-lg">
                <div  className="w-1/2 border-r p-4">
                    {fileContext?.previewUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            className="object-cover"
                            src={fileContext?.previewUrl}
                            alt="File Preview"
                        />
                    ) : (
                        <div 
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onDragLeave={handleDragLeave}
                        className={`rounded-lg z-10 h-48 w-full flex justify-center items-center ${isDragging?'border-2':'border'} border-dashed border-blue-500 `}>
                            <span className="text-gray-500 ">Select a file or Drag and Drop</span>
                        </div>
                    )}
                </div>
                <div className="w-1/2 p-4">
                {fileContext?.previewUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            className="object-cover"
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