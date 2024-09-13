'use client'

import useFileUpload from '@/hooks/useFileUpload'
import React, { createContext, useContext, useMemo } from 'react'

const FileUploadContext = createContext<ReturnType<typeof useFileUpload>>(undefined)

const FileUploadProvider = ({ children }: any) => {
  const fileUpload = useFileUpload()

  const value = useMemo(() => ({ ...fileUpload }), [fileUpload])

  return <FileUploadContext.Provider value={value}>{children}</FileUploadContext.Provider>
}

const useFileUploadProvider = () => {
  const context = useContext(FileUploadContext)
  if (!context) {
    throw new Error('useFileUploadProvider must be used within a FileUploadProvider')
  }
  return context
}

export { FileUploadProvider, useFileUploadProvider }
