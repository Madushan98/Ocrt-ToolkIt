import React, { SetStateAction } from 'react'
import { useState, createContext } from 'react'

type File = {
  // ...
}
type FileContextType = {
  setPreviewUrl(value: SetStateAction<string | null>): void
  previewUrl: string | null
}

type ThresholdContext = {
  setTh1(value: SetStateAction<number | null>): void
  th1: number | null
  setTh2(value: SetStateAction<number | null>): void
  th2: number | null
}

export const ThresholdContext = createContext<ThresholdContext | null>(null)
export const FileContext = createContext<FileContextType | null>(null)