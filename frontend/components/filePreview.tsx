'use client'
import { useState, useContext, useEffect } from 'react'
import { FileContext } from '../app/context'
import FileUpload from './fileUpload'


const FilePreview = () => {
    const fileContext = useContext(FileContext)
    const [selectedFile, setSelectedFile] =  useState<Blob | null>(null)
    const [hovered, setHovered] = useState(false)
    const [selectimage, setSelectImage] = useState<File|null>(null)
    const [isDragging, setIsDragging] = useState(false);
    const [option, setOption] = useState<string>("get-result");
    const [textAreResult,setTextAreaResult] = useState<string>("");

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
            setFile(file)
            
        }
    };

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement> ) => {
        const file = event.target.files?.[0]
        if (file) {
            setFile(file)
            setSelectImage(file)
        }
       
      }

    const setFile=(file : File)=>{
        setSelectedFile(selectedFile);
        console.log(URL.createObjectURL(file));
        fileContext?.setPreviewUrl(URL.createObjectURL(file));
    }

    const handleOptionSelect=(value:string)=>{
        setOption(value);
    }

    const apiCall= async ()=>{
        if(!selectimage)return;   
        const formData = new FormData();
        const boundary = Math.random().toString().slice(2);
        formData.append('file', selectimage);
        const options = {
                            method: 'POST',
                            body: formData,
                        };

        const result = await fetch('http://localhost:8000/get-result', options)
                        .then((response) => response.json())
                        
        setTextAreaResult(result.EasyOcr)

    }

    return (
        <>
        <FileUpload onUpload={()=>apiCall()} onOptionChange={handleOptionSelect} />
        <div
            className={`relative overflow-hidden ${hovered ? 'shadow-xl' : 'shadow-md'} mt-8`}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
        >
            <div className="flex bg-gray-100 rounded-lg">
                <div  className="w-1/2  border-r p-4">
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
                        className={`relative rounded-lg z-10 h-48 w-full flex justify-center items-center ${isDragging?'border-2':'border'} border-dashed border-blue-500 `}>
                            <span className="text-gray-500 ">Click on to Select a File or Drag and Drop</span>
                            <input onChange={handleFileInput} type="file"  className="absolute opacity-0 inset-0 w-full h-full  cursor-pointer" />
                        </div>
                    )}
                </div>
                <div className="w-1/2 p-4">
                {option == 'get-result'?
                    (
                        <textarea value={textAreResult} readOnly className='w-full h-full rounded-lg p-1'>
                        </textarea>
                    ):
                    (
                        <div className="h-48 w-full bg-gray-100 flex justify-center items-center focus:border-transparent">
                            <span className="text-gray-500">Upload File to Get Results</span>
                        </div>
                    )
                }
                </div>
            </div>

        </div>
        </>
    )
}


export default FilePreview

// {fileContext?.previewUrl ? (
//     // eslint-disable-next-line @next/next/no-img-element
//     <img
//         className="object-cover"
//         src={fileContext?.previewUrl}
//         alt="File Preview"
//     />
// ) : (
//     <div className="h-48 w-full bg-gray-100 flex justify-center items-center">
//         <span className="text-gray-500">Upload File to Get Results</span>
//     </div>
// )}