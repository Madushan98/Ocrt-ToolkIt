import React, { SetStateAction } from 'react'
import { useState, createContext } from 'react'

type File = {
    // ...
  }
  type FileContextType = {
    setPreviewUrl(value: SetStateAction<string | null>): void
    previewUrl: string | null
  }


export const FileContext = createContext<FileContextType | null>(null)