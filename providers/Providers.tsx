'use client'

import { ZoraCreateProvider } from './ZoraCreateProvider'
import { PaymasterProvider } from './PaymasterProvider'
import { PointsProvider } from './PointsProvider'
import WagmiProvider from './WagmiProvider'

const Providers = ({ children }: { children: React.ReactNode }) => (
  <WagmiProvider>
    <PaymasterProvider>
      <PointsProvider>
        <ZoraCreateProvider>{children}</ZoraCreateProvider>
      </PointsProvider>
    </PaymasterProvider>
  </WagmiProvider>
)

export default Providers
