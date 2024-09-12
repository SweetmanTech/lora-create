'use client'

import useCoinbaseSmartWallet from '@/hooks/useCoinbaseSmartWallet'
import React, { createContext, useContext, useMemo } from 'react'

const CoinbaseSmartWalletContext =
  createContext<ReturnType<typeof useCoinbaseSmartWallet>>(undefined)

const CoinbaseSmartWalletProvider = ({ children }: any) => {
  const coinbaseSmartWallet = useCoinbaseSmartWallet()

  const value = useMemo(() => ({ ...coinbaseSmartWallet }), [coinbaseSmartWallet])

  return (
    <CoinbaseSmartWalletContext.Provider value={value}>
      {children}
    </CoinbaseSmartWalletContext.Provider>
  )
}

const useCoinbaseSmartWalletProvider = () => {
  const context = useContext(CoinbaseSmartWalletContext)
  if (!context) {
    throw new Error(
      'useCoinbaseSmartWalletProvider must be used within a CoinbaseSmartWalletProvider',
    )
  }
  return context
}

export { CoinbaseSmartWalletProvider, useCoinbaseSmartWalletProvider }
