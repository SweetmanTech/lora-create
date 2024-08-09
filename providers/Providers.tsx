'use client'

import { PaymasterProvider } from './PaymasterProvider'
import WagmiProvider from './WagmiProvider'

const Providers = ({ children }: { children: React.ReactNode }) => (
  <WagmiProvider>
    <PaymasterProvider>{children}</PaymasterProvider>
  </WagmiProvider>
)

export default Providers
