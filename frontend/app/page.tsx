'use client';
import '../styles/globals.css'
import React, { useState } from "react";
import FileUpload from '../components/fileUpload';
import FilePreview from '../components/filePreview';
import { FileContext, ThresholdContext } from '../app/context';


function Home() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [th1, setTh1] = useState<number | null>(210);
    const [th2, setTh2] = useState<number | null>(230);

    return (
        <div className="container mx-auto">
            <FileContext.Provider value={{ previewUrl, setPreviewUrl }}>
                <ThresholdContext.Provider value={{ th1, th2, setTh1, setTh2 }}>
                    <FilePreview />
                </ThresholdContext.Provider>
            </FileContext.Provider>
        </div >
    );
}


export default Home;