'use client'

import { ZoraCreateProvider } from './ZoraCreateProvider'
import { PaymasterProvider } from './PaymasterProvider'
import WagmiProvider from './WagmiProvider'
import { CoinbaseSmartWalletProvider } from './CoinbaseSmartWalletProvider'

const Providers = ({ children }: { children: React.ReactNode }) => (
  <WagmiProvider>
    <CoinbaseSmartWalletProvider>
      <PaymasterProvider>
        <ZoraCreateProvider>{children}</ZoraCreateProvider>
      </PaymasterProvider>
    </CoinbaseSmartWalletProvider>
  </WagmiProvider>
)

export default Providers
