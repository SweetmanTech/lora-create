'use client'

import useZoraCreate from '@/hooks/useZoraCreate'
import React, { createContext, useContext, useMemo } from 'react'

const ZoraCreateContext = createContext(undefined)

const ZoraCreateProvider = ({ children }: any) => {
  const zoraCreate = useZoraCreate()

  const value = useMemo(() => ({ ...zoraCreate }), [zoraCreate])

  return <ZoraCreateContext.Provider value={value}>{children}</ZoraCreateContext.Provider>
}

const useZoraCreateProvider = () => {
  const context = useContext(ZoraCreateContext)
  if (!context) {
    throw new Error('useZoraCreateProvider must be used within a ZoraCreateProvider')
  }
  return context
}

export { ZoraCreateProvider, useZoraCreateProvider }
