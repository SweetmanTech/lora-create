'use client'

import { ZoraCreateProvider } from './ZoraCreateProvider'
import { PaymasterProvider } from './PaymasterProvider'
import WagmiProvider from './WagmiProvider'

const Providers = ({ children }: { children: React.ReactNode }) => (
  <WagmiProvider>
    <PaymasterProvider>
      <ZoraCreateProvider>{children}</ZoraCreateProvider>
    </PaymasterProvider>
  </WagmiProvider>
)

export default Providers
