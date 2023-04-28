'use client';
import '../styles/globals.css'
import React, { useState } from "react";
import FileUpload from '../components/fileUpload';
import FilePreview from '../components/filePreview';
import { FileContext } from '../app/context';


function Home() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    return (
        <div className="container mx-auto">
            <FileContext.Provider value={{previewUrl,setPreviewUrl}}>
                <FilePreview />
            </FileContext.Provider>
        </div>
    );
}


export default Home;