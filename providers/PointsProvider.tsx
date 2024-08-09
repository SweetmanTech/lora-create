'use client'

import usePoints from '@/hooks/usePoints'
import React, { createContext, useContext, useMemo } from 'react'

const PointsContext = createContext(undefined)

const PointsProvider = ({ children }: any) => {
  const points = usePoints()

  const value = useMemo(() => ({ ...points }), [points])

  return <PointsContext.Provider value={value}>{children}</PointsContext.Provider>
}

const usePointsProvider = () => {
  const context = useContext(PointsContext)
  if (!context) {
    throw new Error('usePointsProvider must be used within a PointsProvider')
  }
  return context
}

export { PointsProvider, usePointsProvider }
