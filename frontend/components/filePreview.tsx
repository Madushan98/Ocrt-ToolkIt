'use client'
import { useState, useContext, useEffect} from 'react'
import { FileContext, ThresholdContext } from '../app/context'
import FileUpload from './fileUpload'
import Modal from './Modal'
import Spinner from './Spinner'
import CloseButton from './CloseButton'
import { fetchFile, getDataService } from '../services/ApiService'
import { Options } from '../enums/enums'
import TextPreview from './TextPreview'
import ActionButton from './ActionButton'


const FilePreview = () => {
    const fileContext = useContext(FileContext)
    const thresholdContext = useContext(ThresholdContext)
    const [selectedFile, setSelectedFile] =  useState<Blob | null>(null);
    const [hovered, setHovered] = useState(false);
    const [selectimage, setSelectImage] = useState<File|null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [option, setOption] = useState<Options>(Options.upload);
    const [textAreResult,setTextAreaResult] = useState<string>("");
    const [isUploading,setIsUploading] = useState<boolean>(false);
    const [preProcessImageUrl,setPreProcessImageUrl] = useState<string| null>(null);
 
    useEffect(() => {
        if(!selectimage)return; 
        getDataService(Options.upload,selectimage,null)
      }, [selectimage]);

    const handleHover = () => {
        setHovered(true);
    }

    const handleLeave = () => {
        setHovered(false);
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
            setFile(file);
            
        }
    };

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement> ) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
        }
    };

    const setFile=(file : File)=>{
        setSelectedFile(selectedFile);
        setSelectImage(file);
        fileContext?.setPreviewUrl(URL.createObjectURL(file));
    };

    const handleOptionSelect=(value:Options)=>{
        setOption(value);
    };

    const handlePreProcessImage = async (imageUrl:string)=>{
        setPreProcessImageUrl(imageUrl);
    }

    const swapImgae=async ()=>{
        
        if(preProcessImageUrl != null){
            fetchFile(preProcessImageUrl).then(res=>setSelectImage(res));
            resetImage();
            fileContext?.setPreviewUrl(preProcessImageUrl);  
        }
        setPreProcessImageUrl(null);

    }

    // const apiCall= async ()=>{
    //     if(!selectimage)return; 
    //     setIsUploading(true);  
    //     const formData = new FormData();
    //     formData.append('file', selectimage);
    //     const options = {
    //                         method: 'POST',
    //                         body: formData,
    //                     };

    //     const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}get-result`, options)
    //                     .then((response) => response.json());
    //     setIsUploading(false);            
    //     setTextAreaResult(result.Tesseract);
    // };

    const apiCall= async ()=>{
        if(!selectimage)return; 
        setIsUploading(true); 
        var data: Map<string,number> = new Map(); 
        data.set('th1', thresholdContext?.th1 || 210);
        data.set('th2', thresholdContext?.th2 || 230);
    
        const result = await getDataService(option,selectimage,data);
        if(option === Options.get_result){
            setTextAreaResult(result.Tesseract);
        }else{
            if(option != Options.upload){
             handlePreProcessImage(result.url);
            }
        }
        setIsUploading(false);     
    }
    
    const resetImage = ()=>{
        setTextAreaResult("");
        setSelectImage(null);
        setSelectedFile(null);
        fileContext?.setPreviewUrl(null);
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
                <div  className="relative w-1/2  border-r p-4">
                    {fileContext?.previewUrl ? (
                        
                        <>
                            <img
                                className="relative object-cover"
                                src={fileContext?.previewUrl}
                                alt="File Preview"
                            />
                        <div className='absolute top-6 right-6'>
                            <CloseButton closeClick={()=>resetImage()}></CloseButton>
                        </div>
                        </>
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
                        <TextPreview textAreaResult={textAreResult}/> 
                    ):
                    (
                        preProcessImageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <>
                                <img
                                className="relative object-cover"
                                src={preProcessImageUrl}
                                alt="File Preview"
                                />
                                <div className='absolute top-6 right-6'>
                                    <ActionButton title='Next Step' rotate='0' nextOnClick={()=>swapImgae()}></ActionButton>
                                </div>
                            </>
                            
                        ) : (
                            <div className="h-48 w-full bg-gray-100 flex justify-center items-center">
                                <span className="text-gray-500">Upload File to Get Results</span>
                            </div>
                        )
                    )
                }
                </div>
            </div>

        </div>
        {isUploading &&
            <Modal>
                <Spinner></Spinner>
            </Modal>
        }
        </>
    )
}


export default FilePreview

